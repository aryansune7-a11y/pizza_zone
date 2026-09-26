package com.pizzazone.auth.controller;

import com.pizzazone.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Health & Store Status", description = "Endpoints for platform status and store operation checks")
public class HealthCheckController {

    @GetMapping("/health")
    @Operation(summary = "Check Backend System Health", description = "Returns active health status of Pizza Zone Spring Boot API")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        Map<String, Object> healthInfo = Map.of(
                "status", "UP",
                "service", "Pizza Zone Spring Boot API",
                "version", "1.0.0",
                "environment", "development"
        );
        return ResponseEntity.ok(ApiResponse.success(healthInfo, "System is healthy"));
    }

    @GetMapping("/restaurants/{id}/status")
    @Operation(summary = "Get Restaurant Live Operating Status", description = "Checks whether a restaurant is open and accepting orders")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getRestaurantStatus(@PathVariable("id") String id) {
        Map<String, Object> statusInfo = Map.of(
                "restaurantId", id,
                "isAcceptingOrders", true,
                "deliveryEnabled", true,
                "pickupEnabled", true,
                "dineInEnabled", true,
                "currentStatus", "OPEN",
                "message", "Kitchen is firing up hot pizzas!"
        );
        return ResponseEntity.ok(ApiResponse.success(statusInfo, "Restaurant operational status retrieved"));
    }
}
