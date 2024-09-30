package com.ReadCorner.Library.service;

import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.entity.Order;
import com.ReadCorner.Library.entity.OrderStatus;

public interface OrderService {
    Order createOrderFromCartId(Integer cartId);
    GResponse updateOrderStatus(Integer orderId, OrderStatus status);
    GResponse findAllByUserId(Integer userId);
    GResponse findAllByStatus(OrderStatus orderStatus);
    GResponse findAllOrders();
    GResponse findById(Integer orderId);
    boolean isValidOrderStatus(String orderStatus);

}

