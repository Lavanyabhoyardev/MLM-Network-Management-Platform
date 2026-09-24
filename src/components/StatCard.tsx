import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: LucideIcon;
  badge?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  trend,
  icon: Icon,
  badge,
  className = ''
}) => {
  return (
    <div className={`card-clean p-4 sm:p-5 flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between text-slate-500 mb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
        {Icon && (
          <div className="p-1.5 rounded bg-slate-100/80 text-slate-600">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 font-sans">
          {value}
        </div>

        {(subtext || trend || badge) && (
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
            {trend && (
              <span
                className={`font-medium ${
                  trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
            )}
            {subtext && <span className="text-slate-500">{subtext}</span>}
            {badge && (
              <span className="ml-auto inline-block px-1.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                {badge}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
