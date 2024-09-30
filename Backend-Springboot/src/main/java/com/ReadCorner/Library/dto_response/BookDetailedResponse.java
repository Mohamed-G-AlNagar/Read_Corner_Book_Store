package com.ReadCorner.Library.dto_response;

import com.ReadCorner.Library.entity.Feedback;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class BookDetailedResponse extends BookResponse {

    private String description;
    private Integer totalCopies;
    private List<FeedbackResponse> feedbacks;

}
