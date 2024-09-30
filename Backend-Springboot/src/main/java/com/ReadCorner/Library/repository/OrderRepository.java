package com.ReadCorner.Library.repository;

import com.ReadCorner.Library.entity.Order;
import com.ReadCorner.Library.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    List<Order> findAllByUserId(Integer userId);

    List<Order> findAllByStatus(OrderStatus orderStatus);
}
