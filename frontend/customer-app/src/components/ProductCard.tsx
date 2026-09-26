import React from 'react';
import { Product } from '../types';
import { Plus, Star, Sparkles, Clock } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onCustomize }) => {
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.variants && product.variants.length > 0) {
      onCustomize(product);
    } else {
      addItem(product);
    }
  };

  const displayPrice = product.isTodaySpecial && product.todaySpecialPrice 
    ? product.todaySpecialPrice 
    : product.basePrice;

  return (
    <div 
      onClick={() => onCustomize(product)}
      className="group relative bg-white rounded-3xl border border-pizza-orange/10 overflow-hidden shadow-sm hover:shadow-pizza-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Veg/Non-Veg Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 rounded-lg shadow-md border border-gray-200">
          <div className={`w-4 h-4 rounded-sm border-2 ${product.isVeg ? 'border-pizza-vegGreen' : 'border-pizza-nonVegRed'} flex items-center justify-center`}>
            <div className={`w-2 h-2 rounded-full ${product.isVeg ? 'bg-pizza-vegGreen' : 'bg-pizza-nonVegRed'}`} />
          </div>
        </div>

        {/* Today Special Tag */}
        {product.isTodaySpecial && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-pizza-orange to-pizza-crimson text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-pizza-amber" />
            <span>Today Special</span>
          </div>
        )}

        {/* Prep Time Badge */}
        {product.prepTimeMinutes && (
          <div className="absolute bottom-3 left-3 bg-pizza-dark/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3 text-pizza-amber" />
            <span>{product.prepTimeMinutes} mins</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-extrabold text-base text-pizza-dark group-hover:text-pizza-orange transition-colors line-clamp-1">
              {product.name}
            </h3>
            {product.rating && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-xs font-bold shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-pizza-muted line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add Button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-pizza-dark">₹{displayPrice}</span>
              {product.isTodaySpecial && (
                <span className="text-xs text-gray-400 line-through">₹{product.basePrice}</span>
              )}
            </div>
            {product.variants && product.variants.length > 0 && (
              <span className="text-[10px] font-bold text-pizza-orange uppercase tracking-wider block">Customizable</span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pizza-orange/10 hover:bg-pizza-orange text-pizza-orange hover:text-white font-extrabold text-xs transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>ADD</span>
          </button>
        </div>
      </div>

    </div>
  );
};
