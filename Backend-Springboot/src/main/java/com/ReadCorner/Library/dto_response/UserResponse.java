package com.ReadCorner.Library.dto_response;

import com.ReadCorner.Library.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private int id;
    private int cartId;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phone;
    private Role role;
}
