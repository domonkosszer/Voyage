package com.voyage.workspace.products;

import com.voyage.workspace.inventory.InventoryOverviewRow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SkuRepository extends JpaRepository<Sku, Long> {

    List<Sku> findByProductId(Long productId);
    Optional<Sku> findBySkuCode(String skuCode);

    @Query("""
    select new com.voyage.workspace.inventory.InventoryOverviewRow(
        s.id,
        s.skuCode,
        p.name,
        p.category,
        s.size,
        s.color,
        s.price,
        coalesce(sum(m.delta), 0L)
    )
    from Sku s
    join s.product p
    left join InventoryMovement m on m.sku = s
    where (:category is null or p.category = :category)
      and (:active is null or s.active = :active)
    group by s.id, s.skuCode, p.name, p.category, s.size, s.color, s.price
    order by p.name asc, s.skuCode asc
    """)
    List<InventoryOverviewRow> inventoryOverview(
            @Param("category") String category,
            @Param("active") Boolean active
    );
}