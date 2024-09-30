package com.ReadCorner.Library.controller;

import com.ReadCorner.Library.dto_request.FeedbackRequest;
import com.ReadCorner.Library.dto_request.FeedbackUpdateRequest;
import com.ReadCorner.Library.dto_response.FeedbackResponse;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.service.FeedbackService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
@Tag(name = "Feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping("/")
    public ResponseEntity<GResponse> addFeedback(@Valid @RequestBody FeedbackRequest request) {
        return ResponseEntity.ok(feedbackService.addFeedback(request));
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<FeedbackResponse>> getFeedbacksByBook(@PathVariable Integer bookId) {
        return ResponseEntity.ok(feedbackService.getFeedbacksByBook(bookId));
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<GResponse> deleteFeedback(@PathVariable Integer feedbackId) {
       return ResponseEntity.ok(feedbackService.deleteFeedback(feedbackId));
    }

    @PutMapping("/{feedbackId}")
    public ResponseEntity<GResponse> updateFeedback(
            @PathVariable Integer feedbackId,
            @Valid @RequestBody FeedbackUpdateRequest request) {
        return ResponseEntity.ok(feedbackService.updateFeedback(feedbackId, request));
    }
}
