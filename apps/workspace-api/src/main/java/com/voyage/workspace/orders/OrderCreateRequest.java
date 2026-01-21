package com.voyage.workspace.orders;

import java.util.List;

public record OrderCreateRequest(
        String customerRef,
        List<OrderItemRequest> items
) {}