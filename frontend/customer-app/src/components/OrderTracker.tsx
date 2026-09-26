import React, { useState } from 'react';
import { CookingPot, Truck, CheckCircle2, Clock, Flame, ChevronRight, X } from 'lucide-react';

interface OrderTrackerProps {
  orderNumber: string;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orderNumber, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(2); // 1: Confirmed, 2: Kitchen, 3: On The Way, 4: Delivered

  if (!isOpen) return null;

  const steps = [
    { label: 'Order Confirmed', time: '10:42 PM', icon: CheckCircle2 },
    { label: 'Baking in Oven (300°C)', time: '10:45 PM', icon: CookingPot },
    { label: 'Out for Delivery', time: 'Estimated 11:05 PM', icon: Truck },
    { label: 'Delivered Hot', time: 'Estimated 11:12 PM', icon: Flame }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pizza-dark/70 backdrop-blur-md animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-pizza-orange/10"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-pizza-dark transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-pizza-dark">Order {orderNumber}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-pizza-orange/10 text-pizza-orange font-extrabold text-xs">
              LIVE PREP
            </span>
          </div>
          <p className="text-xs text-pizza-muted">Estimated Delivery: 20 Mins</p>
        </div>

        {/* Live Progress Timeline */}
        <div className="space-y-4 pt-2">
          {steps.map((s, idx) => {
            const isDone = idx + 1 <= currentStep;
            const isCurrent = idx + 1 === currentStep;
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isDone 
                    ? 'bg-pizza-orange text-white shadow-md' 
                    : 'bg-gray-100 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-pizza-orange/20 animate-pulse' : ''}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h4 className={`text-xs font-bold ${isDone ? 'text-pizza-dark' : 'text-gray-400'}`}>
                      {s.label}
                    </h4>
                    <span className="text-[10px] font-semibold text-pizza-muted">{s.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-pizza-dark text-white font-bold text-xs hover:bg-pizza-orange transition-all"
        >
          Close Tracker
        </button>

      </div>
    </div>
  );
};
