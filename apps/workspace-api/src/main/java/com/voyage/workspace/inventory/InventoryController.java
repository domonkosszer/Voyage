package com.voyage.workspace.inventory;

import com.voyage.workspace.products.SkuRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryMovementRepository movementRepo;
    private final SkuRepository skuRepo;

    public InventoryController(InventoryMovementRepository movementRepo, SkuRepository skuRepo) {
        this.movementRepo = movementRepo;
        this.skuRepo = skuRepo;
    }

    @PostMapping("/movements")
    public ResponseEntity<?> createMovement(@RequestBody InventoryMovementCreateRequest req) {
        var skuOpt = skuRepo.findById(req.skuId());
        if (skuOpt.isEmpty()) return ResponseEntity.badRequest().body("Unknown skuId: " + req.skuId());

        InventoryMovement m = new InventoryMovement();
        m.setSku(skuOpt.get());
        m.setDelta(req.delta());
        m.setReason(req.reason());
        m.setReference(req.reference());

        return ResponseEntity.ok(movementRepo.save(m));
    }

    @GetMapping("/stock/{skuId}")
    public int getCurrentStock(@PathVariable Long skuId) {
        return movementRepo.currentStock(skuId);
    }

    @GetMapping("/overview")
    public List<InventoryOverviewRow> overview(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean active
    ) {
        return skuRepo.inventoryOverview(category, active);
    }
}