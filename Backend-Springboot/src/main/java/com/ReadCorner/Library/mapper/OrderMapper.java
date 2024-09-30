package com.ReadCorner.Library.mapper;

import com.ReadCorner.Library.dto_response.OrderResponse;
import com.ReadCorner.Library.entity.Cart;
import com.ReadCorner.Library.entity.Order;
import com.ReadCorner.Library.entity.OrderItem;
import com.ReadCorner.Library.entity.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderMapper {
    private final OrderItemMapper orderItemMapper;

    public OrderResponse toOrderResponse(Order order) {
        return OrderResponse.builder()
                .userId(order.getUser().getId())
                .userEmail(order.getUser().getEmail())
                .orderId(order.getId())
                .cartId(order.getCartId())
                .orderDate(order.getOrderDate())
                .orderStatus(order.getStatus())
                .totalPrice(order.getTotalAmount())
                .orderItems(order.getOrderItems().stream()
                        .map(orderItemMapper::toOrderItemResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    public Order mapCartToOrderEntity(Cart cart, List<OrderItem> orderItems, OrderStatus status) {
        return Order.builder()
                .user(cart.getUser())
                .cartId(cart.getId())
                .orderDate(LocalDateTime.now())
                .status(status)
                .totalAmount(cart.getTotalPrice())
                .orderItems(orderItems)
                .build();
    }


    public List<OrderResponse> toOrderResponseList(List<Order> orders) {
        return orders.stream()
                .map(this::toOrderResponse)
                .collect(Collectors.toList());
    }
}
