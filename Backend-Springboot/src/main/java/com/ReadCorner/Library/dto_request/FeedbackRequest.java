package com.ReadCorner.Library.dto_request;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FeedbackRequest {

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must not exceed 5")
    private Double rate;

    @NotBlank(message = "Comment cannot be blank")
    @NotNull(message = "Comment cannot be Null")
    private String comment;

    @NotNull(message = "User ID is required")
    private Integer userId;

    @NotNull(message = "Book ID is required")
    private Integer bookId;
}