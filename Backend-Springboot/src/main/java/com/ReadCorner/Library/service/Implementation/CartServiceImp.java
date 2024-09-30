package com.ReadCorner.Library.service.Implementation;


import com.ReadCorner.Library.dto_request.CartItemRequest;
import com.ReadCorner.Library.dto_request.CartRequest;
import com.ReadCorner.Library.dto_response.CartItemResponse;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.entity.Book;
import com.ReadCorner.Library.entity.Cart;
import com.ReadCorner.Library.entity.CartItem;
import com.ReadCorner.Library.exception.NotFoundException;
import com.ReadCorner.Library.mapper.CartItemMapper;
import com.ReadCorner.Library.mapper.CartMapper;
import com.ReadCorner.Library.repository.BookRepository;
import com.ReadCorner.Library.repository.CartItemRepository;
import com.ReadCorner.Library.repository.CartRepository;
import com.ReadCorner.Library.repository.UserRepository;
import com.ReadCorner.Library.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImp implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final CartItemMapper cartItemMapper;
    private final CartMapper cartMapper;


    // Get the user cart
    public GResponse getCartById(Integer cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(()-> new NotFoundException("Cart not found"));

        return GResponse.builder()
                .status("SUCCESS")
                .message("Cart Loaded Successfully")
                .content(cartMapper.toCartResponse(cart))
                .build();
    }

    // Add a book to the cart
    public GResponse addBookToCart(CartRequest request) {
        Cart cart = cartRepository.findById(request.getCartId()).orElseThrow(()-> new NotFoundException("Cart not found"));

        Book book = bookRepository.findById(request.getBookId()).orElseThrow(() -> new NotFoundException("Book not found"));


        CartItem cartItem = cart.getCartItems().stream()
                .filter(item -> item.getBook().getId().equals(request.getBookId()))
                .findFirst()
                .orElse(null);

        int newQuantity = request.getQuantity();
        if (cartItem != null) {
            newQuantity += cartItem.getQuantity(); // Add existing quantity if cart item exists
        }

        // Check if the new quantity exceeds the book's stock
        if (newQuantity > book.getStock()) {
            throw new IllegalArgumentException("The requested quantity exceeds the available stock.");
        }

        if (cartItem != null) {
            // If the cart item exists so increase the quantity
            cartItem.setQuantity(newQuantity);
        } else {
            // If the cart item nt exist so create a new one
            cartItem = new CartItem();
            cartItem.setBook(book);
            cartItem.setQuantity(request.getQuantity());
            cartItem.setCart(cart);
            cart.getCartItems().add(cartItem);
        }

        cartItemRepository.save(cartItem);
        return GResponse.builder()
                .status("SUCCESS")
                .message("Book added to cart")
                .content(cartItemMapper.toCartItemResponse(cartItem))
                .build();
    }

    // Delete from cart
    public GResponse removeFromCart(Integer cartId, Integer bookId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new NotFoundException("Cart not found"));


        CartItem cartItem = cartItemRepository.findByCartIdAndBookId(cart.getId(), bookId)
                .orElseThrow(() -> new NotFoundException("Item not found in the cart"));

        cartItemRepository.delete(cartItem);
        return GResponse.builder()
                .status("SUCCESS")
                .message("Book removed from cart")
                .content(cartItemMapper.toCartItemResponse(cartItem))
                .build();
    }

    // Empty cart from items
    public GResponse emptyCart(Integer cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new NotFoundException("Cart not found"));

        cart.getCartItems().clear();
        cartRepository.save(cart);

        return GResponse.builder()
                .status("SUCCESS")
                .message("Cart has been cleared ")
                .content(cartMapper.toCartResponse(cart))
                .build();
    }

    @Transactional
    public GResponse decreaseItemQuantity(CartItemRequest request) {

        CartItem cartItem = cartItemRepository.findByCartIdAndBookId(request.getCartId(), request.getBookId())
                .orElseThrow(() -> new NotFoundException("Item not found"));

        if (cartItem.getQuantity() > request.getQuantity()) {
            cartItem.setQuantity(cartItem.getQuantity() - request.getQuantity());
            cartItemRepository.save(cartItem);
        } else {
            cartItemRepository.delete(cartItem);
        }

        return GResponse.builder()
                .status("SUCCESS")
                .message("Item quantity updated")
                .content(cartItemMapper.toCartItemResponse(cartItem))
                .build();
    }

    public List<CartItemResponse> getAllItemsByCartId(Integer cartId) {
        List<CartItem> cartItems = cartItemRepository.findAllByCartId(cartId);

        return cartItems.stream()
                .map(cartItemMapper::toCartItemResponse)
                .toList();
    }
}
