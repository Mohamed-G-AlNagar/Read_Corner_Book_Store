package com.ReadCorner.Library.service.Implementation;

import com.ReadCorner.Library.dto_request.UserRequest;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.dto_response.UserResponse;
import com.ReadCorner.Library.entity.Role;
import com.ReadCorner.Library.entity.User;
import com.ReadCorner.Library.exception.NotAuthorizedException;
import com.ReadCorner.Library.exception.NotFoundException;
import com.ReadCorner.Library.mapper.UserMapper;
import com.ReadCorner.Library.repository.TokenRepository;
import com.ReadCorner.Library.repository.UserRepository;
import com.ReadCorner.Library.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
@RequiredArgsConstructor
@Service
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userResponseMapper;
    private final TokenRepository tokenRepository;

    public List<UserResponse> findAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map(userResponseMapper::toUserResponse).toList();
    }


    public UserResponse findUserById(int id) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(() -> new NotFoundException("User with id " + id + " not found"));

        return userResponseMapper.toUserResponse(user);
    }

    public UserResponse findMyAccount() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() -> new NotFoundException("User with email " + email + " not found"));

        return userResponseMapper.toUserResponse(user);
    }

    public UserResponse updateUser(Integer Id, UserRequest request) {

        User user =
                userRepository
                        .findById(Id)
                        .orElseThrow(
                                () -> new NotFoundException("User not found"));

        if (Objects.nonNull(request.getFirstName()) && !request.getFirstName().isBlank()) {
            user.setFirstName(request.getFirstName());
        }

        if (Objects.nonNull(request.getLastName()) && !request.getLastName().isBlank()) {
            user.setLastName(request.getLastName());
        }

        if (Objects.nonNull(request.getPhone()) && !request.getPhone().isBlank()) {
            user.setPhone(request.getPhone());
        }

        if (Objects.nonNull(request.getAddress()) && !request.getAddress().isBlank()) {
            user.setAddress(request.getAddress());
        }

        userRepository.save(user);

        return userResponseMapper.toUserResponse(user);
    }

    public UserResponse updateMe(UserRequest request) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () -> new NotFoundException("User with email " + email + " not found"));

        // check if the field excist to update
        if (Objects.nonNull(request.getFirstName()) && !request.getFirstName().isBlank()) {
            user.setFirstName(request.getFirstName());
        }

        if (Objects.nonNull(request.getLastName()) && !request.getLastName().isBlank()) {
            user.setLastName(request.getLastName());
        }

        if (Objects.nonNull(request.getPhone()) && !request.getPhone().isBlank()) {
            user.setPhone(request.getPhone());
        }

        if (Objects.nonNull(request.getAddress()) && !request.getAddress().isBlank()) {
            user.setAddress(request.getAddress());
        }

        userRepository.save(user);

        return userResponseMapper.toUserResponse(user);
    }

    public GResponse deleteAccount(Integer id) {

        if (!isAdminLoggedIn()) throw new NotAuthorizedException("Only Admin allowed to delete users");
        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new NotFoundException("User not found"));

        tokenRepository.deleteAllByUser(user);

        userRepository.delete(user);
        return GResponse.builder()
                .status("SUCCESS")
                .message("user with Email: " + user.getEmail() + " was deleted")
                .build();
    }

    public boolean isAdminLoggedIn(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () -> new NotFoundException("User with email " + email + " not found"));
        return user.getRole() == Role.ADMIN;
    }



    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof User) {
            return (User) principal;
        } else if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new NotFoundException("User with email " + email + " not found"));
        } else {
            throw new NotAuthorizedException("Unable to find the authenticated user");
        }
    }

    public boolean isLoggedInUser(Integer id){
        return Objects.equals(getCurrentUser().getId(), id);
    }

}
