package com.ReadCorner.Library.repository;

import com.ReadCorner.Library.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository <CartItem,Integer> {

    Optional<CartItem> findByCartIdAndBookId(Integer cartId, Integer bookId);

    @Query("SELECT ci FROM CartItem ci WHERE ci.cart.id = :cartId")
    List<CartItem> findAllByCartId(@Param("cartId") Integer cartId);
}
