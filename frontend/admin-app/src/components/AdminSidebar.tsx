import React from 'react';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  Ticket, 
  Users, 
  ShieldCheck, 
  History, 
  Settings,
  Sparkles
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview & Metrics', icon: LayoutDashboard },
    { id: 'kitchen', label: 'Live Kitchen Orders', icon: UtensilsCrossed, badge: '5 New' },
    { id: 'menu', label: 'Menu & Today Special', icon: ShoppingBag },
    { id: 'coupons', label: 'Coupons & Discounts', icon: Ticket },
    { id: 'staff', label: 'Staff & Roles (RBAC)', icon: Users },
    { id: 'audit', label: 'Audit Logs', icon: History },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#1E293B] border-r border-[#334155] flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center gap-3 border-b border-[#334155]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            ⚡
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white">PIZZA<span className="text-indigo-400">ADMIN</span></span>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Company Operations</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-300 hover:bg-[#334155]/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 2FA & Role Footer Card */}
      <div className="p-4 border-t border-[#334155]">
        <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-[#334155] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Security Mode</span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TOTP 2FA</span>
            </div>
          </div>
          <div className="text-xs font-bold text-white flex items-center justify-between">
            <span>Admin Operator</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400">SUPER_ADMIN</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
