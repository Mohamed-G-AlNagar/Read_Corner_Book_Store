package com.ReadCorner.Library.exception.exception_handler;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY) // return the not empty only
public class ExceptionResponse {
    private Integer errorCode;
    private String errorDescription;
    private String status;
    private HttpStatus statusCode;
    private String message;
    private Set<String> validationErrors;
    private Map<String, String> errors;
}

