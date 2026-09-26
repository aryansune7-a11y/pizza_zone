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
@RequestMapping("/api/v1/admin/orders")
@Tag(name = "Admin Order Management", description = "Endpoints for kitchen operations & order status stream")
public class AdminOrderController {

    @GetMapping
    @Operation(summary = "Get Kitchen Order Stream", description = "Lists all incoming and active kitchen orders for store operators")
    @PreAuthorize("hasAuthority('ORDER_READ') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<AdminOrderResponse>>> getOrders() {
        List<AdminOrderResponse> orders = List.of(
                new AdminOrderResponse("ord-101", "PZ-8941", "Aarav Sharma", "+91 98765 11111", "DELIVERY", "KITCHEN_PREPARING", "1x Truffle Mushroom Supreme (Medium), 1x Cheesy Garlic Sticks", 2, 887.0, "10 mins ago", null),
                new AdminOrderResponse("ord-102", "PZ-8942", "Ananya Verma", "+91 98765 22222", "DINE_IN", "CONFIRMED", "2x Fiery Pepperoni Overload (Monster)", 2, 1698.0, "4 mins ago", "TBL-04"),
                new AdminOrderResponse("ord-103", "PZ-8943", "Rohan Gupta", "+91 98765 33333", "PICKUP", "READY_FOR_PICKUP", "1x Paneer Tikka Passion, 1x Cold Brew Sparkler", 2, 508.0, "22 mins ago", null)
        );
        return ResponseEntity.ok(ApiResponse.success(orders, "Active kitchen order stream retrieved"));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Advance Order Workflow Status", description = "Updates order status (e.g. CONFIRMED -> KITCHEN_PREPARING -> OUT_FOR_DELIVERY)")
    @PreAuthorize("hasAuthority('ORDER_UPDATE_STATUS') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updateOrderStatus(
            @PathVariable("id") String orderId,
            @RequestBody UpdateStatusRequest request
    ) {
        Map<String, Object> response = Map.of(
                "orderId", orderId,
                "previousStatus", "CONFIRMED",
                "newStatus", request.status(),
                "updatedAt", java.time.Instant.now().toString(),
                "changedBy", "Admin Operator"
        );
        return ResponseEntity.ok(ApiResponse.success(response, "Order status advanced successfully"));
    }

    public record AdminOrderResponse(
            String id,
            String orderNumber,
            String customerName,
            String customerPhone,
            String orderType,
            String status,
            String itemsSummary,
            Integer itemCount,
            Double totalAmount,
            String createdAt,
            String tableCode
    ) {}

    public record UpdateStatusRequest(String status, String note) {}
}
