package com.ReadCorner.Library.dto_request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartRequest {
    @NotNull(message = "cartId is mandatory")
    private Integer cartId;
    @NotNull(message = "bookId is mandatory")
    private Integer bookId;
    @NotNull(message = "quantity is mandatory")
    @Min(value = 0, message = "quantity must be greater than or equal to 0")
    private Integer quantity;

}
