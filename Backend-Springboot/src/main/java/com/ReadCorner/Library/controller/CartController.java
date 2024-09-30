package com.ReadCorner.Library.controller;

import com.ReadCorner.Library.dto_request.CartItemRequest;
import com.ReadCorner.Library.dto_request.CartRequest;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.service.CartService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
@Tag(name = "Cart")
public class CartController {

    private final CartService cartService;


    // make it in body
    @PostMapping("/add_item")
    public GResponse addToCart(@Valid @RequestBody CartRequest request) {
        return cartService.addBookToCart(request);
    }

    @DeleteMapping("/delete_item/{cartId}/{bookId}")
    public GResponse removeFromCart( @PathVariable Integer cartId,  @PathVariable Integer bookId) {
        return cartService.removeFromCart(cartId, bookId);
    }

    @DeleteMapping("/clear/{cartId}")
    public GResponse emptyCart(@PathVariable Integer cartId) {
        return cartService.emptyCart(cartId);
    }

    @GetMapping("/{cartId}")
    public GResponse getCart(@PathVariable Integer cartId) {
        return cartService.getCartById(cartId);
    }

    @PostMapping("/decrease_item")
    public GResponse decreaseItemQuantity(@Valid @RequestBody CartItemRequest request) {
        return cartService.decreaseItemQuantity(request);
    }
}

