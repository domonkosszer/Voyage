package com.voyage.workspace.inventory;

public record InventoryMovementCreateRequest(
        Long skuId,
        int delta,
        String reason,
        String reference
) {}