export interface ProductVariant {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  isVeg: boolean;
  isTodaySpecial?: boolean;
  todaySpecialPrice?: number;
  prepTimeMinutes?: number;
  imageUrl: string;
  rating?: number;
  ratingCount?: number;
  variants?: ProductVariant[];
  addons?: ProductAddon[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedVariant?: ProductVariant;
  selectedAddons: ProductAddon[];
  quantity: number;
  totalPrice: number;
}

export interface UserAddress {
  id: string;
  label: string;
  line1: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  phone: string;
  fullName?: string;
  email?: string;
}
