package com.pizzazone.auth.controller;

import com.pizzazone.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "Customer and admin auth endpoints")
public class AuthController {

    @PostMapping("/login")
    @Operation(summary = "Sign in", description = "Authenticates a user and returns a JWT-like session token")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        if (request.emailOrPhone() == null || request.emailOrPhone().isBlank()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Email or phone is required."));
        }
        if (request.password() == null || request.password().isBlank()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Password is required."));
        }

        String token = Base64.getEncoder()
                .encodeToString((request.emailOrPhone() + ":" + request.role() + ":pizza-zone").getBytes(StandardCharsets.UTF_8));

        return ResponseEntity.ok(ApiResponse.success(
                new AuthResponse(token, request.role(), request.emailOrPhone(), "Login successful"),
                "Login successful"
        ));
    }

    @PostMapping("/signup")
    @Operation(summary = "Create account", description = "Creates a local customer or admin profile placeholder")
    public ResponseEntity<ApiResponse<AuthResponse>> signup(@Valid @RequestBody SignupRequest request) {
        if (request.fullName() == null || request.fullName().isBlank()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Full name is required."));
        }
        if (request.emailOrPhone() == null || request.emailOrPhone().isBlank()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Email or phone is required."));
        }
        if (request.password() == null || request.password().isBlank()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Password is required."));
        }

        String token = Base64.getEncoder()
                .encodeToString((request.emailOrPhone() + ":" + request.role() + ":pizza-zone").getBytes(StandardCharsets.UTF_8));

        return ResponseEntity.ok(ApiResponse.success(
                new AuthResponse(token, request.role(), request.emailOrPhone(), "Account created successfully"),
                "Account created successfully"
        ));
    }

    public record LoginRequest(String emailOrPhone, String password, String role) {
    }

    public record SignupRequest(String fullName, String emailOrPhone, String password, String role) {
    }

    public record AuthResponse(String token, String role, String userIdentifier, String message) {
    }
}
