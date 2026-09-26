import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pizza-dark text-white border-t border-white/10 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-pizza-orange flex items-center justify-center text-white text-xl font-bold">
                🍕
              </div>
              <span className="text-xl font-black tracking-tight">PIZZA<span className="text-pizza-orange">ZONE</span></span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Handcrafted wood-fired sourdough pizzas made with 100% natural ingredients, fresh mozzarella, and slow-fermented crusts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-extrabold text-pizza-amber uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li><a href="#menu-section" className="hover:text-pizza-orange transition-colors">Artisanal Pizzas</a></li>
              <li><a href="#menu-section" className="hover:text-pizza-orange transition-colors">Gourmet Sides & Breads</a></li>
              <li><a href="#menu-section" className="hover:text-pizza-orange transition-colors">Beverages & Shakes</a></li>
              <li><a href="#" className="hover:text-pizza-orange transition-colors">Store Locator & Hours</a></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-sm font-extrabold text-pizza-amber uppercase tracking-wider mb-4">Store Hours</h4>
            <div className="text-xs text-gray-300 space-y-2 font-medium">
              <p>Mon - Thu: 11:00 AM - 11:00 PM</p>
              <p>Fri - Sun: 11:00 AM - 01:00 AM</p>
              <p className="text-pizza-orange font-bold pt-1">🔥 Late Night Kitchen Active</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-extrabold text-pizza-amber uppercase tracking-wider mb-4">Need Help?</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pizza-orange" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pizza-orange" />
                <span>orders@pizzazone.in</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pizza-orange shrink-0" />
                <span>123 Gourmet Pizza Street, Food District</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Pizza Zone India. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pizza-crimson fill-pizza-crimson" />
            <span>for Pizza Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
