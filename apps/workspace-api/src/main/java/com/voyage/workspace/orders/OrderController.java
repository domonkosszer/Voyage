package com.voyage.workspace.orders;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepo;
    private final OrderService orderService;

    public OrderController(OrderRepository orderRepo, OrderService orderService) {
        this.orderRepo = orderRepo;
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody OrderCreateRequest req) {
        try {
            return ResponseEntity.ok(orderService.create(req));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Order> list() {
        return orderRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return orderRepo.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}