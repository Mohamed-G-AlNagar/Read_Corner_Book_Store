package com.ReadCorner.Library.service;

import com.ReadCorner.Library.dto_request.AuthenticationRequest;
import com.ReadCorner.Library.dto_request.RegisterRequest;
import com.ReadCorner.Library.dto_response.GResponse;
import jakarta.mail.MessagingException;

public interface AuthenticationService {
    GResponse register(RegisterRequest request) throws MessagingException;
    GResponse authenticate(AuthenticationRequest request);
    GResponse activateAccount(String token) throws MessagingException;
    GResponse requestResetPassword(String email) throws MessagingException;

    GResponse confirmResetPassword(String token, String newPassword) throws MessagingException;
}
