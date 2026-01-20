package com.voyage.workspace.products;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skus")
public class SkuController {

    private final SkuRepository skuRepo;
    private final ProductRepository productRepo;

    public SkuController(SkuRepository skuRepo, ProductRepository productRepo) {
        this.skuRepo = skuRepo;
        this.productRepo = productRepo;
    }

    @GetMapping
    public List<Sku> list(@RequestParam(required = false) Long productId) {
        if (productId != null) return skuRepo.findByProductId(productId);
        return skuRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody SkuCreateRequest req) {
        var productOpt = productRepo.findById(req.productId());
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Unknown productId: " + req.productId());
        }

        Sku sku = new Sku();
        sku.setProduct(productOpt.get());
        sku.setSkuCode(req.skuCode());
        sku.setSize(req.size());
        sku.setColor(req.color());
        sku.setPrice(req.price());

        return ResponseEntity.ok(skuRepo.save(sku));
    }
}