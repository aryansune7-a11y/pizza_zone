-- ========================================================
-- Pizza Zone Database Schema (V1__initial_schema.sql)
-- PostgreSQL 16 Compatible
-- ========================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------
-- 1. USERS & ACCESS CONTROL (RBAC)
-- --------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    full_name VARCHAR(100),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- --------------------------------------------------------
-- 2. RESTAURANTS, HOURS & TABLES
-- --------------------------------------------------------
CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(20),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE restaurant_hours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Monday, 7=Sunday
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    is_closed BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (restaurant_id, day_of_week)
);

CREATE TABLE restaurant_status_overrides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    reason VARCHAR(255) NOT NULL,
    ordering_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    delivery_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    pickup_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE restaurant_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    table_code VARCHAR(50) NOT NULL,
    qr_token TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (restaurant_id, table_code)
);

-- --------------------------------------------------------
-- 3. MENU, PRODUCTS & INVENTORY
-- --------------------------------------------------------
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id),
    restaurant_id UUID REFERENCES restaurants(id), -- Nullable for global products
    name VARCHAR(150) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    is_veg BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_today_special BOOLEAN NOT NULL DEFAULT FALSE,
    today_special_price DECIMAL(10, 2),
    prep_time_minutes INT DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- e.g. "Regular (8')", "Medium (10')", "Large (12')"
    price_delta DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    sort_order INT DEFAULT 0
);

CREATE TABLE product_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- e.g. "Extra Cheese", "Jalapenos", "Garlic Butter Crust"
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    sort_order INT DEFAULT 0
);

-- --------------------------------------------------------
-- 4. CARTS & USER ADDRESSES
-- --------------------------------------------------------
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label VARCHAR(50) DEFAULT 'Home',
    line1 TEXT NOT NULL,
    line2 TEXT,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    notes VARCHAR(255)
);

CREATE TABLE cart_item_addons (
    cart_item_id UUID NOT NULL REFERENCES cart_items(id) ON DELETE CASCADE,
    addon_id UUID NOT NULL REFERENCES product_addons(id),
    PRIMARY KEY (cart_item_id, addon_id)
);

-- --------------------------------------------------------
-- 5. ORDERS & PAYMENTS
-- --------------------------------------------------------
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('PERCENT', 'FLAT', 'BOGO')),
    value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2) DEFAULT 0.00,
    max_discount DECIMAL(10, 2),
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
    usage_limit INT,
    per_user_limit INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id),
    table_id UUID REFERENCES restaurant_tables(id),
    status VARCHAR(30) NOT NULL DEFAULT 'CREATED', -- CREATED, CONFIRMED, KITCHEN_PREPARING, READY_FOR_PICKUP, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
    order_type VARCHAR(20) NOT NULL CHECK (order_type IN ('DELIVERY', 'PICKUP', 'DINE_IN')),
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    delivery_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    tax DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,
    coupon_id UUID REFERENCES coupons(id),
    address_snapshot JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    name_snapshot VARCHAR(150) NOT NULL,
    price_snapshot DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    variant_snapshot JSONB,
    addons_snapshot JSONB
);

CREATE TABLE order_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    from_status VARCHAR(30),
    to_status VARCHAR(30) NOT NULL,
    changed_by UUID REFERENCES users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    note VARCHAR(255)
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    gateway VARCHAR(30) NOT NULL DEFAULT 'RAZORPAY',
    gateway_order_id VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'INITIATED', -- INITIATED, SUCCESS, FAILED, REFUNDED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    gateway_payment_id VARCHAR(100),
    gateway_signature VARCHAR(255),
    status VARCHAR(30) NOT NULL,
    raw_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupon_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coupon_id UUID NOT NULL REFERENCES coupons(id),
    user_id UUID NOT NULL REFERENCES users(id),
    order_id UUID NOT NULL REFERENCES orders(id),
    used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- 6. REVIEWS, NOTIFICATIONS & AUDIT LOGS
-- --------------------------------------------------------
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id),
    user_id UUID NOT NULL REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    is_hidden BOOLEAN DEFAULT FALSE,
    admin_response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    channel VARCHAR(20) NOT NULL CHECK (channel IN ('SMS', 'EMAIL', 'PUSH')),
    event_type VARCHAR(50) NOT NULL,
    payload JSONB,
    status VARCHAR(20) DEFAULT 'PENDING',
    sent_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100),
    before_json JSONB,
    after_json JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- 7. INDEXES
