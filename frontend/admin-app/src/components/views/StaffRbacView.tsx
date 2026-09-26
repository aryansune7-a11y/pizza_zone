import React, { useState } from 'react';
import { Users, ShieldCheck, Lock, UserPlus, CheckCircle2 } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'STAFF';
  status: 'ACTIVE' | 'SUSPENDED';
  lastActive: string;
}

const INITIAL_STAFF: StaffMember[] = [
  { id: 's1', name: 'Vikramaditya Roy', email: 'admin@pizzazone.in', role: 'SUPER_ADMIN', status: 'ACTIVE', lastActive: '2 mins ago' },
  { id: 's2', name: 'Rajesh Kumar', email: 'kitchen.mgr@pizzazone.in', role: 'MANAGER', status: 'ACTIVE', lastActive: '15 mins ago' },
  { id: 's3', name: 'Sunita Sharma', email: 'dispatch@pizzazone.in', role: 'STAFF', status: 'ACTIVE', lastActive: '1 hour ago' }
];

export const StaffRbacView: React.FC = () => {
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1E293B] p-6 rounded-2xl border border-[#334155]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            <span>Staff & Permission Access Control (RBAC)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage staff user accounts, role bindings (SUPER_ADMIN / ADMIN / STAFF / MANAGER), and permission policies.</p>
        </div>

        <button
          onClick={() => alert("Invite Staff Member Modal: Creates new staff account with 2FA secret.")}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite New Staff</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-[#1E293B] rounded-2xl border border-[#334155] overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0F172A] text-slate-400 uppercase font-extrabold border-b border-[#334155]">
            <tr>
              <th className="py-4 px-6">Staff Member</th>
              <th className="py-4 px-6">Role Assignment</th>
              <th className="py-4 px-6">Security Baseline</th>
              <th className="py-4 px-6">Account Status</th>
              <th className="py-4 px-6">Last Active</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#334155] text-slate-200">
            {staffList.map((member) => (
              <tr key={member.id} className="hover:bg-[#334155]/20 transition-colors">
                <td className="py-4 px-6">
                  <span className="font-bold text-white block text-sm">{member.name}</span>
                  <span className="text-[10px] text-slate-400">{member.email}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 font-black text-[10px] border border-indigo-500/30">
                    {member.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> TOTP 2FA Enforced
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px]">
                    {member.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-400">
                  {member.lastActive}
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline">
                    Edit Permissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permission Matrix */}
      <div className="bg-[#1E293B] p-6 rounded-2xl border border-[#334155] space-y-4">
        <h3 className="text-sm font-black text-white uppercase tracking-wider">Role Permission Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#0F172A] p-4 rounded-xl border border-[#334155] space-y-2">
            <span className="font-bold text-indigo-400">KITCHEN MANAGER</span>
            <ul className="text-slate-300 space-y-1 text-[11px]">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ORDER_READ</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ORDER_UPDATE_STATUS</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> STORE_OVERRIDE</li>
            </ul>
          </div>

          <div className="bg-[#0F172A] p-4 rounded-xl border border-[#334155] space-y-2">
            <span className="font-bold text-indigo-400">DISPATCH STAFF</span>
            <ul className="text-slate-300 space-y-1 text-[11px]">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ORDER_READ</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ORDER_UPDATE_STATUS</li>
            </ul>
          </div>

          <div className="bg-[#0F172A] p-4 rounded-xl border border-[#334155] space-y-2">
            <span className="font-bold text-indigo-400">STORE ADMIN</span>
            <ul className="text-slate-300 space-y-1 text-[11px]">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> FULL_SYSTEM_ACCESS</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> COUPON_MANAGE</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> AUDIT_LOG_READ</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
