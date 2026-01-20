package com.voyage.workspace.products;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "skus")
public class Sku {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, unique = true)
    private String skuCode;

    private String size;
    private String color;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private boolean active = true;

    public Sku() {}

    public Long getId() { return id; }
    public Product getProduct() { return product; }
    public String getSkuCode() { return skuCode; }
    public String getSize() { return size; }
    public String getColor() { return color; }
    public BigDecimal getPrice() { return price; }
    public boolean isActive() { return active; }

    public void setProduct(Product product) { this.product = product; }
    public void setSkuCode(String skuCode) { this.skuCode = skuCode; }
    public void setSize(String size) { this.size = size; }
    public void setColor(String color) { this.color = color; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setActive(boolean active) { this.active = active; }
}