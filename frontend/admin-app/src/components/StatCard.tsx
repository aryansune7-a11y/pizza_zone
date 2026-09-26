import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  changeText?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconColorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  changeText,
  isPositive = true,
  icon: Icon,
  iconColorClass = 'text-indigo-400 bg-indigo-500/10'
}) => {
  return (
    <div className="p-6 rounded-2xl bg-[#1E293B] border border-[#334155] shadow-lg flex items-center justify-between">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        <div className="text-2xl font-black text-white tracking-tight">{value}</div>

        {changeText && (
          <div className="flex items-center gap-1.5 text-xs font-bold">
            {isPositive ? (
              <span className="flex items-center text-emerald-400 gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                {changeText}
              </span>
            ) : (
              <span className="flex items-center text-rose-400 gap-0.5">
                <TrendingDown className="w-3.5 h-3.5" />
                {changeText}
              </span>
            )}
            <span className="text-slate-500 font-normal">vs yesterday</span>
          </div>
        )}
      </div>

      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconColorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
