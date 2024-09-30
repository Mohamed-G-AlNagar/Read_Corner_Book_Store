package com.ReadCorner.Library.dto_response;

import com.ReadCorner.Library.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CartItemResponse {
    private Integer cartItemId;
    private BookDetails book;
    private Integer quantity;
    private Integer cartId;


    @Data
    @AllArgsConstructor
    public static class BookDetails {
        private Integer bookId;
        private String bookTitle;
        private Double price;
        private String bookCover;
    }
}
