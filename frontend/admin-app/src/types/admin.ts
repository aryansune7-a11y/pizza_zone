export type OrderStatus = 
  | 'CREATED'
  | 'CONFIRMED'
  | 'KITCHEN_PREPARING'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  orderType: 'DELIVERY' | 'PICKUP' | 'DINE_IN';
  status: OrderStatus;
  itemsSummary: string;
  itemCount: number;
  totalAmount: number;
  createdAt: string;
  tableCode?: string;
}

export interface DashboardMetrics {
  totalRevenueToday: number;
  revenueChangePercent: number;
  activeOrdersCount: number;
  completedOrdersToday: number;
  avgPrepTimeMinutes: number;
  storeStatus: 'OPEN' | 'PAUSED' | 'EMERGENCY_CLOSED';
}
