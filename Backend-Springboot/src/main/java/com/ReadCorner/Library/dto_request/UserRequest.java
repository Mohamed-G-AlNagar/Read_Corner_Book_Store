package com.ReadCorner.Library.dto_request;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String firstName;
    private String lastName;
    private String address;
    @Pattern(
            regexp = "^01[0125][0-9]{8}$",
            message = "Phone number must start with 010, 011, 012, 015 followed by 9 digits"
    )
    private String phone;

}
