package com.ReadCorner.Library.dto_request;

import com.ReadCorner.Library.entity.Role;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {

    @NotEmpty(message = "Firstname is mandatory")
    @NotNull(message = "Firstname is mandatory")
    private String firstName;
    @NotEmpty(message = "Lastname is mandatory")
    @NotNull(message = "Lastname is mandatory")
    private String lastName;
    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    private String email;
    @NotEmpty(message = "Password is mandatory")
    @NotNull(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be 8 characters long minimum")
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+.=])(?=\\S+$).{8,}$",
            message = "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace"
    )
    private String password;

    @NotEmpty(message = "Address is mandatory")
    @NotNull(message = "Address is mandatory")
    private String address;

    @NotNull(message = "Phone is mandatory")
    @Pattern(
            regexp = "^01[0125][0-9]{8}$",
            message = "Phone number must start with 010, 011, 012, 015 followed by 9 digits"
    )
    private String phone;

    private Role role;
}