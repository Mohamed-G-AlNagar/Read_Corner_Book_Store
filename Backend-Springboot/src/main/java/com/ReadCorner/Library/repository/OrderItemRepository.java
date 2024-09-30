package com.ReadCorner.Library.repository;

import com.ReadCorner.Library.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Integer> {
}
