package com.ReadCorner.Library.security;

import com.ReadCorner.Library.exception.NotAuthorizedException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        System.out.println("Request URL: " + request.getRequestURL());
        System.out.println("Request Header Authorization: " + request.getHeader("Authorization"));

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7); // Extract the token

        if (token.isEmpty()) {
            System.out.println("Token is empty after 'Bearer '");
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Token is missing or invalid.");
            return;
        }

        try {
            final String email = jwtService.extractUserName(token);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);

                if (jwtService.isTokenValid(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    System.out.println("Invalid JWT token");
                    sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid token. Please log in again.");
                    return;
                }
            } else {
                System.out.println("Email is null or token issues");
                sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Please log in first.");
                return;
            }
        } catch (ExpiredJwtException e) {
            System.out.println("Expired JWT token");
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Token has expired. Please log in again.");
            return;
        } catch (JwtException e) {
            System.out.println("JWT processing error");
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "JWT processing error. Please log in again.");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        PrintWriter writer = response.getWriter();
        writer.write("{\"status\": \"FAILED\",");
        writer.write("\"error\": \"" + message + "\"}");
        writer.flush();
    }
}