-- --------------------------------------------------------
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_products_category ON products(category_id, is_active);
CREATE INDEX idx_products_special ON products(is_today_special) WHERE is_today_special = TRUE;
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_order_status_hist ON order_status_history(order_id, changed_at);

-- --------------------------------------------------------
-- 8. INITIAL SEED DATA
-- --------------------------------------------------------
INSERT INTO roles (name, description) VALUES
('CUSTOMER', 'Default role for registered customer users'),
('ADMIN', 'Full system and store management access'),
('STAFF', 'Scoped access for kitchen and order management'),
('SUPER_ADMIN', 'Cross-branch platform owner');

INSERT INTO permissions (name, description) VALUES
('ORDER_READ', 'View customer orders'),
('ORDER_UPDATE_STATUS', 'Update order status in kitchen stream'),
('MENU_MANAGE', 'Create and modify menu items'),
('COUPON_MANAGE', 'Create and modify discount codes'),
('STORE_OVERRIDE', 'Manage emergency store pause and hours');

-- Sample Restaurant
INSERT INTO restaurants (id, name, slug, address, phone, is_active) VALUES
('11111111-1111-1111-1111-111111111111', 'Pizza Zone Flagship', 'pizza-zone-flagship', '123 Gourmet Pizza Street, Food District', '+919876543210', TRUE);

-- Sample Categories
INSERT INTO categories (id, name, slug, sort_order) VALUES
('c1111111-1111-1111-1111-111111111111', 'Signature Pizzas', 'signature-pizzas', 1),
('c2222222-2222-2222-2222-222222222222', 'Gourmet Sides', 'gourmet-sides', 2),
('c3333333-3333-3333-3333-333333333333', 'Beverages & Drinks', 'beverages-drinks', 3),
('c4444444-4444-4444-4444-444444444444', 'Desserts', 'desserts', 4);

-- Sample Products
INSERT INTO products (id, category_id, restaurant_id, name, description, base_price, is_veg, is_today_special, today_special_price, prep_time_minutes) VALUES
('a1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Truffle Mushroom Supreme', 'Loaded with sautéed wild mushrooms, black truffle oil, fresh mozzarella, and aromatic basil.', 499.00, TRUE, TRUE, 449.00, 20),
('b2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Fiery Pepperoni & Jalapeño Overload', 'Smokey pepperoni slices, fiery sliced jalapeños, red paprika, and 100% real mozzarella cheese.', 549.00, FALSE, FALSE, NULL, 18),
('d3333333-3333-3333-3333-333333333333', 'c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Paneer Tikka Passion', 'Marinated paneer cubes, crisp capsicum, charred onions, and spicy tikka gravy drip.', 429.00, TRUE, TRUE, 379.00, 15),
('e4444444-4444-4444-4444-444444444444', 'c2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Cheesy Garlic Stuffed Sticks', 'Freshly baked artisan dough stuffed with molten mozzarella and garlic butter drizzle.', 189.00, TRUE, FALSE, NULL, 12),
('f5555555-5555-5555-5555-555555555555', 'c3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Artisanal Cold Brew Sparkler', 'Refreshing carbonated espresso brew infused with citrus lemon zest.', 129.00, TRUE, FALSE, NULL, 5);

-- Sample Variants for Truffle Mushroom Supreme
INSERT INTO product_variants (product_id, name, price_delta, sort_order) VALUES
('a1111111-1111-1111-1111-111111111111', 'Regular (8")', 0.00, 1),
('a1111111-1111-1111-1111-111111111111', 'Medium (10")', 150.00, 2),
('a1111111-1111-1111-1111-111111111111', 'Monster Large (12")', 280.00, 3);

-- Sample Addons
INSERT INTO product_addons (product_id, name, price) VALUES
('a1111111-1111-1111-1111-111111111111', 'Extra Molten Cheese Burst Crust', 99.00),
('a1111111-1111-1111-1111-111111111111', 'Double Truffle Drizzle', 60.00);
