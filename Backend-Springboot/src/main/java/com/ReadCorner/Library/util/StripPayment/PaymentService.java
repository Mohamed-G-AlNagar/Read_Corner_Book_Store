package com.ReadCorner.Library.util.StripPayment;

import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.entity.Cart;
import com.ReadCorner.Library.entity.Order;
import com.ReadCorner.Library.entity.OrderStatus;
import com.ReadCorner.Library.exception.NotFoundException;
import com.ReadCorner.Library.mapper.OrderMapper;
import com.ReadCorner.Library.repository.CartRepository;
import com.ReadCorner.Library.repository.OrderRepository;
import com.ReadCorner.Library.service.BookService;
import com.ReadCorner.Library.service.OrderService;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final CartRepository cartRepository;
    @Value("${front-base-url}")
    private String frontBaseUrl;
    private final BookService bookService;
    private final OrderService orderService;

    @Transactional
    public GResponse initiatePayment(Order order) {
        Stripe.apiKey = stripeApiKey;

        List<SessionCreateParams.LineItem> lineItems = order.getOrderItems().stream()
                .map(orderItem -> SessionCreateParams.LineItem.builder()
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName(orderItem.getBook().getTitle())
                                        .addImage(orderItem.getBook().getBookCover())
                                        .build())
                                .setUnitAmount((long) (orderItem.getPrice()/orderItem.getQuantity() * 100))

                                .build())
                        .setQuantity(orderItem.getQuantity().longValue())
                        .build())
                .collect(Collectors.toList());

        SessionCreateParams params = SessionCreateParams.builder()
                .addAllLineItem(lineItems)
                .setCustomerEmail(order.getUser().getEmail())
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(frontBaseUrl+"/order/success?orderId=" + order.getId() + "&sessionId={CHECKOUT_SESSION_ID}")
                .setCancelUrl(frontBaseUrl+"/order/cancel?orderId=" + order.getId() + "&sessionId={CHECKOUT_SESSION_ID}")
                .build();

        try {
            Session session = Session.create(params);

            return GResponse.builder()
                    .status("SUCCESS")
                    .message("Payment session created")
                    .content(session.getUrl())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Stripe session", e);
        }
    }

    @Transactional
    public GResponse updateOrderStatusAfterPayment(Integer orderId, boolean success) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));

        if (success) {
            order.setStatus(OrderStatus.PAID);
            // clear the cart
            Cart cart = cartRepository.findById(order.getCartId())
                    .orElseThrow(() -> new NotFoundException("Cart not found"));
            cart.getCartItems().clear();
            cartRepository.save(cart);
            bookService.decreaseOrderBooksStock(order);

        } else {
            order.setStatus(OrderStatus.CANCELED);
            // delete the order if failed
            orderRepository.delete(order);
        }

        orderRepository.save(order);
        return GResponse.builder()
                .status("SUCCESS")
                .message(success ? "Payment successful, order updated to PAID" : "Payment failed, order updated to CANCELLED")
                .content(success ? orderMapper.toOrderResponse(order) : null)
                .build();

    }
}
