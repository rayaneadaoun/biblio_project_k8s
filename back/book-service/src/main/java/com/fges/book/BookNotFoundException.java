package com.fges.book;

public class BookNotFoundException extends Exception {
    public BookNotFoundException(String message) {
        super(message);
        System.err.println(message);
    }
}
