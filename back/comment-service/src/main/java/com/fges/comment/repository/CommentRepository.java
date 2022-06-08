package com.fges.comment.repository;


import com.fges.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<Comment> findCommentByCommentId(Long commentId);

    List<Comment> findCommentsByBookId(Long bookId);
}