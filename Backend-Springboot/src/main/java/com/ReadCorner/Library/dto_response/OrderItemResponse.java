package com.ReadCorner.Library.dto_response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class OrderItemResponse {

    private Integer orderId;
    private Integer quantity;
    private OrderItemResponse.BookDetails book;


    @Data
    @AllArgsConstructor
    @Builder
    public static class BookDetails {
        private Integer bookId;
        private String bookTitle;
        private Double price;
    }
}
