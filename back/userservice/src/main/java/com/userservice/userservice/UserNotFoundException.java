package com.userservice.userservice;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(String message) {
        super(message);
        System.err.println(message);
    }
}
