package com.ReadCorner.Library.exception.exception_handler;


import com.ReadCorner.Library.exception.*;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.HashSet;
import java.util.Set;

import static com.ReadCorner.Library.exception.exception_handler.BusinessErrorCodes.*;
import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

//    -------------- User account Locked exception ---------------------//

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ExceptionResponse> handleException(LockedException exp) {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .status("FAILED")
                                .errorCode(ACCOUNT_LOCKED.getCode())
                                .errorDescription(ACCOUNT_LOCKED.getDescription())
                                .message(exp.getMessage())
                                .build()
                );
    }

//    -------------- User account disabled exception ---------------------//

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ExceptionResponse> handleException(DisabledException exp) {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .status("FAILED")
                                .errorCode(ACCOUNT_DISABLED.getCode())
                                .errorDescription(ACCOUNT_DISABLED.getDescription()+", please verify your email throw sent verfyEmail")
                                .message(exp.getMessage())
                                .build()
                );
    }


//    -------------- Wrong login email or pass exception ---------------------//

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException() {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .errorCode(BAD_CREDENTIALS.getCode())
                                .errorDescription(BAD_CREDENTIALS.getDescription())
                                .message("Login email or Password is incorrect")
                                .build()
                );
    }

    //    -------------- Duplicated email  exception ---------------------//
    // custom Exception UserAlreadyExistsException
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ExceptionResponse> handleUserAlreadyExistsException(UserAlreadyExistsException exp) {
        return ResponseEntity
                .status(CONFLICT) // Use CONFLICT (409) for resource conflicts
                .body(
                        ExceptionResponse.builder()
                                .status("FAILED")
                                .errorCode(DUBLICATED_EMAIL.getCode())
                                .errorDescription(DUBLICATED_EMAIL.getDescription())
                                .message("Email already exists")
                                .build()
                );
    }    //    -------------- Record Not Found Exception   ---------------------//
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleRecordNotFoundExistsException(NotFoundException exp) {
        return ResponseEntity
                .status(NOT_FOUND)
                .body(
                        ExceptionResponse.builder()
                                .status("FAILED")
                                .message(exp.getMessage())
                                .build()
                );
    }

//    -------------- send emails exception ---------------------//

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ExceptionResponse> handleException(MessagingException exp) {
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .status("FAILED")
                                .message(exp.getMessage())
                                .build()
                );
    }

//    -------------- User activation token exception ---------------------//

    @ExceptionHandler(ActivationTokenException.class)
    public ResponseEntity<ExceptionResponse> handleException(ActivationTokenException exp) {
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .status("FAILED")
                                .message(exp.getMessage())
                                .build()
                );
    }

//    -------------- User not logged in exception ---------------------//

    @ExceptionHandler(NotAuthorizedException.class)
    public ResponseEntity<ExceptionResponse> handleException(NotAuthorizedException exp) {
        return ResponseEntity
                .status(FORBIDDEN)
                .body(
                        ExceptionResponse.builder()
                                .status("FAILED")
                                .message(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(OperationNotPermittedException.class)
    public ResponseEntity<ExceptionResponse> handleException(OperationNotPermittedException exp) {
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .status("FAILED")
                                .message(exp.getMessage())
                                .build()
                );
    }

//    -------------- signup validations exception ---------------------//

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException exp) {
        Set<String> errors = new HashSet<>();
        exp.getBindingResult().getAllErrors()
                .forEach(error -> {
                    //var fieldName = ((FieldError) error).getField();
                    var errorMessage = error.getDefaultMessage();
                    errors.add(errorMessage);
                });

        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .validationErrors(errors)
                                .build()
                );
    }


    /*-------------- 404 error handler ---------------------*/
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ExceptionResponse> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body( ExceptionResponse.builder()
                        .status("FAILEd")
                        .message(ex.getMessage())
                        .errorDescription(ex.getRequestURL())
                        .build());
    }
    /*    -------------- Global Exception handler for not expected errors ---------------------*/

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception exp) {
        exp.printStackTrace();
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .errorDescription("Internal error, please contact the admin")
                                .message(exp.getMessage())
                                .build()
                );
    }
}



