import React from 'react';
import { Category } from '../types';
import { Flame, Utensils, Coffee, IceCream, Pizza } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  isVegOnly: boolean;
  onToggleVegOnly: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  isVegOnly,
  onToggleVegOnly
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'pizza': return <Pizza className="w-5 h-5" />;
      case 'sides': return <Utensils className="w-5 h-5" />;
      case 'drinks': return <Coffee className="w-5 h-5" />;
      case 'desserts': return <IceCream className="w-5 h-5" />;
      default: return <Flame className="w-5 h-5" />;
    }
  };

  return (
    <div id="menu-section" className="py-6 border-b border-pizza-orange/10 mb-8 sticky top-20 z-30 bg-[#FFFBF7]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Horizontal Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategoryId === 'all'
                ? 'bg-pizza-orange text-white shadow-pizza-lg scale-105'
                : 'bg-white text-pizza-dark border border-gray-200 hover:border-pizza-orange/50'
            }`}
          >
            <Flame className="w-4 h-4 text-pizza-amber" />
            <span>All Offerings</span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-pizza-orange text-white shadow-pizza-lg scale-105'
                    : 'bg-white text-pizza-dark border border-gray-200 hover:border-pizza-orange/50'
                }`}
              >
                {getIcon(cat.iconName)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Veg Only Toggle Switch */}
        <div className="flex items-center justify-end w-full md:w-auto gap-3 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm border-2 border-pizza-vegGreen flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-pizza-vegGreen" />
            </span>
            Veg Only Filter
          </span>
          
          <button
            onClick={onToggleVegOnly}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              isVegOnly ? 'bg-pizza-vegGreen' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isVegOnly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

      </div>
    </div>
  );
};
