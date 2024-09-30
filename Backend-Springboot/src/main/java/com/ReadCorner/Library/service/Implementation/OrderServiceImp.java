package com.ReadCorner.Library.service.Implementation;


import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.entity.*;
import com.ReadCorner.Library.exception.NotAuthorizedException;
import com.ReadCorner.Library.exception.NotFoundException;
import com.ReadCorner.Library.mapper.OrderItemMapper;
import com.ReadCorner.Library.mapper.OrderMapper;
import com.ReadCorner.Library.repository.*;

import com.ReadCorner.Library.service.BookService;
import com.ReadCorner.Library.service.OrderService;
import com.ReadCorner.Library.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImp implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderItemMapper orderItemMapper;
    private final OrderMapper orderMapper;
    private final UserService userService;
    private final BookService bookService;

    public Order createOrderFromCartId(Integer cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new NotFoundException("Cart not found"));

        List<OrderItem> orderItems = cart.getCartItems().stream()
                .map(orderItemMapper::mapCartItemToOrderItem)
                .collect(Collectors.toList());

        // Map the cart to the order (keep record of items becasue the cart could be cleared)
        Order order = orderMapper.mapCartToOrderEntity(cart,orderItems, OrderStatus.PENDING);

        orderItems.forEach(orderItem -> orderItem.setOrder(order));
        orderRepository.save(order);

        return order;
    }

    public GResponse updateOrderStatus(Integer orderId, OrderStatus status) {
        if (!userService.isAdminLoggedIn()) throw new NotAuthorizedException("Only Admin allowed to update the order status");

        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

        // if the current status not cancelled and will be cancelled
        if( order.getStatus() != OrderStatus.CANCELED && status == OrderStatus.CANCELED ){
//            increaseBooksStock(order);
            bookService.increaseOrderBooksStock(order);
        }
        //         current is cancelled and will make it anything else except cancel then decreade the stock
        else if (order.getStatus() == OrderStatus.CANCELED && status != OrderStatus.CANCELED) {
//            decreaseBooksStock(order);
            bookService.decreaseOrderBooksStock(order);
        }
        order.setStatus(status);

        orderRepository.save(order);
        return GResponse.builder()
                .status("SUCCESS")
                .message("Order Status changed to "+status.name())
                .content(orderMapper.toOrderResponse(order))
                .build();
    }

    // get all order of user
    public GResponse findAllByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // check if admin or order owner
        boolean belongToLoggedInUser = userService.isLoggedInUser(user.getId());
        if (!belongToLoggedInUser) {
            // check if the logged-in user is  admin
            if (!userService.isAdminLoggedIn()) {
                throw new NotAuthorizedException("Only Admin or the order owner is allowed to retrieve this order.");
            }
        }

        List<Order> orders = orderRepository.findAllByUserId(userId);

        return GResponse.builder()
                .status("SUCCESS")
                .message("Orders retrieved successfully")
                .content(orderMapper.toOrderResponseList(orders))
                .build();
    }

    public GResponse findAllByStatus(OrderStatus orderStatus) {

        if (!userService.isAdminLoggedIn()) throw new NotAuthorizedException("Only Admin allowed to retrieve orders by status");

        if(!isValidOrderStatus(orderStatus.name().toUpperCase())) throw new RuntimeException("Invalid order status");

        List<Order> orders = orderRepository.findAllByStatus(orderStatus);

        return GResponse.builder()
                .status("SUCCESS")
                .message("Orders retrieved successfully")
                .content(orderMapper.toOrderResponseList(orders))
                .build();
    }

    public GResponse findAllOrders() {
        if (!userService.isAdminLoggedIn()) throw new NotAuthorizedException("Only Admin allowed to retrieve orders by status");

        List<Order> orders = orderRepository.findAll();

        return GResponse.builder()
                .status("SUCCESS")
                .message("Orders retrieved successfully")
                .content(orderMapper.toOrderResponseList(orders))
                .build();
    }


    public GResponse findById(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // check if admin or order owner
        boolean belongToLoggedInUser = userService.isLoggedInUser(order.getUser().getId());
        if (!userService.isAdminLoggedIn() || !belongToLoggedInUser) throw new NotAuthorizedException("Only Admin allowed or Order Owner to retrieve orders by status");


        return GResponse.builder()
                .status("SUCCESS")
                .message("Order retrieved successfully")
                .content(orderMapper.toOrderResponse(order))
                .build();
    }

    private Double calculateTotalAmount(List<OrderItem> orderItems) {
        return orderItems.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }

    public boolean isValidOrderStatus(String orderStatus) {
        return orderStatus != null && Arrays.stream(OrderStatus.values())
                .anyMatch(s -> s.name().equalsIgnoreCase(orderStatus));
    }

}

