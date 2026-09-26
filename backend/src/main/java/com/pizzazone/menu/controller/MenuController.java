package com.pizzazone.menu.controller;

import com.pizzazone.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Menu Catalog", description = "Endpoints for menu categories and products")
public class MenuController {

    @GetMapping({"/menu", "/menu/catalog"})
    @Operation(summary = "Get the active menu catalog", description = "Returns the category list and product catalog used by the customer app")
    public ResponseEntity<ApiResponse<MenuCatalogResponse>> getMenuCatalog() {
        return ResponseEntity.ok(ApiResponse.success(new MenuCatalogResponse(categories(), products()), "Menu loaded successfully"));
    }

    @GetMapping("/menu/categories")
    @Operation(summary = "Get categories only", description = "Returns menu categories without the full product list")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategories() {
        return ResponseEntity.ok(ApiResponse.success(categories(), "Categories loaded successfully"));
    }

    private List<CategoryResponse> categories() {
        return List.of(
                new CategoryResponse("c1", "Signature Pizzas", "signature-pizzas", "pizza"),
                new CategoryResponse("c2", "Gourmet Sides", "gourmet-sides", "sides"),
                new CategoryResponse("c3", "Beverages", "beverages", "drinks"),
                new CategoryResponse("c4", "Desserts", "desserts", "desserts")
        );
    }

    private List<ProductResponse> products() {
        return List.of(
                new ProductResponse(
                        "p1",
                        "c1",
                        "Truffle Mushroom Supreme",
                        "Loaded with sautéed wild mushrooms, black truffle oil, fresh mozzarella, and aromatic basil.",
                        499.0,
                        true,
                        true,
                        449.0,
                        20,
                        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
                        4.9,
                        142,
                        List.of(
                                new VariantResponse("v1", "Regular (8\")", 0.0),
                                new VariantResponse("v2", "Medium (10\")", 150.0),
                                new VariantResponse("v3", "Monster (12\")", 280.0)
                        ),
                        List.of(
                                new AddonResponse("a1", "Extra Molten Cheese Burst Crust", 99.0),
                                new AddonResponse("a2", "Double Truffle Drizzle", 60.0)
                        )
                ),
                new ProductResponse(
                        "p2",
                        "c1",
                        "Fiery Pepperoni & Jalapeño Overload",
                        "Smokey pepperoni slices, fiery sliced jalapeños, red paprika, and 100% real mozzarella cheese.",
                        549.0,
                        false,
                        false,
                        null,
                        18,
                        "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
                        4.8,
                        98,
                        List.of(
                                new VariantResponse("v1", "Regular (8\")", 0.0),
                                new VariantResponse("v2", "Medium (10\")", 160.0),
                                new VariantResponse("v3", "Monster (12\")", 300.0)
                        ),
                        List.of(
                                new AddonResponse("a3", "Extra Pepperoni Slices", 80.0)
                        )
                ),
                new ProductResponse(
                        "p3",
                        "c1",
                        "Paneer Tikka Passion",
                        "Marinated paneer cubes, crisp capsicum, charred onions, and spicy tikka gravy drip.",
                        429.0,
                        true,
                        true,
                        379.0,
                        15,
                        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
                        4.7,
                        210,
                        List.of(
                                new VariantResponse("v1", "Regular (8\")", 0.0),
                                new VariantResponse("v2", "Medium (10\")", 130.0),
                                new VariantResponse("v3", "Monster (12\")", 240.0)
                        ),
                        List.of()
                ),
                new ProductResponse(
                        "p4",
                        "c2",
                        "Cheesy Garlic Stuffed Sticks",
                        "Freshly baked artisan dough stuffed with molten mozzarella and garlic butter drizzle.",
                        189.0,
                        true,
                        false,
                        null,
                        12,
                        "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80",
                        4.9,
                        312,
                        List.of(),
                        List.of()
                ),
                new ProductResponse(
                        "p5",
                        "c3",
                        "Artisanal Cold Brew Sparkler",
                        "Refreshing carbonated espresso brew infused with citrus lemon zest.",
                        129.0,
                        true,
                        false,
                        null,
                        5,
                        "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
                        4.6,
                        75,
                        List.of(),
                        List.of()
                )
        );
    }

    public record MenuCatalogResponse(List<CategoryResponse> categories, List<ProductResponse> products) {
    }

    public record CategoryResponse(String id, String name, String slug, String iconName) {
    }

    public record ProductResponse(
            String id,
            String categoryId,
            String name,
            String description,
            Double basePrice,
            Boolean isVeg,
            Boolean isTodaySpecial,
            Double todaySpecialPrice,
            Integer prepTimeMinutes,
            String imageUrl,
            Double rating,
            Integer ratingCount,
            List<VariantResponse> variants,
            List<AddonResponse> addons
    ) {
    }

    public record VariantResponse(String id, String name, Double priceDelta) {
    }

    public record AddonResponse(String id, String name, Double price) {
    }
}
