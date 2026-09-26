import React, { useState } from 'react';
import { Bell, Power, AlertTriangle, CheckCircle2, UserCheck } from 'lucide-react';

interface AdminHeaderProps {
  storeStatus: 'OPEN' | 'PAUSED' | 'EMERGENCY_CLOSED';
  onToggleStoreStatus: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ storeStatus, onToggleStoreStatus }) => {
  return (
    <header className="h-20 bg-[#1E293B] border-b border-[#334155] px-8 flex items-center justify-between sticky top-0 z-30">
      
      {/* Live Store Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-[#0F172A] px-4 py-2 rounded-2xl border border-[#334155]">
          <span className="text-xs font-bold text-slate-300">Live Kitchen Accepting Orders:</span>
          <button
            onClick={onToggleStoreStatus}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
              storeStatus === 'OPEN'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}
          >
            {storeStatus === 'OPEN' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>STORE OPEN</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>EMERGENCY PAUSE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Admin Quick Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2.5 rounded-xl bg-[#0F172A] border border-[#334155] text-slate-300 hover:text-white hover:border-indigo-500 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
        </button>

        {/* User Session Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#334155]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-white">Main Company Admin</span>
            <span className="block text-[10px] text-slate-400">admin@pizzazone.in</span>
          </div>

          <button 
            onClick={() => alert("Logout 2FA Session: Revokes admin refresh token.")}
            className="p-2 text-slate-400 hover:text-rose-400 transition-colors ml-2"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>

    </header>
  );
};
