package com.fges.comment;

public class UserOrBookNotFoundException extends Exception {
    public UserOrBookNotFoundException(String message) {
        super(message);
        System.err.println(message);
    }
}
