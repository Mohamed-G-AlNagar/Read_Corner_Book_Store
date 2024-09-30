package com.ReadCorner.Library.service;

import com.ReadCorner.Library.dto_request.UserRequest;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.dto_response.UserResponse;
import com.ReadCorner.Library.entity.User;

import java.util.List;

public interface UserService {

    List<UserResponse> findAllUsers();
    UserResponse findUserById(int id);
    UserResponse findMyAccount();
    UserResponse updateUser(Integer Id, UserRequest request);
    UserResponse updateMe(UserRequest request);
    GResponse deleteAccount(Integer id);
    boolean isAdminLoggedIn();
    User getCurrentUser();
    boolean isLoggedInUser(Integer id);

}
