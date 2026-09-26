import React, { useState } from 'react';
import { ShoppingBag, MapPin, Search, User, PhoneCall, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { AuthModal } from './AuthModal';

export const Header: React.FC = () => {
  const { getItemCount, toggleCart } = useCartStore();
  const itemCount = getItemCount();
  const [location, setLocation] = useState('Food District, Sector 4, City');
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFBF7]/95 backdrop-blur-md border-b border-pizza-orange/10 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pizza-crimson to-pizza-orange flex items-center justify-center text-white shadow-pizza-lg group-hover:scale-105 transition-transform">
                <span className="text-2xl font-black">🍕</span>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-pizza-dark">PIZZA<span className="text-pizza-orange">ZONE</span></span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-pizza-muted">Handcrafted Artisan</span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-pizza-dark">
              <a href="#" className="hover:text-pizza-orange transition-colors">Home</a>
              <button
                type="button"
                onClick={() => {
                  const section = document.getElementById('menu-section');
                  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="hover:text-pizza-orange transition-colors"
              >
                Menu
              </button>
              <a href="#deals" className="hover:text-pizza-orange transition-colors">Deals</a>
              <a href="#footer" className="hover:text-pizza-orange transition-colors">About</a>
            </nav>

            <button 
              onClick={() => alert("Location Switcher: Backend resolves nearest branch dynamically.")}
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pizza-orange/5 border border-pizza-orange/20 text-xs font-semibold text-pizza-dark hover:bg-pizza-orange/10 transition-colors"
            >
              <MapPin className="w-4 h-4 text-pizza-orange shrink-0" />
              <span className="truncate max-w-[200px]">{location}</span>
              <ChevronDown className="w-3.5 h-3.5 text-pizza-muted" />
            </button>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-pizza-muted" />
              <input
                type="text"
                placeholder="Search pizzas, cheese burst, garlic bread..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:border-pizza-orange focus:ring-2 focus:ring-pizza-orange/20 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="tel:+919876543210" 
              className="hidden sm:flex items-center gap-2 text-xs font-bold text-pizza-dark hover:text-pizza-orange transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-pizza-orange/10 flex items-center justify-center text-pizza-orange">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="hidden xl:inline">+91 98765 43210</span>
            </a>

            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm font-semibold hover:border-pizza-orange hover:text-pizza-orange transition-all"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>

            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-pizza-orange to-pizza-crimson text-white font-bold text-sm shadow-pizza-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="ml-1 w-6 h-6 rounded-full bg-pizza-amber text-pizza-dark font-black text-xs flex items-center justify-center shadow-md animate-bounce">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        onSuccess={(phone) => alert(`Successfully verified user: +91 ${phone}`)}
      />
    </header>
  );
};
