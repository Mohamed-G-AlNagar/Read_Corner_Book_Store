package com.ReadCorner.Library.repository;

import com.ReadCorner.Library.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsById(Integer id);

}
