import React from 'react';
import { Sparkles, Clock, Flame, ShieldCheck } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1E1E1E] via-[#2A1810] to-[#120804] text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8 my-6 shadow-2xl border border-white/10">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pizza-orange/20 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pizza-crimson/30 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pizza-orange/20 border border-pizza-orange/40 text-pizza-amber text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-pizza-amber" />
            <span>Flat 50% OFF on First Order</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Hot, Fresh & <br />
            <span className="bg-gradient-to-r from-pizza-amber via-pizza-orange to-pizza-crimson bg-clip-text text-transparent">
              Oozing Cheese!
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-lg leading-relaxed">
            Authentic wood-fired sourdough pizzas baked to perfection in 300°C brick ovens. Delivered piping hot to your doorstep in 30 mins or less.
          </p>

          {/* Quick Badges */}
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm">
              <Clock className="w-4 h-4 text-pizza-amber" />
              <span className="text-xs font-medium">30 Mins Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm">
              <Flame className="w-4 h-4 text-pizza-orange" />
              <span className="text-xs font-medium">100% Real Mozzarella</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium">Contactless Delivery</span>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                const section = document.getElementById('menu-section');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pizza-orange to-pizza-crimson text-white font-extrabold text-base shadow-pizza-lg hover:brightness-110 active:scale-95 transition-all text-center"
            >
              Explore Menu Now
            </button>
            <div className="hidden sm:block text-xs text-gray-400">
              Use code <span className="text-pizza-amber font-mono font-bold bg-white/10 px-2 py-1 rounded">PIZZA50</span>
            </div>
          </div>
        </div>

        {/* Right Hero Visual Card */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-square rounded-full p-4 bg-gradient-to-tr from-pizza-orange/30 to-pizza-amber/10 border border-white/10 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" 
              alt="Artisanal Pizza" 
              className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/20 transform hover:rotate-6 transition-transform duration-500"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-2 -left-2 bg-[#1E1E1E]/90 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pizza-orange flex items-center justify-center text-white font-black text-lg">
                ★ 4.9
              </div>
              <div>
                <p className="text-xs font-bold text-white">Chef Special Sourdough</p>
                <p className="text-[11px] text-gray-400">Over 10,000+ orders this week</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
