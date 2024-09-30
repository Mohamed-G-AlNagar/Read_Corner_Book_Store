package com.ReadCorner.Library.dto_response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder 
public class BookResponse {

    private Integer id;
    private String title;
    private String author;
    private String category;
    private Integer stock;
    private Double price;
    private String bookCover;
    private double rating;

}
