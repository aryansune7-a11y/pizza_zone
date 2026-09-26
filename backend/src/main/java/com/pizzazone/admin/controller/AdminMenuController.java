package com.pizzazone.admin.controller;

import com.pizzazone.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/products")
@Tag(name = "Admin Menu Management", description = "Endpoints for creating and modifying menu products & Today's Special")
public class AdminMenuController {

    @PostMapping
    @Operation(summary = "Create Product", description = "Creates a new menu item product")
    @PreAuthorize("hasAuthority('MENU_MANAGE') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createProduct(@RequestBody CreateProductRequest request) {
        Map<String, Object> product = Map.of(
                "id", "p-" + System.currentTimeMillis(),
                "name", request.name(),
                "basePrice", request.basePrice(),
                "isVeg", request.isVeg(),
                "category", request.category(),
                "isActive", true
        );
        return ResponseEntity.ok(ApiResponse.success(product, "Product created successfully"));
    }

    @PutMapping("/{id}/today-special")
    @Operation(summary = "Toggle Today's Special", description = "Flags/unflags a product as Today's Special with promotional pricing")
    @PreAuthorize("hasAuthority('MENU_MANAGE') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> toggleTodaySpecial(
            @PathVariable("id") String id,
            @RequestBody ToggleSpecialRequest request
    ) {
        Map<String, Object> result = Map.of(
                "productId", id,
                "isTodaySpecial", request.isTodaySpecial(),
                "todaySpecialPrice", request.todaySpecialPrice()
        );
        return ResponseEntity.ok(ApiResponse.success(result, "Today's Special status updated"));
    }

    public record CreateProductRequest(String name, String category, Double basePrice, Boolean isVeg, String description) {}
    public record ToggleSpecialRequest(Boolean isTodaySpecial, Double todaySpecialPrice) {}
}
