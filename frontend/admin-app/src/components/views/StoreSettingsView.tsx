import React, { useState } from 'react';
import { Settings, Clock, AlertTriangle, Save, CheckCircle2 } from 'lucide-react';

export const StoreSettingsView: React.FC = () => {
  const [storeName, setStoreName] = useState('Pizza Zone Flagship');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('123 Gourmet Pizza Street, Food District');
  const [deliveryFee, setDeliveryFee] = useState('49');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1E293B] p-6 rounded-2xl border border-[#334155]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" />
            <span>Store Operations & Schedule Settings</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Configure restaurant operational parameters, weekly hours, and delivery fees.</p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Basic Info */}
        <div className="bg-[#1E293B] p-6 rounded-2xl border border-[#334155] space-y-4 shadow-xl">
          <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-[#334155] pb-3">
            Store Profile Information
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Restaurant Name</label>
              <input 
                type="text" 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Contact Phone</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Physical Address</label>
              <textarea 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Base Delivery Fee (₹)</label>
              <input 
                type="number" 
                value={deliveryFee} 
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Profile</span>
          </button>
        </div>

        {/* Operational Schedule */}
        <div className="bg-[#1E293B] p-6 rounded-2xl border border-[#334155] space-y-4 shadow-xl">
          <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-[#334155] pb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Weekly Operating Hours</span>
          </h3>

          <div className="space-y-2 text-xs">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="flex items-center justify-between bg-[#0F172A] p-2.5 rounded-xl border border-[#334155]/60">
                <span className="font-bold text-slate-200">{day}</span>
                <span className="text-emerald-400 font-mono font-bold">11:00 AM - 11:00 PM</span>
              </div>
            ))}
          </div>
        </div>

      </form>

    </div>
  );
};
