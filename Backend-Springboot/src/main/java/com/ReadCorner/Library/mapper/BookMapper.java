package com.ReadCorner.Library.mapper;

import com.ReadCorner.Library.dto_request.BookRequest;
import com.ReadCorner.Library.dto_request.BookUpdateRequest;
import com.ReadCorner.Library.dto_response.BookDetailedResponse;
import com.ReadCorner.Library.dto_response.BookResponse;
import com.ReadCorner.Library.entity.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookMapper {
    private final FeedbackMapper feedbackMapper;

    public Book toBookEntity (BookRequest request) {
        return Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .category(request.getCategory())
                .price(request.getPrice())
                .stock(request.getStock())
                .totalCopies(request.getTotalCopies())
                .description(request.getDescription())
                .bookCover(request.getBookCover())
                .build();
    }

    public BookResponse toBookResponse (Book book) {
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .category(book.getCategory())
                .price(book.getPrice())
                .stock(book.getStock())
                .bookCover(book.getBookCover())
                .rating(book.getRate())
                .build();
    }

    public BookDetailedResponse toBookDetailedResponse (Book book) {
        return BookDetailedResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .category(book.getCategory())
                .price(book.getPrice())
                .stock(book.getStock())
                .totalCopies(book.getTotalCopies())
                .bookCover(book.getBookCover())
                .rating(book.getRate())
                .description(book.getDescription())
                .feedbacks(feedbackMapper.toResponseList(book.getFeedbacks()))
                .build();
    }


    public void updateBookFromRequest(Book book, BookUpdateRequest request) {
        if (request.getTitle() != null) {
            book.setTitle(request.getTitle());
        }
        if (request.getAuthor() != null) {
            book.setAuthor(request.getAuthor());
        }
        if (request.getDescription() != null) {
            book.setDescription(request.getDescription());
        }
        if (request.getCategory() != null) {
            book.setCategory(request.getCategory());
        }
        if (request.getPrice() > 0) {
            book.setPrice(request.getPrice());
        }
        if (request.getTotalCopies() != null) {
            book.setTotalCopies(request.getTotalCopies());
        }
        if (request.getStock() != null) {
            book.setStock(request.getStock());
        }
        if (request.getBookCover() != null) {
            book.setBookCover(request.getBookCover());
        }

    }


}