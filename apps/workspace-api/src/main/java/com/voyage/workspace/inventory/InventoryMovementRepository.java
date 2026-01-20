package com.voyage.workspace.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InventoryMovementRepository extends JpaRepository<InventoryMovement, Long> {

    @Query("select coalesce(sum(m.delta), 0) from InventoryMovement m where m.sku.id = :skuId")
    int currentStock(@Param("skuId") Long skuId);
}