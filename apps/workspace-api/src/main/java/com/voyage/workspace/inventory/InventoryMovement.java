package com.voyage.workspace.inventory;

import com.voyage.workspace.products.Sku;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "inventory_movements")
public class InventoryMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", nullable = false)
    private Sku sku;

    @Column(nullable = false)
    private int delta;

    @Column(nullable = false)
    private String reason; // PRODUCTION, SALE, RETURN, ADJUSTMENT

    private String reference;

    @Column(nullable=false, updatable=false)
    private Instant createdAt = Instant.now();

    public InventoryMovement() {}

    public Long getId() { return id; }
    public Sku getSku() { return sku; }
    public int getDelta() { return delta; }
    public String getReason() { return reason; }
    public String getReference() { return reference; }
    public Instant getCreatedAt() { return createdAt; }

    public void setSku(Sku sku) { this.sku = sku; }
    public void setDelta(int delta) { this.delta = delta; }
    public void setReason(String reason) { this.reason = reason; }
    public void setReference(String reference) { this.reference = reference; }
}
