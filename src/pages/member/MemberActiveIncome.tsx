import React from 'react';
import { TrendingUp, Users, Calendar, Download } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { COMMISSION_TRANSACTIONS } from '../../mockData/commissions';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';

export const MemberActiveIncome: React.FC = () => {
  const activeTransactions = COMMISSION_TRANSACTIONS.filter(
    tx => tx.memberId === 'MEM-10482' && tx.commissionType === 'Direct Referral'
  );

  const activeMonthlyData = [
    { month: 'Jan', amount: 3000 },
    { month: 'Feb', amount: 4500 },
    { month: 'Mar', amount: 6000 },
    { month: 'Apr', amount: 5500 },
    { month: 'May', amount: 7250 },
    { month: 'Jun', amount: 8250 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Direct Income</h2>
        <p className="text-xs text-slate-500 mt-1">
          Direct referral commissions earned from Level 1 frontline partners enrolled using your referral link.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Current Active Income"
          value="₹24,500"
          subtext="Cumulative direct referral payouts"
          icon={TrendingUp}
        />
        <StatCard
          label="This Month (June)"
          value="₹8,250"
          subtext="+14% higher than May"
          trend={{ value: '14%', isPositive: true }}
          icon={Calendar}
          className="border-emerald-200 bg-emerald-50/20"
        />
        <StatCard
          label="Direct Sponsoring Rate"
          value="50.00%"
          subtext="Standard working model"
          badge="Illustrative Rate"
        />
      </div>

      {/* Monthly Chart */}
      <div className="card-clean p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Direct Referral Velocity (Past 6 Months)</h3>
          <p className="text-xs text-slate-500">Gross active income generated month over month</p>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeMonthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <Tooltip
                formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, 'Active Income']}
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Table */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Direct Commission History</h3>
            <p className="text-xs text-slate-500">Itemized sponsor enrollments credited to your wallet</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{activeTransactions.length} Credits</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Source Member</th>
                <th className="py-3 px-4 font-medium">Package Enrolled</th>
                <th className="py-3 px-4 font-medium">Level</th>
                <th className="py-3 px-4 font-medium text-right">Amount</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
                <th className="py-3 px-4 font-medium text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTransactions.map(tx => (
                <tr key={tx.id} className="table-row-hover">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{tx.date}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{tx.sourceMemberName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{tx.sourceMemberId}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700">
                      {tx.packagePurchased}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">Level {tx.level}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">
                    +{tx.formattedAmount}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400">
                    {tx.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
