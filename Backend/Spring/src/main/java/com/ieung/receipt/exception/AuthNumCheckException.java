package com.ieung.receipt.exception;

public class AuthNumCheckException extends RuntimeException {
    public AuthNumCheckException(String msg, Throwable t) {
        super(msg, t);
    }

    public AuthNumCheckException(String msg) {
        super(msg);
    }

    public AuthNumCheckException() {
        super();
    }
}
