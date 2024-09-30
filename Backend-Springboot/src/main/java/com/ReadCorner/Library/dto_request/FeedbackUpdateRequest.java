package com.ReadCorner.Library.dto_request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FeedbackUpdateRequest {
    private String comment;
    private Double rate;
}
