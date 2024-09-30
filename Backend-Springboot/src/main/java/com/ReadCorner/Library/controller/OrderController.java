package com.ReadCorner.Library.controller;

import com.ReadCorner.Library.dto_request.OrderStatusRequest;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.entity.Order;
import com.ReadCorner.Library.entity.OrderStatus;
import com.ReadCorner.Library.service.OrderService;
import com.ReadCorner.Library.util.StripPayment.PaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
@Tag(name = "Order")
public class OrderController {

    private final OrderService orderService;
    private final PaymentService paymentService;

    @PostMapping("/create/{cartId}")
    public GResponse createOrderAndInitiatePayment(@PathVariable Integer cartId) {
        Order order = orderService.createOrderFromCartId(cartId);
        return paymentService.initiatePayment(order);
    }

    @PutMapping("/updateStatus/{orderId}")
    public GResponse updateOrderStatus(@PathVariable Integer orderId, @Valid @RequestBody OrderStatusRequest orderStatusRequest) {
        String status = orderStatusRequest.getStatus();
        return orderService.updateOrderStatus(orderId, OrderStatus.valueOf(status.toUpperCase().trim()));
    }

    @GetMapping("/success")
    public GResponse handlePaymentSuccess(@RequestParam("orderId") Integer orderId, @RequestParam("sessionId") String sessionId) {

        return paymentService.updateOrderStatusAfterPayment(orderId, true);
    }

    @GetMapping("/cancel")
    public GResponse handlePaymentCancellation(@RequestParam("orderId") Integer orderId, @RequestParam("sessionId") String sessionId) {

        return paymentService.updateOrderStatusAfterPayment(orderId, false);
    }

    // get all orders (Admin)
    @GetMapping("/")
    public GResponse getAllOrders() {
        return orderService.findAllOrders();
    }

    // get all by status
    @GetMapping("/status/{status}")
    public GResponse getOrdersByStatus(@PathVariable OrderStatus status) {
        return orderService.findAllByStatus(status);
    }

    // get all PENDING orders
    @GetMapping("/pending")
    public GResponse getPendingOrders() {
        return orderService.findAllByStatus(OrderStatus.PENDING);
    }


    @GetMapping("/user/{userId}")
    public GResponse getOrdersByUserId(@PathVariable Integer userId) {

        return orderService.findAllByUserId(userId);
    }

    @GetMapping("/{orderId}")
    public GResponse getOrderById(@PathVariable Integer orderId) {

        return orderService.findById(orderId);
    }

}