package com.ReadCorner.Library.dto_request;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderStatusRequest {
    @Pattern(regexp = "SHIPPED|DELIVERED|CANCELED|PAID", message = "Invalid order status, allowed only SHIPPED|DELIVERED|CANCELED|PAID")
    private String status;
}
