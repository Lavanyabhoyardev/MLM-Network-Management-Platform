import React from 'react';
import { CalendarDays, CheckCircle2, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WEEKLY_BONUS_HISTORIES } from '../../mockData/bonuses';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { BannerNotice } from '../../components/BannerNotice';

export const MemberWeeklyBonus: React.FC = () => {
  const { weeklyMetrics } = useApp();

  const weeklyTarget = 20000;
  const currentPanelIncome = 16800;
  const remaining = weeklyTarget - currentPanelIncome;
  const progressPercent = Math.round((currentPanelIncome / weeklyTarget) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Weekly Bonus Qualification</h2>
        <p className="text-xs text-slate-500 mt-1">
          Track your branch volume toward qualifying for the weekly 5% company panel pool.
        </p>
      </div>

      <BannerNotice
        type="info"
        title="Qualification Benchmark"
        message="Achieve ₹20,000+ in panel branch turnover during the current 7-day period to qualify for an equal share of the 5% weekly company bonus pool."
      />

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Weekly Target"
          value="₹20,000"
          subtext="Benchmark threshold"
          icon={CalendarDays}
        />
        <StatCard
          label="Current Panel Income"
          value="₹16,800"
          subtext={`₹${remaining.toLocaleString('en-IN')} remaining to goal`}
          icon={TrendingUp}
        />
        <StatCard
          label="Current Progress"
          value={`${progressPercent}%`}
          subtext="84% of benchmark achieved"
          className="border-amber-200 bg-amber-50/20"
        />
        <StatCard
          label="Qualification"
          value="In Progress"
          subtext="Cycle ends Sunday 23:59"
          badge="Active Week 25"
        />
      </div>

      {/* Progress Bar Card */}
      <div className="card-clean p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Current Week 25 Standing</h3>
            <p className="text-xs text-slate-500">Period: 16 Jun 2024 - 22 Jun 2024</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
            Not Yet Qualified (₹3,200 remaining)
          </span>
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-2 font-medium">
            <span>Progress: ₹16,800 achieved</span>
            <span className="font-bold text-slate-900">Goal: ₹20,000</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Current Bonus Pool Estimate</span>
            <span className="text-base font-bold text-slate-900">₹2,500 Pool Total</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">5% of total company weekly turnover</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Potential Qualifier Share</span>
            <span className="text-base font-bold text-blue-600">Pending Qualification</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Estimated ₹1,250 payout upon meeting threshold</span>
          </div>
        </div>
      </div>

      {/* Historical Performance Table */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Previous Weekly Cycles Performance</h3>
            <p className="text-xs text-slate-500">Historical qualifications and disbursed bonus pool payouts</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Past Cycles</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Cycle</th>
                <th className="py-3 px-4 font-medium">Period</th>
                <th className="py-3 px-4 font-medium">Target</th>
                <th className="py-3 px-4 font-medium">Your Panel Volume</th>
                <th className="py-3 px-4 font-medium">Result</th>
                <th className="py-3 px-4 font-medium text-right">Disbursed Bonus</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="table-row-hover">
                <td className="py-3 px-4 font-semibold text-slate-900">Week 24</td>
                <td className="py-3 px-4 text-slate-500">09 Jun - 15 Jun 2024</td>
                <td className="py-3 px-4 font-mono">₹20,000</td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">₹24,500</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">Qualified</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">+₹1,250</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge status="Settled" />
                </td>
              </tr>
              <tr className="table-row-hover">
                <td className="py-3 px-4 font-semibold text-slate-900">Week 23</td>
                <td className="py-3 px-4 text-slate-500">02 Jun - 08 Jun 2024</td>
                <td className="py-3 px-4 font-mono">₹20,000</td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">₹25,500</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">Qualified</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">+₹1,300</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge status="Settled" />
                </td>
              </tr>
              <tr className="table-row-hover">
                <td className="py-3 px-4 font-semibold text-slate-900">Week 22</td>
                <td className="py-3 px-4 text-slate-500">26 May - 01 Jun 2024</td>
                <td className="py-3 px-4 font-mono">₹20,000</td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">₹18,400</td>
                <td className="py-3 px-4 text-slate-500">Not Qualified</td>
                <td className="py-3 px-4 text-right font-mono text-slate-400">₹0</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge status="Closed" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
