package com.ReadCorner.Library.service;


import com.ReadCorner.Library.dto_request.FeedbackRequest;
import com.ReadCorner.Library.dto_request.FeedbackUpdateRequest;
import com.ReadCorner.Library.dto_response.FeedbackResponse;
import com.ReadCorner.Library.dto_response.GResponse;

import java.util.List;

public interface FeedbackService {
    GResponse addFeedback(FeedbackRequest request);
    List<FeedbackResponse> getFeedbacksByBook(Integer bookId);
    GResponse deleteFeedback(Integer feedbackId);
    GResponse updateFeedback(Integer feedbackId, FeedbackUpdateRequest request);
}

