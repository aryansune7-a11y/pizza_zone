import React, { useState } from 'react';
import { Product, ProductAddon, ProductVariant } from '../types';
import { X, Check, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface CustomizationModalProps {
  product: Product | null;
  onClose: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const { addItem } = useCartStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  
  const [selectedAddons, setSelectedAddons] = useState<ProductAddon[]>([]);
  const [quantity, setQuantity] = useState(1);

  const toggleAddon = (addon: ProductAddon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const basePrice = product.isTodaySpecial && product.todaySpecialPrice 
    ? product.todaySpecialPrice 
    : product.basePrice;

  const variantDelta = selectedVariant ? selectedVariant.priceDelta : 0;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + variantDelta + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, selectedAddons, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pizza-dark/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        
        {/* Header Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pizza-dark/70 text-white flex items-center justify-center hover:bg-pizza-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-pizza-dark flex items-center gap-1.5 shadow-md">
            <span className={`w-3 h-3 rounded-sm border-2 ${product.isVeg ? 'border-pizza-vegGreen' : 'border-pizza-nonVegRed'} flex items-center justify-center`}>
              <span className={`w-1.5 h-1.5 rounded-full ${product.isVeg ? 'bg-pizza-vegGreen' : 'bg-pizza-nonVegRed'}`} />
            </span>
            <span>{product.isVeg ? 'Pure Veg' : 'Non-Veg'}</span>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <h2 className="text-2xl font-black text-pizza-dark">{product.name}</h2>
            <p className="text-xs text-pizza-muted mt-1 leading-relaxed">{product.description}</p>
          </div>

          {/* Size / Variant Options */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-pizza-dark mb-3">
                1. Select Size & Crust
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-pizza-orange bg-pizza-orange/10 font-bold shadow-sm'
                          : 'border-gray-200 hover:border-pizza-orange/50'
                      }`}
                    >
                      <span className="text-xs text-pizza-dark">{variant.name}</span>
                      <span className="text-xs text-pizza-orange font-black mt-1">
                        +₹{variant.priceDelta}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Addons Options */}
          {product.addons && product.addons.length > 0 && (
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-pizza-dark mb-3">
                2. Extra Cheese & Toppings (Optional)
              </label>
              <div className="space-y-2">
                {product.addons.map((addon) => {
                  const isChecked = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-pizza-orange bg-pizza-orange/5 font-bold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isChecked ? 'bg-pizza-orange border-pizza-orange text-white' : 'border-gray-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs text-pizza-dark font-medium">{addon.name}</span>
                      </div>
                      <span className="text-xs font-extrabold text-pizza-orange">+₹{addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Pricing & Submit Button */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-full bg-white p-1">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center font-black text-pizza-dark hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-3 font-extrabold text-sm">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-black text-pizza-dark hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Add to Cart Submit */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-pizza-orange to-pizza-crimson text-white font-extrabold text-sm shadow-pizza-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </div>
            <span className="text-base font-black">₹{totalPrice}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
