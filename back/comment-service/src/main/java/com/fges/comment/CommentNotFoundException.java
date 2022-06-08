package com.fges.comment;

public class CommentNotFoundException extends Exception{
    public CommentNotFoundException(String message) {
        super(message);
        System.err.println(message);
    }
}
