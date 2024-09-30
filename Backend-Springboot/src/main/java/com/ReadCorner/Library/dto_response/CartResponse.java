package com.ReadCorner.Library.dto_response;

import com.ReadCorner.Library.entity.CartItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class CartResponse {
    private Integer cartId;
    private UserResponse user;
    private List<CartItemResponse> cartItems;
    private Double totalPrice;

    @Data
    @AllArgsConstructor
    @Builder
    public static class UserResponse {
    private Integer userId;
    private String fullName;
    private String email;
    }

}
