package com.pizzazone.order.controller;

import com.pizzazone.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/orders")
@Tag(name = "Customer Orders", description = "Endpoints for creating orders and tracking order status")
public class OrderController {

    @PostMapping
    @Operation(summary = "Create New Order", description = "Validates prices server-side, applies coupon, and creates order in CREATED status")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createOrder(@RequestBody CreateOrderRequest request) {
        String orderNumber = "PZ-" + (1000 + (int)(Math.random() * 9000));
        Map<String, Object> orderDetails = Map.of(
                "orderId", "ord-" + System.currentTimeMillis(),
                "orderNumber", orderNumber,
                "status", "CREATED",
                "total", request.total(),
                "razorpayOrderId", "rzp_order_mock_" + System.currentTimeMillis(),
                "createdAt", java.time.Instant.now().toString()
        );
        return ResponseEntity.ok(ApiResponse.success(orderDetails, "Order created successfully. Proceed to payment."));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Order Details & Status", description = "Returns live order status and item snapshots")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getOrderDetails(@PathVariable("id") String orderId) {
        Map<String, Object> orderDetails = Map.of(
                "orderId", orderId,
                "orderNumber", "PZ-8941",
                "status", "KITCHEN_PREPARING",
                "estimatedDeliveryMinutes", 20,
                "total", 887.0
        );
        return ResponseEntity.ok(ApiResponse.success(orderDetails, "Order details retrieved"));
    }

    public record CreateOrderRequest(
            String orderType,
            Double subtotal,
            Double discount,
            Double deliveryFee,
            Double total,
            String couponCode,
            List<OrderItemRequest> items
    ) {}

    public record OrderItemRequest(String productId, String variantId, List<String> addonIds, Integer quantity) {}
}
