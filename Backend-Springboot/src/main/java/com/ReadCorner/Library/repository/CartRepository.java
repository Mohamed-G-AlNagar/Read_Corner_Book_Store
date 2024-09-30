package com.ReadCorner.Library.repository;

import com.ReadCorner.Library.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Integer> {
    Optional<Cart> findByUserId(Integer userId);
    Optional<Cart> findByUserEmail(String email);
}
