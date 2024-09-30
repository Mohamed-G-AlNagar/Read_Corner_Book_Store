package com.ReadCorner.Library.service;

import com.ReadCorner.Library.dto_request.BookRequest;
import com.ReadCorner.Library.dto_request.BookUpdateRequest;
import com.ReadCorner.Library.dto_response.BookResponse;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.dto_response.PageResponse;
import com.ReadCorner.Library.entity.Order;
import java.io.IOException;

public interface BookService {

    PageResponse<BookResponse> getAllBooks(Integer page, Integer size, String sort);
    PageResponse<BookResponse> getAllBooksByCategory(Integer page, Integer size, String category);
    PageResponse<BookResponse> getAllBooksByAuthor(Integer page, Integer size, String author);
    GResponse getBookById(Integer id);
    GResponse save(BookRequest request) throws IOException;
    GResponse deleteBook(Integer id);
    GResponse updateBook(Integer id, BookUpdateRequest request) throws IOException;
    void increaseOrderBooksStock(Order order);
    void decreaseOrderBooksStock(Order order);
}
