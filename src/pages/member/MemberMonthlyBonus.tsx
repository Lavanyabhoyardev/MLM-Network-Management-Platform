import React from 'react';
import { CalendarCheck2, AlertCircle, HelpCircle, TrendingUp, Clock } from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { BannerNotice } from '../../components/BannerNotice';

export const MemberMonthlyBonus: React.FC = () => {
  const monthlyTarget = 30000;
  const currentVolume = 24500;
  const remaining = monthlyTarget - currentVolume;
  const progressPercent = Math.round((currentVolume / monthlyTarget) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Monthly Leadership Pool</h2>
        <p className="text-xs text-slate-500 mt-1">
          Monthly cumulative benchmark tracking for top distributor branch leaders.
        </p>
      </div>

      <BannerNotice
        type="warning"
        title="Calculation rule pending client approval"
        message="Exact bonus pool distribution criteria and percentage allocations for the monthly pool are awaiting client confirmation. Threshold benchmark is currently set at ₹30,000."
      />

      {/* Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Monthly Target"
          value="₹30,000"
          subtext="Benchmark threshold"
          icon={CalendarCheck2}
        />
        <StatCard
          label="Current Panel Volume"
          value="₹24,500"
          subtext={`₹${remaining.toLocaleString('en-IN')} remaining`}
          icon={TrendingUp}
        />
        <StatCard
          label="Target Progress"
          value={`${progressPercent}%`}
          subtext="81.6% achieved in June"
          className="border-emerald-200 bg-emerald-50/20"
        />
        <StatCard
          label="Bonus Formula"
          value="Pending TBD"
          subtext="Awaiting client signoff"
          badge="Provisional"
          className="border-amber-200"
        />
      </div>

      {/* Progress Card */}
      <div className="card-clean p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">June 2024 Accounting Period</h3>
            <p className="text-xs text-slate-500">12 Days Remaining in Accounting Cycle</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
            ₹5,500 Remaining to Reach ₹30,000 Milestone
          </span>
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-2 font-medium">
            <span>Current: ₹24,500</span>
            <span className="font-bold text-slate-900">Benchmark: ₹30,000</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800 block mb-1">Accounting Status Notice:</span>
          Upon attaining the ₹30,000 monthly turnover benchmark, your account qualifies for inclusion in the executive leadership distribution list. Final credited amounts will be calculated in accordance with the formula approved by company leadership.
        </div>
      </div>

      {/* Previous Months Archive */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Previous Monthly Cycles Ledger</h3>
          <p className="text-xs text-slate-500">Historical performance across previous calendar months</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Month Period</th>
                <th className="py-3 px-4 font-medium">Monthly Benchmark</th>
                <th className="py-3 px-4 font-medium">Achieved Panel Volume</th>
                <th className="py-3 px-4 font-medium">Threshold Status</th>
                <th className="py-3 px-4 font-medium text-right">Pool Distribution</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="table-row-hover">
                <td className="py-3 px-4 font-semibold text-slate-900">May 2024</td>
                <td className="py-3 px-4 font-mono">₹30,000</td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">₹32,400</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">Threshold Met</td>
                <td className="py-3 px-4 text-right text-slate-500 font-mono">Pending Client Matrix</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge status="Under Review" />
                </td>
              </tr>
              <tr className="table-row-hover">
                <td className="py-3 px-4 font-semibold text-slate-900">April 2024</td>
                <td className="py-3 px-4 font-mono">₹30,000</td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">₹26,800</td>
                <td className="py-3 px-4 text-slate-500">Threshold Unmet</td>
                <td className="py-3 px-4 text-right text-slate-400 font-mono">₹0</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge status="Completed" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
