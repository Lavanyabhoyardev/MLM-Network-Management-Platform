import React from 'react';
import { CalendarCheck2, AlertCircle, HelpCircle, Layers, Users, Clock } from 'lucide-react';
import { MONTHLY_BONUS_CONFIG } from '../../mockData/bonuses';
import { BannerNotice } from '../../components/BannerNotice';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';

export const AdminMonthlyBonus: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Monthly Performance Pool</h2>
        <p className="text-xs text-slate-500 mt-1">
          Leadership executive bonus tier monitoring.
        </p>
      </div>

      {/* Prominent Rule Notice */}
      <BannerNotice
        type="warning"
        title="Calculation Rule Pending Client Approval"
        message={MONTHLY_BONUS_CONFIG.calculationDisclaimer}
      />

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          label="Monthly Target"
          value={MONTHLY_BONUS_CONFIG.monthlyTarget}
          subtext="Benchmark threshold"
        />
        <StatCard
          label="Current Panel Turnover"
          value={MONTHLY_BONUS_CONFIG.currentPanelIncome}
          subtext="June 2024 cumulative volume"
        />
        <StatCard
          label="Threshold Achievers"
          value={`${MONTHLY_BONUS_CONFIG.qualifiedMembersCount} Members`}
          subtext="Volume threshold satisfied"
        />
        <StatCard
          label="Pool Formula Status"
          value="Pending TBD"
          subtext="Awaiting client definition"
          badge="Configurable"
          className="border-amber-200 bg-amber-50/20"
        />
      </div>

      {/* Monthly Cycle Status Card */}
      <div className="card-clean p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Current Accounting Month: June 2024</h3>
            <p className="text-xs text-slate-500">Period: 01 Jun 2024 - 30 Jun 2024 (12 days remaining)</p>
          </div>
          <StatusBadge status="Calculation rule pending client approval" />
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
            <span>Overall Panel Target Progress</span>
            <span>{MONTHLY_BONUS_CONFIG.progressPercentage}% of projected milestone</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${MONTHLY_BONUS_CONFIG.progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Open Decision Matrix Points Awaiting Client Confirmation:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600">
            <li>What fixed percentage of gross monthly turnover constitutes the leadership bonus pool? (e.g., 2%, 3%, or 5%?)</li>
            <li>Should the pool be shared equally among qualifiers, or weighted proportionally based on direct frontline branch volume?</li>
            <li>Is there a minimum direct active referral requirement (e.g. 5 active direct branches) in addition to the ₹30,000 panel threshold?</li>
          </ul>
        </div>
      </div>

      {/* Monthly Records History */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Monthly Bonus Cycle Ledger</h3>
          <p className="text-xs text-slate-500">Monthly periods tracked in system archive</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Month Cycle</th>
                <th className="py-3 px-4 font-medium">Target Benchmark</th>
                <th className="py-3 px-4 font-medium">Panel Gross Turnover</th>
                <th className="py-3 px-4 font-medium">Achievers Count</th>
                <th className="py-3 px-4 font-medium">Pool Status</th>
                <th className="py-3 px-4 font-medium">Accounting Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MONTHLY_BONUS_CONFIG.records.map((r, i) => (
                <tr key={i} className="table-row-hover">
                  <td className="py-3 px-4 font-semibold text-slate-900">{r.month}</td>
                  <td className="py-3 px-4 font-mono">{r.target}</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-900">{r.panelIncome}</td>
                  <td className="py-3 px-4 font-medium text-slate-700">{r.qualifiedMembersCount} Leaders</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={r.bonusPoolStatus} />
                  </td>
                  <td className="py-3 px-4 text-slate-500">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
