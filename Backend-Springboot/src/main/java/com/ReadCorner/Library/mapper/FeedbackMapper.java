package com.ReadCorner.Library.mapper;

import com.ReadCorner.Library.dto_request.FeedbackRequest;
import com.ReadCorner.Library.dto_response.FeedbackResponse;
import com.ReadCorner.Library.entity.Book;
import com.ReadCorner.Library.entity.Feedback;
import com.ReadCorner.Library.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackMapper {

    // toFeedBackEntity
    public Feedback toFeedbackEntity(FeedbackRequest request, User user, Book book) {
        return Feedback.builder()
                .rate(request.getRate())
                .comment(request.getComment())
                .user(user)
                .book(book)
                .build();
    }

    public FeedbackResponse toFeedbackResponse(Feedback feedback) {
        User user = feedback.getUser();
        return FeedbackResponse.builder()
                .id(feedback.getId())
                .feedbackRate(feedback.getRate())
                .comment(feedback.getComment())
                .createdDate(feedback.getCreatedDate())
                .userFullName(user.getFirstName() + " " + user.getLastName())
                .userEmail(user.getEmail())
                .bookId(feedback.getBook().getId())
                .bookTitle(feedback.getBook().getTitle())
                .build();
    }

    public List<FeedbackResponse> toResponseList(List<Feedback> feedbackList) {
        return feedbackList.stream()
                .map(this::toFeedbackResponse)
                .collect(Collectors.toList());
    }
}
