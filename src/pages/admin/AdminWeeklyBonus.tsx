import React, { useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WEEKLY_BONUS_HISTORIES } from '../../mockData/bonuses';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { BannerNotice } from '../../components/BannerNotice';

export const AdminWeeklyBonus: React.FC = () => {
  const { weeklyMetrics, qualifiedWeeklyMembers, closeWeek } = useApp();
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleExecuteClose = () => {
    closeWeek();
    setShowConfirmModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Weekly Bonus Pool Engine</h2>
          <p className="text-xs text-slate-500 mt-1">
            5% panel turnover incentive distribution for active distributors reaching the ₹20,000+ benchmark.
          </p>
        </div>

        {/* Action Button: Close Week */}
        {!weeklyMetrics.isWeekClosed ? (
          <button
            onClick={() => setShowConfirmModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-sm transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Close Current Week & Disburse</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Week 25 Closed & Settled</span>
          </div>
        )}
      </div>

      <BannerNotice
        type="info"
        title="Weekly Pool Calculation Rule"
        message={weeklyMetrics.workingRuleNote}
      />

      {/* Top 5 KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard
          label="Weekly Target"
          value={weeklyMetrics.formattedWeeklyTarget}
          subtext="Per distributor threshold"
        />
        <StatCard
          label="Panel Weekly Income"
          value={weeklyMetrics.formattedPanelIncome}
          subtext="Gross company weekly volume"
        />
        <StatCard
          label="Bonus Rate"
          value={weeklyMetrics.bonusRate}
          subtext="Fixed pool share allocation"
        />
        <StatCard
          label="Bonus Pool"
          value={weeklyMetrics.formattedBonusPool}
          subtext="Available to be shared"
          className="border-blue-200 bg-blue-50/20"
        />
        <StatCard
          label="Qualified Members"
          value={weeklyMetrics.qualifiedCount}
          subtext="₹1,250 each calculated"
          className="border-emerald-200 bg-emerald-50/20"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('current')}
          className={`py-3 px-5 text-xs font-medium border-b-2 transition-all ${
            activeTab === 'current'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Current Week Standing (Week 25)
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-3 px-5 text-xs font-medium border-b-2 transition-all ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Previous Closed Weeks History
        </button>
      </div>

      {activeTab === 'current' ? (
        <div className="card-clean overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Distributor Qualification Roster</h3>
              <p className="text-xs text-slate-500">
                Evaluation of weekly panel income against the ₹20,000 threshold
              </p>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Live Progress
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-medium">Member</th>
                  <th className="py-3 px-4 font-medium">Package Tier</th>
                  <th className="py-3 px-4 font-medium">Current Panel Income</th>
                  <th className="py-3 px-4 font-medium">Target Required</th>
                  <th className="py-3 px-4 font-medium">Qualification Status</th>
                  <th className="py-3 px-4 font-medium">Calculated Bonus Share</th>
                  <th className="py-3 px-4 font-medium">Disbursement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {qualifiedWeeklyMembers.map(member => (
                  <tr key={member.id} className="table-row-hover">
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{member.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{member.memberId}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                        {member.packageName}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {member.formattedPanelIncome}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">{member.formattedTarget}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={member.qualification} />
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">
                      {member.formattedBonusShare}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={member.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* History Table */
        <div className="card-clean overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">Historical Closed Weeks Ledger</h3>
            <p className="text-xs text-slate-500">Audit trail of previously executed weekly bonus cycles</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-medium">Week Cycle</th>
                  <th className="py-3 px-4 font-medium">Accounting Period</th>
                  <th className="py-3 px-4 font-medium">Benchmark Target</th>
                  <th className="py-3 px-4 font-medium">Panel Turnover</th>
                  <th className="py-3 px-4 font-medium">5% Pool Total</th>
                  <th className="py-3 px-4 font-medium">Qualified Leaders</th>
                  <th className="py-3 px-4 font-medium">Disbursed per Member</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {WEEKLY_BONUS_HISTORIES.map((h, i) => (
                  <tr key={i} className="table-row-hover">
                    <td className="py-3 px-4 font-semibold text-slate-900">{h.weekNumber}</td>
                    <td className="py-3 px-4 text-slate-500">{h.period}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">₹{h.targetAmount.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-900">₹{h.panelIncome.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">₹{h.poolAmount.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{h.qualifiedCount} Members</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">₹{h.bonusPerMember.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={h.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Close Week */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-6 max-w-md w-full space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-slate-900">Confirm Weekly Bonus Closure</h4>
                <p className="text-xs text-slate-500">Accounting Cycle Settlement</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              This will lock the current cycle (Week 25), finalize the ₹2,500 bonus pool, and disburse ₹1,250 into the wallet ledgers of the 2 qualified distributors: <strong>Rahul Sharma</strong> and <strong>Sunil Verma</strong>.
            </p>

            <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Pool:</span>
                <span className="font-semibold text-slate-900">₹2,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recipients:</span>
                <span className="font-semibold text-slate-900">2 Qualified Members</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Each:</span>
                <span className="font-bold text-emerald-600">₹1,250.00</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-3 py-2 rounded border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteClose}
                className="px-4 py-2 rounded bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Confirm & Disburse Week
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
