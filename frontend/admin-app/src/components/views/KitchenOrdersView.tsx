import React, { useState } from 'react';
import { AdminOrder, OrderStatus } from '../../types/admin';
import { Flame, Search, ChevronRight, Clock, MapPin, Phone, User, CheckCircle2, CookingPot, Truck, Filter } from 'lucide-react';

interface KitchenOrdersViewProps {
  orders: AdminOrder[];
  onAdvanceStatus: (orderId: string) => void;
}

export const KitchenOrdersView: React.FC<KitchenOrdersViewProps> = ({ orders, onAdvanceStatus }) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const filteredOrders = orders.filter(ord => {
    if (filterStatus !== 'ALL' && ord.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return ord.orderNumber.toLowerCase().includes(q) ||
             ord.customerName.toLowerCase().includes(q) ||
             ord.customerPhone.includes(q);
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-extrabold text-xs border border-blue-500/40">CONFIRMED</span>;
      case 'KITCHEN_PREPARING':
        return <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-extrabold text-xs border border-amber-500/40 flex items-center gap-1.5"><CookingPot className="w-4 h-4" /> KITCHEN PREPARING</span>;
      case 'READY_FOR_PICKUP':
        return <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-extrabold text-xs border border-indigo-500/40">READY FOR PICKUP</span>;
      case 'OUT_FOR_DELIVERY':
        return <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 font-extrabold text-xs border border-purple-500/40 flex items-center gap-1.5"><Truck className="w-4 h-4" /> OUT FOR DELIVERY</span>;
      case 'DELIVERED':
        return <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs border border-emerald-500/40">DELIVERED</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-slate-500/20 text-slate-400 font-extrabold text-xs">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Status Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1E293B] p-6 rounded-2xl border border-[#334155]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-500" />
            <span>Kitchen Display System (KDS)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Real-time order prep queue for kitchen staff and dispatchers.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order #, customer..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['ALL', 'CONFIRMED', 'KITCHEN_PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterStatus === status
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-[#1E293B] text-slate-400 border border-[#334155] hover:text-white'
            }`}
          >
            {status.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Grid of Order Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((ord) => (
          <div 
            key={ord.id}
            className="bg-[#1E293B] rounded-2xl border border-[#334155] p-5 space-y-4 shadow-lg flex flex-col justify-between hover:border-indigo-500/50 transition-all"
          >
            {/* Card Top */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#334155] pb-3">
                <div>
                  <span className="text-lg font-black text-indigo-400">{ord.orderNumber}</span>
                  <span className="block text-[10px] text-slate-400">{ord.createdAt}</span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] text-slate-300 text-xs font-black border border-[#334155]">
                  {ord.orderType} {ord.tableCode ? `(${ord.tableCode})` : ''}
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between">
                {getStatusBadge(ord.status)}
                <span className="text-sm font-black text-white">₹{ord.totalAmount}</span>
              </div>

              {/* Customer Details */}
              <div className="bg-[#0F172A] p-3 rounded-xl border border-[#334155]/60 text-xs space-y-1">
                <div className="flex items-center gap-2 text-slate-200 font-bold">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{ord.customerName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{ord.customerPhone}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase text-slate-400">Order Items ({ord.itemCount}):</label>
                <p className="text-xs text-slate-300 bg-[#0F172A]/40 p-3 rounded-xl border border-[#334155]/40 leading-relaxed">
                  {ord.itemsSummary}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 border-t border-[#334155] flex items-center justify-between">
              <button 
                onClick={() => setSelectedOrder(ord)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold underline"
              >
                View Ticket
              </button>

              {ord.status !== 'DELIVERED' ? (
                <button
                  onClick={() => onAdvanceStatus(ord.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:brightness-110 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Advance Status</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Complete
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="p-12 text-center bg-[#1E293B] rounded-2xl border border-[#334155] space-y-2">
          <p className="text-sm font-bold text-slate-300">No kitchen orders matching filter '{filterStatus}'</p>
          <p className="text-xs text-slate-500">Orders placed by customers will automatically stream into this KDS board.</p>
        </div>
      )}

      {/* Ticket Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 w-full max-w-md space-y-6 text-white shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#334155] pb-4">
              <div>
                <h3 className="text-xl font-black text-indigo-400">Kitchen Ticket {selectedOrder.orderNumber}</h3>
                <p className="text-xs text-slate-400">Order Placed: {selectedOrder.createdAt}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white font-bold text-sm px-2.5 py-1 rounded-lg bg-[#0F172A]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#0F172A] p-4 rounded-2xl space-y-2 border border-[#334155]">
                <p className="font-bold text-white">Customer: {selectedOrder.customerName}</p>
                <p className="text-slate-400">Phone: {selectedOrder.customerPhone}</p>
                <p className="text-slate-400">Fulfillment: <span className="text-indigo-400 font-bold">{selectedOrder.orderType}</span></p>
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase text-[10px]">Items Breakdown:</label>
                <div className="bg-[#0F172A] p-4 rounded-2xl mt-1 space-y-2 text-slate-200 border border-[#334155]">
                  <p>{selectedOrder.itemsSummary}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#334155] flex justify-between items-center">
              <span className="text-sm font-black">Total: ₹{selectedOrder.totalAmount}</span>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
