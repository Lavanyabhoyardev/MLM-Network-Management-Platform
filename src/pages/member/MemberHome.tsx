import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  TrendingUp,
  Users,
  Copy,
  Check,
  Package,
  ArrowUpRight,
  GitFork,
  ArrowRight,
  Bell,
  Clock,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';

export const MemberHome: React.FC = () => {
  const { currentMember, notifications, ledgerEntries } = useApp();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(false);

  const earningsHistoryData = [
    { period: 'Jan', active: 8500, passive: 3200, bonuses: 2000 },
    { period: 'Feb', active: 12000, passive: 6400, bonuses: 3500 },
    { period: 'Mar', active: 16500, passive: 9800, bonuses: 5000 },
    { period: 'Apr', active: 19800, passive: 12400, bonuses: 6250 },
    { period: 'May', active: 22400, passive: 15600, bonuses: 7500 },
    { period: 'Jun', active: 24500, passive: 18200, bonuses: 8750 }
  ];

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(currentMember.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const weeklyCurrent = 16800;
  const weeklyTarget = 20000;
  const weeklyProgress = Math.round((weeklyCurrent / weeklyTarget) * 100);

  const monthlyCurrent = 24500;
  const monthlyTarget = 30000;
  const monthlyProgress = Math.round((monthlyCurrent / monthlyTarget) * 100);

  const memberLedger = ledgerEntries.filter(e => e.memberId === currentMember.memberId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, {currentMember.name.split(' ')[0]}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Here's your network and earnings overview.
          </p>
        </div>

        {/* Copyable Referral Code Card */}
        <div className="inline-flex items-center gap-3 p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
          <div className="text-left">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
              Your Referral Code
            </span>
            <span className="font-mono text-sm font-bold text-blue-600">
              {currentMember.referralCode}
            </span>
          </div>

          <button
            onClick={handleCopyReferral}
            className={`p-2 rounded-md transition-colors text-xs font-medium flex items-center gap-1.5 ${
              copiedCode
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Copy referral invitation link"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Summary KPI Cards (6 items from specification) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          label="Current Package"
          value={currentMember.packageName}
          subtext="₹11,000 • 5 Earning Levels"
          badge="Active Tier"
          icon={Package}
        />
        <StatCard
          label="Wallet Balance"
          value={currentMember.formattedWallet}
          subtext="Available for withdrawal"
          icon={Wallet}
          className="border-blue-200 bg-blue-50/10"
        />
        <StatCard
          label="Total Earnings"
          value={currentMember.formattedEarnings}
          subtext="Lifetime earnings"
          icon={TrendingUp}
        />
        <StatCard
          label="Direct Members"
          value={currentMember.directReferrals}
          subtext="Uncapped frontline"
          icon={Users}
        />
        <StatCard
          label="Network Members"
          value={currentMember.networkSize}
          subtext="5 levels depth"
          icon={GitFork}
        />
      </div>

      {/* Earnings Overview Chart */}
      <div className="card-clean p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Earnings Performance Trend</h3>
            <p className="text-xs text-slate-500">
              Active Income (L1 Direct), Passive Income (Overrides L2-L5), and Bonus Incentives
            </p>
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 self-start sm:self-auto">
            Jan - Jun 2024
          </span>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={earningsHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <Tooltip
                formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, 'Income']}
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="active" name="Active Income" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="passive" name="Passive Income" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="bonuses" name="Bonuses & Pools" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress Section: Weekly & Monthly Targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weekly Progress */}
        <div className="card-clean p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Weekly Bonus Benchmark
            </span>
            <span className="text-xs font-mono font-bold text-blue-600">
              Target: ₹20,000
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900">₹16,800</span>
            <span className="text-xs font-semibold text-amber-600">
              ₹3,200 remaining
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${weeklyProgress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
            <span>84% of required turnover met</span>
            <button
              onClick={() => navigate('/member/weekly-bonus')}
              className="text-blue-600 hover:underline flex items-center gap-0.5"
            >
              Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="card-clean p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Monthly Leadership Benchmark
            </span>
            <span className="text-xs font-mono font-bold text-blue-600">
              Target: ₹30,000
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900">₹24,500</span>
            <span className="text-xs font-semibold text-amber-600">
              ₹5,500 remaining
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${monthlyProgress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
            <span>81.6% of monthly milestone met</span>
            <button
              onClick={() => navigate('/member/monthly-bonus')}
              className="text-blue-600 hover:underline flex items-center gap-0.5"
            >
              Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Recent Transactions & Network Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="card-clean p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Recent Wallet Transactions</h3>
            <button
              onClick={() => navigate('/member/wallet')}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              Wallet Ledger <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {memberLedger.slice(0, 4).map(tx => (
              <div key={tx.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 block">{tx.transactionType}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{tx.sourceReference}</span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-mono font-bold block ${
                      tx.credit > 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {tx.credit > 0 ? `+₹${tx.credit.toLocaleString('en-IN')}` : `-₹${tx.debit.toLocaleString('en-IN')}`}
                  </span>
                  <span className="text-[10px] text-slate-400">{tx.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Network Activity */}
        <div className="card-clean p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Recent Downline Activity</h3>
            <button
              onClick={() => navigate('/member/network')}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              My Network <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between">
              <div>
                <span className="font-semibold text-slate-900 block">Priya Patel (L1 Direct)</span>
                <span className="text-[11px] text-slate-500">Sponsored Sneha Gupta under Standard Package</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">+₹1,250 (L2)</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between">
              <div>
                <span className="font-semibold text-slate-900 block">Ananya Rao (L1 Direct)</span>
                <span className="text-[11px] text-slate-500">Sponsored Neha Joshi under Pro Package</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">+₹4,650 (L2)</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between">
              <div>
                <span className="font-semibold text-slate-900 block">Vikram Malhotra (L1 Direct)</span>
                <span className="text-[11px] text-slate-500">Sponsored Deepak Joshi under Basic Package</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">+₹750 (L2)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
