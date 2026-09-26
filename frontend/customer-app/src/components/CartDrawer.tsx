import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    closeCart, 
    items, 
    updateQuantity, 
    removeItem, 
    getSubtotal, 
    getTotalPrice,
    appliedCoupon,
    discountAmount,
    deliveryFee,
    applyCoupon,
    removeCoupon
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const grandTotal = getTotalPrice();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponInput.trim()) return;

    const success = applyCoupon(couponInput.trim());
    if (success) {
      setCouponSuccess(`Coupon '${couponInput.toUpperCase()}' applied successfully!`);
      setCouponInput('');
    } else {
      setCouponError("Invalid promo code. Try 'PIZZA50' or 'FIRSTDEAL'.");
    }
  };

  const handleCheckout = () => {
    alert("Checkout Order Flow: Creates order in status CREATED, initializes Razorpay Payment Order on Backend.");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-pizza-dark/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={closeCart}
        className="absolute inset-0" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-pizza-orange/10">
          
          {/* Cart Drawer Header */}
          <div className="p-6 bg-pizza-cream border-b border-pizza-orange/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-pizza-dark">Your Order Cart</span>
              <span className="text-xs font-bold text-white bg-pizza-orange px-2 py-0.5 rounded-full">
                {items.length} Items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-pizza-orange/10 text-pizza-muted hover:text-pizza-orange transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 rounded-full bg-pizza-orange/10 flex items-center justify-center text-pizza-orange text-3xl">
                  🍕
                </div>
                <h3 className="text-lg font-bold text-pizza-dark">Your cart is currently empty</h3>
                <p className="text-xs text-pizza-muted max-w-xs">
                  Looks like you haven't added any handcrafted pizzas yet!
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-pizza-orange text-white text-xs font-bold shadow-md hover:bg-pizza-crimson transition-all"
                >
                  Explore Delicious Menu
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 p-3.5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-pizza-orange/30 transition-all">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs text-pizza-dark truncate">{item.product.name}</h4>
                      <button 
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-gray-400 hover:text-pizza-crimson transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.selectedVariant && (
                      <p className="text-[10px] text-pizza-muted font-medium">Size: {item.selectedVariant.name}</p>
                    )}

                    {item.selectedAddons.length > 0 && (
                      <p className="text-[10px] text-pizza-orange font-medium truncate">
                        Addons: {item.selectedAddons.map(a => a.name).join(', ')}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-black text-pizza-dark">₹{item.totalPrice}</span>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 px-1 py-0.5">
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="w-5 h-5 flex items-center justify-center text-pizza-dark font-extrabold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="w-5 h-5 flex items-center justify-center text-pizza-dark font-extrabold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary & Coupon Section */}
          {items.length > 0 && (
            <div className="p-6 bg-pizza-cream border-t border-pizza-orange/10 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>Code '{appliedCoupon}' applied (-₹{discountAmount})</span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-emerald-900 underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Try 'PIZZA50' or 'FIRSTDEAL'"
                      className="flex-1 px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-pizza-orange"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-pizza-dark text-white text-xs font-bold hover:bg-pizza-orange transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[11px] text-pizza-crimson font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {couponError}
                  </p>
                )}
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {couponSuccess}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-pizza-muted border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-bold text-pizza-dark">₹{subtotal}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-pizza-dark">₹{deliveryFee}</span>
                </div>

                <div className="flex justify-between text-sm font-black text-pizza-dark border-t border-gray-300 pt-2 mt-2">
                  <span>Grand Total</span>
                  <span className="text-pizza-orange text-base">₹{grandTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-pizza-orange to-pizza-crimson text-white font-black text-sm shadow-pizza-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
