import { create } from 'zustand';
import { CartItem, Product, ProductAddon, ProductVariant } from '../types';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  appliedCoupon: string | null;
  discountAmount: number;
  deliveryFee: number;
  
  // Actions
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, selectedVariant?: ProductVariant, selectedAddons?: ProductAddon[], quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Computed Totals
  getSubtotal: () => number;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [
    // Pre-seed 1 item for instant interactive preview
    {
      cartItemId: 'sample-1',
      product: {
        id: 'p1111111-1111-1111-1111-111111111111',
        categoryId: 'c1111111-1111-1111-1111-111111111111',
        name: 'Truffle Mushroom Supreme',
        description: 'Loaded with sautéed wild mushrooms, black truffle oil, fresh mozzarella, and aromatic basil.',
        basePrice: 499,
        isVeg: true,
        isTodaySpecial: true,
        todaySpecialPrice: 449,
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        ratingCount: 142
      },
      selectedVariant: { id: 'v2', name: 'Medium (10")', priceDelta: 150 },
      selectedAddons: [{ id: 'a1', name: 'Extra Molten Cheese Burst Crust', price: 99 }],
      quantity: 1,
      totalPrice: 698
    }
  ],
  isCartOpen: false,
  appliedCoupon: null,
  discountAmount: 0,
  deliveryFee: 49,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  addItem: (product, selectedVariant, selectedAddons = [], quantity = 1) => {
    const effectivePrice = product.isTodaySpecial && product.todaySpecialPrice 
      ? product.todaySpecialPrice 
      : product.basePrice;
    
    const variantPriceDelta = selectedVariant ? selectedVariant.priceDelta : 0;
    const addonsTotalPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const itemUnitPrice = effectivePrice + variantPriceDelta + addonsTotalPrice;
    
    const cartItemId = `${product.id}-${selectedVariant?.id || 'base'}-${selectedAddons.map(a => a.id).sort().join('-')}`;

    set((state) => {
      const existingIndex = state.items.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingIndex];
        const newQty = existingItem.quantity + quantity;
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: newQty,
          totalPrice: itemUnitPrice * newQty
        };
        return { items: updatedItems, isCartOpen: true };
      } else {
        const newItem: CartItem = {
          cartItemId,
          product,
          selectedVariant,
          selectedAddons,
          quantity,
          totalPrice: itemUnitPrice * quantity
        };
        return { items: [...state.items, newItem], isCartOpen: true };
      }
    });
  },

  removeItem: (cartItemId) => {
    set((state) => ({
      items: state.items.filter(item => item.cartItemId !== cartItemId)
    }));
  },

  updateQuantity: (cartItemId, delta) => {
    set((state) => {
      const updatedItems = state.items.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          const unitPrice = item.totalPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            totalPrice: unitPrice * newQty
          };
        }
        return item;
      }).filter(Boolean) as CartItem[];

      return { items: updatedItems };
    });
  },

  clearCart: () => set({ items: [], appliedCoupon: null, discountAmount: 0 }),

  applyCoupon: (code) => {
    if (code.toUpperCase() === 'PIZZA50') {
      const subtotal = get().getSubtotal();
      const discount = Math.min(subtotal * 0.5, 150);
      set({ appliedCoupon: 'PIZZA50', discountAmount: discount });
      return true;
    } else if (code.toUpperCase() === 'FIRSTDEAL') {
      set({ appliedCoupon: 'FIRSTDEAL', discountAmount: 100 });
      return true;
    }
    return false;
  },

  removeCoupon: () => set({ appliedCoupon: null, discountAmount: 0 }),

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
  },

  getTotalPrice: () => {
    const subtotal = get().getSubtotal();
    const { discountAmount, deliveryFee } = get();
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - discountAmount + deliveryFee);
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  }
}));
