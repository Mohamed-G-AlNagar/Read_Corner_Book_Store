package com.ReadCorner.Library.mapper;

import com.ReadCorner.Library.dto_response.CartResponse;
import com.ReadCorner.Library.entity.Cart;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartMapper {

    private final CartItemMapper cartItemMapper;

    public CartResponse toCartResponse(Cart cart){

        return CartResponse.builder()
                .cartId(cart.getId())
                .user(CartResponse.UserResponse.builder()
                        .userId(cart.getUser().getId())
                        .email(cart.getUser().getEmail())
                        .fullName(cart.getUser().getFullName())
                        .build())
                .cartItems(cart.getCartItems().stream().map(cartItemMapper::toCartItemResponse).toList())
                .totalPrice(cart.getTotalPrice())
                .build();
    }
}
