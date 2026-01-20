package com.voyage.workspace.products;

import java.math.BigDecimal;

public record SkuCreateRequest(
        Long productId,
        String skuCode,
        String size,
        String color,
        BigDecimal price
) {}