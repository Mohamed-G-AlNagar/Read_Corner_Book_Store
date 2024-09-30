package com.ReadCorner.Library.config;


import com.ReadCorner.Library.entity.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

// used to identify the current logedin user id to use it to auto audit the createdby or updatedby,... fields
public class ApplicationAuditAware implements AuditorAware<Integer> {
    @Override
    public Optional<Integer> getCurrentAuditor() {

        //1- Get the currently authenticated user ID from the security context holder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        //2- return if no user is authenticated (no user logged in)
        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty();
        }

        //3- Get the user obj from the authenticated user principal
        User userPrincipal = (User) authentication.getPrincipal();

        return Optional.ofNullable(userPrincipal.getId());
    }
}

