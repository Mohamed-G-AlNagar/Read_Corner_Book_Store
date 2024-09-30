package com.ReadCorner.Library.service;

import com.ReadCorner.Library.dto_request.CartItemRequest;
import com.ReadCorner.Library.dto_request.CartRequest;
import com.ReadCorner.Library.dto_response.CartItemResponse;
import com.ReadCorner.Library.dto_response.GResponse;

import java.util.List;

public interface CartService {
    GResponse getCartById(Integer cartId);
    GResponse addBookToCart(CartRequest request);
    GResponse removeFromCart(Integer cartId, Integer bookId);
    GResponse emptyCart(Integer cartId);
    GResponse decreaseItemQuantity(CartItemRequest request);
    List<CartItemResponse> getAllItemsByCartId(Integer cartId);
}
