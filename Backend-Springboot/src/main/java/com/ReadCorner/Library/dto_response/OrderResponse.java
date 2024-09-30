package com.ReadCorner.Library.dto_response;

import com.ReadCorner.Library.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class OrderResponse {

    private Integer userId;
    private String userEmail;
    private Integer orderId;
    private Integer cartId;
    private LocalDateTime orderDate;
    private OrderStatus orderStatus;
    private Double totalPrice;
    private List<OrderItemResponse> orderItems;


}
