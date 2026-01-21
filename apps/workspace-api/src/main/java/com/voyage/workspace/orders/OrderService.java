package com.voyage.workspace.orders;

import com.voyage.workspace.inventory.InventoryMovement;
import com.voyage.workspace.inventory.InventoryMovementRepository;
import com.voyage.workspace.inventory.MovementReason;
import com.voyage.workspace.products.SkuRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final SkuRepository skuRepo;
    private final InventoryMovementRepository movementRepo;

    public OrderService(OrderRepository orderRepo, SkuRepository skuRepo, InventoryMovementRepository movementRepo) {
        this.orderRepo = orderRepo;
        this.skuRepo = skuRepo;
        this.movementRepo = movementRepo;
    }

    @Transactional
    public Order create(OrderCreateRequest req) {
        if (req.items() == null || req.items().isEmpty()) {
            throw new IllegalArgumentException("Order must have at least 1 item");
        }

        // 1) Stock check first (fail fast)
        for (var item : req.items()) {
            var sku = skuRepo.findById(item.skuId())
                    .orElseThrow(() -> new IllegalArgumentException("Unknown skuId: " + item.skuId()));

            if (!sku.isActive()) {
                throw new IllegalArgumentException("SKU is inactive: " + sku.getId());
            }

            int current = movementRepo.currentStock(sku.getId());
            if (item.qty() <= 0) throw new IllegalArgumentException("qty must be > 0");

            if (current < item.qty()) {
                throw new IllegalArgumentException("Insufficient stock for skuId=" + sku.getId()
                        + " (current=" + current + ", requested=" + item.qty() + ")");
            }
        }

        // 2) Create order + items
        Order order = new Order();
        order.setCustomerRef(req.customerRef());

        for (var item : req.items()) {
            var sku = skuRepo.findById(item.skuId())
                    .orElseThrow(() -> new IllegalArgumentException("Unknown skuId: " + item.skuId()));

            OrderItem oi = new OrderItem();
            oi.setSku(sku);
            oi.setQty(item.qty());
            oi.setUnitPrice(item.unitPrice());
            order.addItem(oi);
        }

        Order saved = orderRepo.save(order);

        // 3) Create SALE movements (negative)
        for (var oi : saved.getItems()) {
            InventoryMovement m = new InventoryMovement();
            m.setSku(oi.getSku());
            m.setDelta(-oi.getQty());
            m.setReason(MovementReason.SALE);
            m.setReference("ORDER:" + saved.getId());
            movementRepo.save(m);
        }

        return saved;
    }
}