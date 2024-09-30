package com.ReadCorner.Library.mapper;

import com.ReadCorner.Library.dto_response.CartItemResponse;
import com.ReadCorner.Library.entity.CartItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemMapper {

    public CartItemResponse toCartItemResponse(CartItem item) {
        return CartItemResponse.builder()
                .cartItemId(item.getId())
                .cartId(item.getCart().getId())
                .quantity(item.getQuantity())
                .book(new CartItemResponse.BookDetails(item.getBook().getId(),item.getBook().getTitle(), item.getBookPrice(), item.getBook().getBookCover()))
                .build();
    }
}
