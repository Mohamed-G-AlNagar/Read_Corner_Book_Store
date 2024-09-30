package com.ReadCorner.Library.dto_request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookRequest {

    @NotNull(message = "title is mandatory")
    @NotEmpty(message = "title is mandatory")
    private String title;
    @NotNull(message = "authorName is mandatory")
    @NotEmpty(message = "authorName is mandatory")
    private String author;
    @NotNull(message = "description is mandatory")
    @NotEmpty(message = "description is mandatory")
    private String description;

    @NotNull(message = "category is mandatory")
    @NotEmpty(message = "category is mandatory")
    private String category;

    @NotNull(message = "price is mandatory")
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private double price;

    @NotNull(message = "total copies is mandatory")
    @Min(value = 1, message = "total copies must be greater than or equal to 1")
    private Integer totalCopies;

    @NotNull(message = "stock is mandatory")
    @Min(value = 1, message = "Stock must be greater than or equal to 1")
    private Integer stock;

    // The image is not mandatory
    private MultipartFile bookCoverImage; // For the file upload
    private String bookCover;             // For the URL after upload

}
