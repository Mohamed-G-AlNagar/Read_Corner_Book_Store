package com.ReadCorner.Library.repository;

import com.ReadCorner.Library.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByBookId(Integer bookId);
}