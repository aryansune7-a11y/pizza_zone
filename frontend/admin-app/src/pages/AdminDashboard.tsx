import React, { useState } from 'react';
import { AdminHeader } from '../components/AdminHeader';
import { AdminSidebar } from '../components/AdminSidebar';
import { StatCard } from '../components/StatCard';
import { KitchenOrdersView } from '../components/views/KitchenOrdersView';
import { MenuManagementView } from '../components/views/MenuManagementView';
import { CouponsView } from '../components/views/CouponsView';
import { StaffRbacView } from '../components/views/StaffRbacView';
import { AuditLogsView } from '../components/views/AuditLogsView';
import { StoreSettingsView } from '../components/views/StoreSettingsView';
import { AdminOrder, OrderStatus } from '../types/admin';
import { 
  DollarSign, 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  Search, 
  ChevronRight,
  Flame
} from 'lucide-react';

const MOCK_ORDERS: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'PZ-8941',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98765 11111',
    orderType: 'DELIVERY',
    status: 'KITCHEN_PREPARING',
    itemsSummary: '1x Truffle Mushroom Supreme (Medium), 1x Cheesy Garlic Sticks',
    itemCount: 2,
    totalAmount: 887,
    createdAt: '10 mins ago'
  },
  {
    id: 'ord-102',
    orderNumber: 'PZ-8942',
    customerName: 'Ananya Verma',
    customerPhone: '+91 98765 22222',
    orderType: 'DINE_IN',
    tableCode: 'TBL-04',
    status: 'CONFIRMED',
    itemsSummary: '2x Fiery Pepperoni Overload (Monster)',
    itemCount: 2,
    totalAmount: 1698,
    createdAt: '4 mins ago'
  },
  {
    id: 'ord-103',
    orderNumber: 'PZ-8943',
    customerName: 'Rohan Gupta',
    customerPhone: '+91 98765 33333',
    orderType: 'PICKUP',
    status: 'READY_FOR_PICKUP',
    itemsSummary: '1x Paneer Tikka Passion, 1x Cold Brew Sparkler',
    itemCount: 2,
    totalAmount: 508,
    createdAt: '22 mins ago'
  },
  {
    id: 'ord-104',
    orderNumber: 'PZ-8944',
    customerName: 'Priya Nair',
    customerPhone: '+91 98765 44444',
    orderType: 'DELIVERY',
    status: 'OUT_FOR_DELIVERY',
    itemsSummary: '1x Truffle Mushroom Supreme (Regular)',
    itemCount: 1,
    totalAmount: 499,
    createdAt: '35 mins ago'
  }
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [storeStatus, setStoreStatus] = useState<'OPEN' | 'PAUSED' | 'EMERGENCY_CLOSED'>('OPEN');
  const [orders, setOrders] = useState<AdminOrder[]>(MOCK_ORDERS);

  const toggleStoreStatus = () => {
    setStoreStatus(prev => prev === 'OPEN' ? 'PAUSED' : 'OPEN');
  };

  const advanceOrderStatus = (orderId: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id !== orderId) return ord;
      let nextStatus: OrderStatus = ord.status;
      if (ord.status === 'CREATED') nextStatus = 'CONFIRMED';
      else if (ord.status === 'CONFIRMED') nextStatus = 'KITCHEN_PREPARING';
      else if (ord.status === 'KITCHEN_PREPARING') nextStatus = ord.orderType === 'PICKUP' ? 'READY_FOR_PICKUP' : 'OUT_FOR_DELIVERY';
      else if (ord.status === 'READY_FOR_PICKUP' || ord.status === 'OUT_FOR_DELIVERY') nextStatus = 'DELIVERED';
      
      return { ...ord, status: nextStatus };
    }));
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Header Title Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Main Company Operations Hub</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time order stream, revenue analytics, and store state override control.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-[#1E293B] px-3.5 py-1.5 rounded-xl border border-[#334155] text-xs font-bold text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Rest API Server: Port 8080 Active</span>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Today Revenue" 
          value="₹42,850" 
          changeText="+14.2%" 
          isPositive={true} 
          icon={DollarSign}
          iconColorClass="text-emerald-400 bg-emerald-500/10"
        />
        <StatCard 
          title="Active Kitchen Stream" 
          value={`${orders.filter(o => o.status !== 'DELIVERED').length} Orders`} 
          changeText="+3 orders" 
          isPositive={true} 
          icon={ShoppingBag}
          iconColorClass="text-indigo-400 bg-indigo-500/10"
        />
        <StatCard 
          title="Completed Orders" 
          value="148 Orders" 
          changeText="+8.5%" 
          isPositive={true} 
          icon={CheckCircle}
          iconColorClass="text-purple-400 bg-purple-500/10"
        />
        <StatCard 
          title="Avg Kitchen Prep Time" 
          value="16.4 mins" 
          changeText="-1.2 mins" 
          isPositive={true} 
          icon={Clock}
          iconColorClass="text-amber-400 bg-amber-500/10"
        />
      </div>

      {/* Embedded Live Kitchen Stream */}
      <KitchenOrdersView orders={orders} onAdvanceStatus={advanceOrderStatus} />
    </div>
  );

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'kitchen':
        return <KitchenOrdersView orders={orders} onAdvanceStatus={advanceOrderStatus} />;
      case 'menu':
        return <MenuManagementView />;
      case 'coupons':
        return <CouponsView />;
      case 'staff':
        return <StaffRbacView />;
      case 'audit':
        return <AuditLogsView />;
      case 'settings':
        return <StoreSettingsView />;
      case 'dashboard':
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0F172A]">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader storeStatus={storeStatus} onToggleStoreStatus={toggleStoreStatus} />

        <main className="p-8 overflow-y-auto">
          {renderActiveTabContent()}
        </main>
      </div>
    </div>
  );
};
