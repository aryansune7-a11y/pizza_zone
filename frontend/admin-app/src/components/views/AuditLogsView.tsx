import React, { useState } from 'react';
import { History, Shield, Search, FileText } from 'lucide-react';

interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  ipAddress: string;
  timestamp: string;
  details: string;
}

const INITIAL_LOGS: AuditLogEntry[] = [
  {
    id: 'log-901',
    actor: 'admin@pizzazone.in',
    action: 'STORE_STATUS_TOGGLE',
    entityType: 'RESTAURANT',
    entityId: '11111111-1111-1111-1111-111111111111',
    ipAddress: '192.168.1.45',
    timestamp: '2026-09-26 23:15:20 UTC',
    details: 'Changed store ordering state to OPEN'
  },
  {
    id: 'log-902',
    actor: 'admin@pizzazone.in',
    action: 'COUPON_CREATE',
    entityType: 'COUPON',
    entityId: 'PIZZA50',
    ipAddress: '192.168.1.45',
    timestamp: '2026-09-26 22:40:12 UTC',
    details: 'Created promo code PIZZA50 (50% OFF up to ₹150)'
  },
  {
    id: 'log-903',
    actor: 'kitchen.mgr@pizzazone.in',
    action: 'ORDER_STATUS_UPDATE',
    entityType: 'ORDER',
    entityId: 'PZ-8941',
    ipAddress: '192.168.1.88',
    timestamp: '2026-09-26 22:10:05 UTC',
    details: 'Updated status from CONFIRMED to KITCHEN_PREPARING'
  }
];

export const AuditLogsView: React.FC = () => {
  const [logs] = useState<AuditLogEntry[]>(INITIAL_LOGS);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1E293B] p-6 rounded-2xl border border-[#334155]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <History className="w-6 h-6 text-purple-400" />
            <span>Enterprise Security Audit Logs</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Append-only audit trail logging all administrative actions, store status overrides, and menu mutations.</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#1E293B] rounded-2xl border border-[#334155] overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0F172A] text-slate-400 uppercase font-extrabold border-b border-[#334155]">
            <tr>
              <th className="py-4 px-6">Timestamp</th>
              <th className="py-4 px-6">Actor</th>
              <th className="py-4 px-6">Action</th>
              <th className="py-4 px-6">Target Entity</th>
              <th className="py-4 px-6">IP Address</th>
              <th className="py-4 px-6">Change Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#334155] text-slate-200 font-mono">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-[#334155]/20 transition-colors">
                <td className="py-4 px-6 text-slate-400 whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="py-4 px-6 font-bold text-indigo-400">
                  {log.actor}
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-black text-[10px] border border-purple-500/30">
                    {log.action}
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-300">
                  {log.entityType}: <span className="text-white font-bold">{log.entityId}</span>
                </td>
                <td className="py-4 px-6 text-slate-400">
                  {log.ipAddress}
                </td>
                <td className="py-4 px-6 text-slate-300 font-sans">
                  {log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
