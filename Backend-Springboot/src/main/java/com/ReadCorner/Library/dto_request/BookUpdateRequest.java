package com.ReadCorner.Library.dto_request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookUpdateRequest {

    private String title;

    private String author;

    private String description;

    private String category;

    private double price;

    private Integer totalCopies;

    private Integer stock;

    private MultipartFile bookCoverImage; // For the file upload
    private String bookCover;             // For the URL after upload}
}