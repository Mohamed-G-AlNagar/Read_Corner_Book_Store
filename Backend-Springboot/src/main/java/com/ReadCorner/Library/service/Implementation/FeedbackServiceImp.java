package com.ReadCorner.Library.service.Implementation;


import com.ReadCorner.Library.dto_request.FeedbackRequest;
import com.ReadCorner.Library.dto_request.FeedbackUpdateRequest;
import com.ReadCorner.Library.dto_response.FeedbackResponse;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.entity.Book;
import com.ReadCorner.Library.entity.Feedback;
import com.ReadCorner.Library.entity.User;
import com.ReadCorner.Library.exception.NotAuthorizedException;
import com.ReadCorner.Library.exception.NotFoundException;
import com.ReadCorner.Library.mapper.FeedbackMapper;
import com.ReadCorner.Library.repository.FeedbackRepository;
import com.ReadCorner.Library.repository.BookRepository;
import com.ReadCorner.Library.repository.UserRepository;
import com.ReadCorner.Library.service.FeedbackService;
import com.ReadCorner.Library.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImp implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final FeedbackMapper feedbackMapper;
    private final UserService userService;

    public GResponse addFeedback(FeedbackRequest request) {
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new NotFoundException("Book with ID " + request.getBookId() + " not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException("User with ID " + request.getUserId() + " not found"));

        // Check if the current user is the author of the feedback
        User currentUser = userService.getCurrentUser();
        if (!user.getId().equals(currentUser.getId())) {
            throw new NotAuthorizedException("this is not the loggedin user");
        }

        Feedback feedback = feedbackMapper.toFeedbackEntity(request,user,book);

        feedbackRepository.save(feedback);

        return GResponse.builder()
                .status("SUCCESS")
                .message("Feedback added successfully")
                .content(feedbackMapper.toFeedbackResponse(feedback))
                .build();
    }

    public List<FeedbackResponse> getFeedbacksByBook(Integer bookId) {
        if (!bookRepository.existsById(bookId)) {
            throw new NotFoundException("Book with ID " + bookId + " not found");
        }
        List<Feedback> feedbacks = feedbackRepository.findByBookId(bookId);
        return feedbackMapper.toResponseList(feedbacks);
    }

    public GResponse deleteFeedback(Integer feedbackId) {

        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new NotFoundException("Feedback with ID " + feedbackId + " not found"));

        User currentUser = userService.getCurrentUser();

        // Check if the current user is the author of the feedback
        if (!feedback.getUser().getId().equals(currentUser.getId())) {
            throw new NotAuthorizedException("You are not authorized to delete this feedback");
        }

        feedbackRepository.delete(feedback);

        return GResponse.builder()
                .status("SUCCESS")
                .message("Feedback deleted successfully")
                .content(feedbackMapper.toFeedbackResponse(feedback))
                .build();
    }

    public GResponse updateFeedback(Integer feedbackId, FeedbackUpdateRequest request) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new NotFoundException("Feedback with ID " + feedbackId + " not found"));

        User currentUser = userService.getCurrentUser();

        // Check if the current user is the author of the feedback
        if (!feedback.getUser().getId().equals(currentUser.getId())) {
            throw new NotAuthorizedException("You are not authorized to update this feedback");
        }

        if (request.getRate() > 0 )feedback.setRate(request.getRate());
        if (request.getComment() != null) feedback.setComment(request.getComment());

        feedbackRepository.save(feedback);

        return GResponse.builder()
                .status("SUCCESS")
                .message("Feedback added successfully")
                .content(feedbackMapper.toFeedbackResponse(feedback))
                .build();
    }

}

