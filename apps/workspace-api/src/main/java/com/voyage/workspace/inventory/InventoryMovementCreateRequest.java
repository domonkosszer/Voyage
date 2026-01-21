package com.voyage.workspace.inventory;

public record InventoryMovementCreateRequest(
        Long skuId,
        int delta,
        MovementReason reason,
        String reference
) {}