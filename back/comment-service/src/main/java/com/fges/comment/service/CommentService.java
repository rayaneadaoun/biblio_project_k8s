package com.fges.comment.service;

import java.util.List;

import com.fges.comment.CommentNotFoundException;
import com.fges.comment.entity.Comment;
import com.fges.comment.repository.CommentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment saveComment(Comment comment){
        return commentRepository.save(comment);
    }

    public List<Comment> getAll(){
        return commentRepository.findAll();
    }

    //public Comment getCommentByTitle(String title) throws Exception{
    //  return commentRepository.findByTitle(title).orElseThrow( () -> new Exception("Comment not found"));
    //}

    public Comment getCommentById(Long commentId) throws Exception{
        return commentRepository.findCommentByCommentId(commentId).orElseThrow(() -> new Exception("Comment not found"));
    }

    public Comment updateComment(Comment comment) throws CommentNotFoundException {
        if(commentRepository.existsById(comment.getCommentId())) {
            return commentRepository.save(comment);
        }
        throw new CommentNotFoundException("Comment does not exist ...");
    }

    public void deleteCommentById(Long commentId) throws CommentNotFoundException {
        if(commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
        } else {
            throw new CommentNotFoundException("Comment does not exist ...");
        }
    }


    public List<Comment> getCommentsByBookId(Long bookId) {
        return commentRepository.findCommentsByBookId(bookId);
    }
}