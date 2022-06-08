package com.fges.book;

public class UserIdNotFound extends Exception{

    public UserIdNotFound(String message) {
        super(message);
        System.err.println(message);
    }
}
