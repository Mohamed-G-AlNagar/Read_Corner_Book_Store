package com.ReadCorner.Library.service.Implementation;

import com.ReadCorner.Library.dto_request.AuthenticationRequest;
import com.ReadCorner.Library.dto_request.RegisterRequest;
import com.ReadCorner.Library.dto_response.GResponse;
import com.ReadCorner.Library.entity.Cart;
import com.ReadCorner.Library.repository.CartRepository;
import com.ReadCorner.Library.service.AuthenticationService;
import com.ReadCorner.Library.util.email.EmailService;
import com.ReadCorner.Library.util.email.EmailTemplateName;
import com.ReadCorner.Library.entity.Token;
import com.ReadCorner.Library.entity.User;
import com.ReadCorner.Library.exception.NotFoundException;
import com.ReadCorner.Library.exception.UserAlreadyExistsException;
import com.ReadCorner.Library.mapper.AuthenticationMapper;
import com.ReadCorner.Library.repository.TokenRepository;
import com.ReadCorner.Library.repository.UserRepository;
import com.ReadCorner.Library.security.JwtService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImp implements AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    private final  UserRepository userRepository;
    private final EmailService emailService;
    private final AuthenticationMapper authenticationMapper;
    private final CartRepository cartRepository;

    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl ;

    @Value("${application.mailing.frontend.reset-pass-url}")
    private String resetPassUrl ;


    public GResponse register(RegisterRequest request) throws MessagingException {

        var userCheck = repository.findByEmail(request.getEmail());
        if(userCheck.isPresent()){
            throw new UserAlreadyExistsException("User email already exists");
        }
        // 1- create the user object user entity Mapping Builder.
        User user = authenticationMapper.toUserEntity(request);

        // 2- save the user to the database
        User savedUser = repository.save(user);
        // 3- send account activation mail.
        sendValidationEmail(user);

        // 4- issue cart for him
        Cart cart = new Cart();
        cart.setUser(savedUser);
        cart.setCreatedBy(savedUser.getId());
        cartRepository.save(cart);

        return authenticationMapper.toRegResponse("SUCCESS","Verification Code sent To email");
    }

    /*auth manager bean has method to authenticate the user based on the mail & pass*/
    public GResponse authenticate (AuthenticationRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("Email or Password is incorrect"));

        // check if account activated
        if (!user.isEnabled()){
            throw new RuntimeException("Please activate your mail first");
        };

        // auth the user password and email
         authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // create and save the JWT token for the authenticated user
        String jwtToken = jwtService.generateToken(user);
        // return the token in authentication response
        return authenticationMapper.toAuthResponse("SUCCESS","Logged-in Successfully",jwtToken);
    };


    public GResponse activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been send to the same email address");
        }

        // get the user if exist
        User user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        // activate the account and save it again
        user.setEnabled(true);
        userRepository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);

        return authenticationMapper.toActivateResponse("SUCCESS","Email has been activated");
    }

    /*-----------------------------Reset Password---------------------------------------*/
    public GResponse requestResetPassword(String email) throws MessagingException {

        System.out.println("email = "+email);
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Email is incorrect"));

        // check if account activated
        if (!user.isEnabled()){
            throw new RuntimeException("Please activate your mail first");
        };

        sendResetPassUsingTokenEmail(user);
        return GResponse.builder()
                .status("SUCCESS")
                .message("Reset Password Token has been sent successfully to email")
                .build();
    }


    public GResponse confirmResetPassword(String token, String newPassword) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendResetPassUsingTokenEmail(savedToken.getUser());
            throw new RuntimeException("Reset Pass token has expired. A new token has been send to the same email address");
        }

        User user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        // Reset Pass
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        savedToken.setExpiresAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
        return GResponse.builder()
                .status("SUCCESS")
                .message("Password has been reset")
                .build();
    }

    private void sendResetPassUsingTokenEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);

        emailService.sendEmail(
                user.getEmail(),
                user.getFullName(),
                EmailTemplateName.RESET_PASSWORD,
                resetPassUrl,
                newToken,
                "Account Reset Password"
        );
    }
    /*---------------- Validate email using sending activation token------------------*/

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);

        emailService.sendEmail(
                user.getEmail(),
                user.getFullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(User user) {
        // Generate a token
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);

        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }

}

