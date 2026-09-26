package com.pizzazone.admin.controller;

import com.pizzazone.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/coupons")
@Tag(name = "Admin Coupon Management", description = "Endpoints for creating & toggling promo codes")
public class AdminCouponController {

    @GetMapping
    @Operation(summary = "Get All Coupons", description = "Lists active and inactive discount coupons")
    @PreAuthorize("hasAuthority('COUPON_MANAGE') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getCoupons() {
        List<Map<String, Object>> coupons = List.of(
                Map.of("id", "c1", "code", "PIZZA50", "type", "PERCENT", "value", 50, "minOrderAmount", 299, "maxDiscount", 150, "isActive", true),
                Map.of("id", "c2", "code", "FIRSTDEAL", "type", "FLAT", "value", 100, "minOrderAmount", 399, "isActive", true)
        );
        return ResponseEntity.ok(ApiResponse.success(coupons, "Coupons retrieved successfully"));
    }

    @PostMapping
    @Operation(summary = "Create Promo Code", description = "Creates a new coupon code")
    @PreAuthorize("hasAuthority('COUPON_MANAGE') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createCoupon(@RequestBody CreateCouponRequest request) {
        Map<String, Object> coupon = Map.of(
                "id", "c-" + System.currentTimeMillis(),
                "code", request.code().toUpperCase(),
                "type", request.type(),
                "value", request.value(),
                "minOrderAmount", request.minOrderAmount(),
                "isActive", true
        );
        return ResponseEntity.ok(ApiResponse.success(coupon, "Coupon created successfully"));
    }

    public record CreateCouponRequest(String code, String type, Double value, Double minOrderAmount, Double maxDiscount) {}
}
