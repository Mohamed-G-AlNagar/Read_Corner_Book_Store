package com.ReadCorner.Library.mapper;

import com.ReadCorner.Library.dto_response.OrderItemResponse;
import com.ReadCorner.Library.entity.CartItem;
import com.ReadCorner.Library.entity.OrderItem;
import org.springframework.stereotype.Service;

@Service
public class OrderItemMapper {

    public OrderItemResponse toOrderItemResponse(OrderItem orderItem) {

        return OrderItemResponse.builder()
                .orderId(orderItem.getOrder().getId())
                .quantity(orderItem.getQuantity())
                .book(OrderItemResponse.BookDetails.builder()
                        .bookId(orderItem.getBook().getId())
                        .bookTitle(orderItem.getBook().getTitle())
                        .price(orderItem.getBook().getPrice())
                        .build())
                .build();
    }

    public OrderItem mapCartItemToOrderItem(CartItem cartItem) {
        return OrderItem.builder()
                .quantity(cartItem.getQuantity())
                .book(cartItem.getBook())
                .price(cartItem.getBook().getPrice() * cartItem.getQuantity())
                .build();
    }
}
