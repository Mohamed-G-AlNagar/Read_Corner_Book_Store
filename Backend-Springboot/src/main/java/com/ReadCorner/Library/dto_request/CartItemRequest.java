package com.ReadCorner.Library.dto_request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartItemRequest {
    private Integer bookId;
    private Integer cartId;
    private Integer quantity;
}
