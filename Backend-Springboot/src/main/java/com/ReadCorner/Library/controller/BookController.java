package com.ReadCorner.Library.controller;

import com.ReadCorner.Library.dto_request.BookRequest;
import com.ReadCorner.Library.dto_request.BookUpdateRequest;
import com.ReadCorner.Library.dto_response.BookResponse;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.dto_response.PageResponse;
import com.ReadCorner.Library.service.BookService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
@Tag(name = "Book") // for issue swagger group called Book
public class BookController {
    private final BookService bookService;

    // find all books
    @GetMapping("/")
    public ResponseEntity<PageResponse<BookResponse>> getBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) Integer page,
            @RequestParam(name = "size", required = false) Integer size,
            @RequestParam(name = "sort",defaultValue = "id", required = false) String sort
    ) {
        return ResponseEntity.ok(bookService.getAllBooks(page, size, sort));
    }

    // find all books by category
    @GetMapping("/books_by_category/{category}")
    public ResponseEntity<PageResponse<BookResponse>> getBooksByCategory(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @PathVariable("category") String category
    ) {
        return ResponseEntity.ok(bookService.getAllBooksByCategory(page, size, category));
    }

    // find all books by author
    @GetMapping("/books_by_author/{author}")
    public ResponseEntity<PageResponse<BookResponse>> getBooksByAuthor(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @PathVariable("author") String author
    ) {
        return ResponseEntity.ok(bookService.getAllBooksByAuthor(page, size, author));
    }

    // find book by id
    @GetMapping("/{id}")
    public ResponseEntity<GResponse> getBookById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    // add book
    @PostMapping("/")
    public ResponseEntity<GResponse> createBook(@Valid @ModelAttribute  BookRequest request,
                                                @RequestPart(value = "bookCoverImage", required = false) MultipartFile bookCoverImage) throws IOException {
        return ResponseEntity.ok(bookService.save(request));
    }

    // delete book
    @DeleteMapping("/{id}")
    public ResponseEntity<GResponse> deleteBook(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(bookService.deleteBook(id));
    }

    // update book
    @PutMapping("/{id}")
    public ResponseEntity<GResponse> updateBook(@PathVariable("id") Integer id,
                                                @Valid @ModelAttribute BookUpdateRequest request,
                                                @RequestPart(value = "bookCoverImage", required = false) MultipartFile bookCoverImage) throws IOException {
        return ResponseEntity.ok(bookService.updateBook(id, request));
    }

}
