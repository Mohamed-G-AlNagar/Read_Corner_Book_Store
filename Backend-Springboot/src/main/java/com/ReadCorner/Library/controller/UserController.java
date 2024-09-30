package com.ReadCorner.Library.controller;

import com.ReadCorner.Library.dto_request.UserRequest;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.dto_response.UserResponse;
import com.ReadCorner.Library.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {
    private final UserService userService;

    @GetMapping("/")
    public List<UserResponse> findAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/me")
    public UserResponse findMyAccount() {
        return userService.findMyAccount();
    }

    @GetMapping("/{id}")
    public UserResponse findUserById(@PathVariable Integer id) {

        return userService.findUserById(id);
    }

    @PatchMapping("/update_me")
    public UserResponse updateLoggedinUser( @RequestBody UserRequest requestModel) {
        return userService.updateMe(requestModel);
    }


    @PatchMapping("/{id}")
    public UserResponse updateUserById(@PathVariable Integer id, @RequestBody UserRequest requestModel) {
        return userService.updateUser(id,requestModel);
    }


    @DeleteMapping("/{id}")
    public GResponse deleteAccount(@PathVariable Integer id) {
        return userService.deleteAccount(id);
    }
    
}
