package com.voyage.workspace.inventory;

import java.math.BigDecimal;

public record InventoryOverviewRow(
        Long skuId,
        String skuCode,
        String productName,
        String category,
        String size,
        String color,
        BigDecimal price,
        long currentStock
) {}