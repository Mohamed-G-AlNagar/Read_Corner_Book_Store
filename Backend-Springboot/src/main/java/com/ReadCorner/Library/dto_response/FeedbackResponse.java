package com.ReadCorner.Library.dto_response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FeedbackResponse {
    private Integer id;
    private Double feedbackRate;
    private String comment;
    private String userFullName;
    private String userEmail;
    private Integer bookId;
    private String bookTitle;
    private LocalDateTime createdDate;

}
