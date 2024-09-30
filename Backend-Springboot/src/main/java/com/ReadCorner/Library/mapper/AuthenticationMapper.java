package com.ReadCorner.Library.mapper;

import com.ReadCorner.Library.dto_request.RegisterRequest;
import com.ReadCorner.Library.dto_response.AuthenticationResponse;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.entity.Role;
import com.ReadCorner.Library.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;


@Component
@RequiredArgsConstructor
public class AuthenticationMapper {

    private final PasswordEncoder passwordEncoder;

    public User toUserEntity(RegisterRequest request) {
        return User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .phone(request.getPhone())
                .address(request.getAddress())
                .accountLocked(false)
                .enabled(false)
                .build();
    }

    public GResponse toAuthResponse(String stat,String msg, String token) {
        return GResponse.builder()
                .status(stat)
                .message(msg)
                .content(AuthenticationResponse.builder().accessToken(token).build())
                .build();
    }

    public GResponse toRegResponse(String stat, String msg) {
        return GResponse.builder()
                .status(stat)
                .message(msg)
                .build();
    }
    public GResponse toActivateResponse(String stat, String msg) {
        return GResponse.builder()
                .status(stat)
                .message(msg)
                .build();
    }




}
