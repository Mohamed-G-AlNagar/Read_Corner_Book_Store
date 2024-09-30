package com.ReadCorner.Library.repository;

import com.ReadCorner.Library.entity.Token;
import com.ReadCorner.Library.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(String token);

    @Modifying
    @Transactional
    void deleteAllByUser(User user);
}
