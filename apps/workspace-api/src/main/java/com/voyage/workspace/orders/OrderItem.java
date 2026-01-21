package com.voyage.workspace.orders;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.voyage.workspace.products.Sku;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Sku sku;

    private int qty;

    @Column(precision = 10, scale = 2)
    private BigDecimal unitPrice;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    // getters/setters
    public Long getId() { return id; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public Sku getSku() { return sku; }
    public void setSku(Sku sku) { this.sku = sku; }
    public int getQty() { return qty; }
    public void setQty(int qty) { this.qty = qty; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
}