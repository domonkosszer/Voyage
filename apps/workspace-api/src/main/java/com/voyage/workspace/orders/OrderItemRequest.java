package com.voyage.workspace.orders;

import java.math.BigDecimal;

public record OrderItemRequest(
        Long skuId,
        int qty,
        BigDecimal unitPrice
) {}