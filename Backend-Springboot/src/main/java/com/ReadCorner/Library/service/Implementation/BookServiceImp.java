package com.ReadCorner.Library.service.Implementation;

import com.ReadCorner.Library.dto_request.BookRequest;
import com.ReadCorner.Library.dto_request.BookUpdateRequest;
import com.ReadCorner.Library.dto_response.BookResponse;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.dto_response.PageResponse;
import com.ReadCorner.Library.entity.*;
import com.ReadCorner.Library.exception.NotAuthorizedException;
import com.ReadCorner.Library.exception.NotFoundException;
import com.ReadCorner.Library.mapper.BookMapper;
import com.ReadCorner.Library.mapper.PageResponseMapper;
import com.ReadCorner.Library.repository.BookRepository;
import com.ReadCorner.Library.repository.UserRepository;
import com.ReadCorner.Library.service.BookService;
import com.ReadCorner.Library.service.UserService;
import com.ReadCorner.Library.util.Cloud.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ConcurrentModificationException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookServiceImp implements BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final PageResponseMapper pageResponseMapper;
    private final UserRepository userRepository;
    private final UserService userService;
    private final CloudinaryService cloudinaryService;

    // TODO: Implement CRUD operations
    // get all books
    public PageResponse<BookResponse> getAllBooks(Integer page, Integer size, String sort) {
        List<BookResponse> booksResponse;
        Page<Book> books;

        if (size == null) {
            // fetch all books
            List<Book> allBooks = bookRepository.findAll(Sort.by(sort));
            booksResponse = allBooks.stream().map(bookMapper::toBookResponse).toList();
            books = new PageImpl<>(allBooks);
        } else {

            Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
            books = bookRepository.findAll(pageable);
            booksResponse = books.stream().map(bookMapper::toBookResponse).toList();
        }

        return pageResponseMapper.toPageResponse(booksResponse, books);
    }


    // get all books by category
    public PageResponse<BookResponse> getAllBooksByCategory(Integer page, Integer size, String category){
        Pageable pageable = PageRequest.of(page, size);
        Page <Book> books = bookRepository.findByCategory(category,pageable);
        List<BookResponse> booksResponse = books.stream().map(bookMapper::toBookResponse).toList();
        return  pageResponseMapper.toPageResponse(booksResponse, books);
    };
    // get all books by author name
    public PageResponse<BookResponse> getAllBooksByAuthor(Integer page, Integer size, String author){
        Pageable pageable = PageRequest.of(page, size);
        Page <Book> books = bookRepository.findByAuthor(author,pageable);
        List<BookResponse> booksResponse = books.stream().map(bookMapper::toBookResponse).toList();
        return  pageResponseMapper.toPageResponse(booksResponse, books);

    };

    // get books by containing title

    // get book by id
    public GResponse getBookById(Integer id){
        Book book = bookRepository.findById(id).orElseThrow(() -> new NotFoundException("Book not found"));
        return GResponse.builder()
                .status("SUCCESS")
                .message("Book Retrieved Successfully")
                .content((bookMapper.toBookDetailedResponse(book)))
                .build();
    };


    // create new book
    public GResponse save (BookRequest request) throws IOException {
        // check if logged-in user is author to add book (Admin)
        if (!userService.isAdminLoggedIn()) throw new NotAuthorizedException("Not Authorized to add book,only allowed to ADMIN users");

        // Upload the book cover image to Cloudinary
        String imageUrl = cloudinaryService.uploadImage(request.getBookCoverImage());
        request.setBookCover(imageUrl);

        Book bookEntity = bookMapper.toBookEntity(request);
        bookRepository.save(bookEntity);

        return GResponse.builder()
                .status("SUCCESS")
                .message("Book Saved Successfully")
                .content(bookMapper.toBookResponse(bookEntity))
                .build();
    };

    // delete book by id
    public GResponse deleteBook(Integer id) {
        // check if logged-in user is author to delete book (Admin)
        if (!userService.isAdminLoggedIn()) throw new NotAuthorizedException("Not Authorized to delete book, only allowed to ADMIN users");

        Book book = bookRepository.findById(id).orElseThrow(() -> new NotFoundException("Book not found"));

        // Delete the book cover image from Cloudinary
        if(book.getBookCover() != null)
        {
            String publicId = cloudinaryService.getPublicIdFromUrl(book.getBookCover());
            try {
                cloudinaryService.deleteImage(publicId);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image from Cloudinary", e);
            }
        }

        bookRepository.delete(book);
        return GResponse.builder()
                .status("SUCCESS")
                .message("Book Deleted Successfully")
                .content(bookMapper.toBookResponse(book))
                .build();
    }


    // update book by id
    public GResponse updateBook(Integer id,  BookUpdateRequest request) throws IOException {

        // check if logged-in user is author to update book (Admin)
        if (!userService.isAdminLoggedIn()) throw new NotAuthorizedException("Not Authorized to update book, only allowed to ADMIN users");

        Book book = bookRepository.findById(id).orElseThrow(() -> new NotFoundException("Book not found"));

        if (request.getBookCoverImage() != null) {
            // Delete the old book cover image from Cloudinary
            String publicId = cloudinaryService.getPublicIdFromUrl(book.getBookCover());
            try {
                cloudinaryService.deleteImage(publicId);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image from Cloudinary", e);
            }

            // Upload the new book cover image to Cloudinary
            String imageUrl = cloudinaryService.uploadImage(request.getBookCoverImage());
            request.setBookCover(imageUrl);
        }

        // update fields
        bookMapper.updateBookFromRequest(book, request);
        // save changes to database and return the updated book
        Book updatedBook = bookRepository.save(book);
        return GResponse.builder()
                .status("SUCCESS")
                .message("Book Updated Successfully")
                .content(bookMapper.toBookDetailedResponse(updatedBook))
                .build();
    }

    // increase book count by num
    @Transactional
    public void increaseOrderBooksStock(Order order) {

        for (OrderItem item : order.getOrderItems()) {
            Book book = bookRepository.findById(item.getBook().getId())
                    .orElseThrow(() -> new NotFoundException("Book not found"));

            book.setStock(book.getStock() + item.getQuantity());
            try {
                bookRepository.save(book);
            } catch (OptimisticLockingFailureException e) {
                // Handle concurrent modification
                throw new ConcurrentModificationException("Book stock was modified concurrently. Please try again.");
            }
        }


    }


    // decrease book count by num
    @Transactional
    public void decreaseOrderBooksStock(Order order) {
        for (OrderItem item : order.getOrderItems()) {
            Book book = bookRepository.findById(item.getBook().getId())
                    .orElseThrow(() -> new NotFoundException("Book not found"));

            if (book.getStock() < item.getQuantity()) throw new RuntimeException("Not enough stock to decrease book count");

            book.setStock(book.getStock() - item.getQuantity());
            try {
                bookRepository.save(book);
            } catch (OptimisticLockingFailureException e) {
                // Handle concurrent modification
                throw new ConcurrentModificationException("Book stock was modified concurrently. Please try again.");
            }
        }
    }

}

