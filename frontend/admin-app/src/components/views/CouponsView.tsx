import React, { useState } from 'react';
import { Ticket, Plus, Tag, Check, X, ShieldAlert } from 'lucide-react';

interface CouponItem {
  id: string;
  code: string;
  type: 'PERCENT' | 'FLAT' | 'BOGO';
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  isActive: boolean;
  usageCount: number;
}

const INITIAL_COUPONS: CouponItem[] = [
  { id: 'c1', code: 'PIZZA50', type: 'PERCENT', value: 50, minOrderAmount: 299, maxDiscount: 150, isActive: true, usageCount: 412 },
  { id: 'c2', code: 'FIRSTDEAL', type: 'FLAT', value: 100, minOrderAmount: 399, isActive: true, usageCount: 890 },
  { id: 'c3', code: 'WEEKEND20', type: 'PERCENT', value: 20, minOrderAmount: 499, maxDiscount: 200, isActive: false, usageCount: 154 }
];

export const CouponsView: React.FC = () => {
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [code, setCode] = useState('');
  const [type, setType] = useState<'PERCENT' | 'FLAT'>('PERCENT');
  const [value, setValue] = useState('20');
  const [minOrder, setMinOrder] = useState('299');

  const toggleCoupon = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const newCoupon: CouponItem = {
      id: `c-${Date.now()}`,
      code: code.toUpperCase().trim(),
      type,
      value: parseFloat(value) || 10,
      minOrderAmount: parseFloat(minOrder) || 0,
      isActive: true,
      usageCount: 0
    };

    setCoupons([newCoupon, ...coupons]);
    setIsModalOpen(false);
    setCode('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1E293B] p-6 rounded-2xl border border-[#334155]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Ticket className="w-6 h-6 text-emerald-400" />
            <span>Coupons & Discount Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Configure promotional discount codes, percentage caps, and minimum order requirements.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Promo Code</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div key={c.id} className="bg-[#1E293B] rounded-2xl border border-[#334155] p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#334155] pb-3">
                <span className="font-mono text-lg font-black text-emerald-400 bg-[#0F172A] px-3 py-1 rounded-xl border border-[#334155]">
                  {c.code}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${c.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {c.isActive ? 'ACTIVE' : 'DISABLED'}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-white font-bold">
                  Discount: {c.type === 'PERCENT' ? `${c.value}% OFF` : `₹${c.value} FLAT OFF`}
                </p>
                <p className="text-slate-400">Min Order: ₹{c.minOrderAmount}</p>
                {c.maxDiscount && <p className="text-slate-400">Max Cap: ₹{c.maxDiscount}</p>}
                <p className="text-indigo-400 font-bold pt-1">Total Redeemed: {c.usageCount} times</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#334155] flex justify-between items-center">
              <button
                onClick={() => toggleCoupon(c.id)}
                className="text-xs font-bold text-slate-300 hover:text-white underline"
              >
                {c.isActive ? 'Disable Code' : 'Enable Code'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form onSubmit={handleCreateCoupon} className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 w-full max-w-md space-y-4 text-white shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#334155] pb-3">
              <h3 className="text-lg font-black text-white">Create New Promo Code</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Coupon Code (Uppercase)</label>
                <input 
                  type="text" 
                  value={code} 
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FESTIVE30"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none focus:border-indigo-500 font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Discount Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none"
                >
                  <option value="PERCENT">Percentage Discount (%)</option>
                  <option value="FLAT">Flat Amount Off (₹)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Discount Value</label>
                <input 
                  type="number" 
                  value={value} 
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Minimum Order Amount (₹)</label>
                <input 
                  type="number" 
                  value={minOrder} 
                  onChange={(e) => setMinOrder(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#334155] flex justify-end gap-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-[#0F172A] text-slate-400 text-xs font-bold">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">Create Coupon</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
