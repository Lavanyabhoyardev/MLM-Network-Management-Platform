import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowUpRight, ArrowDownLeft, Filter, Download, PlusCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';

export const MemberWallet: React.FC = () => {
  const { currentMember, ledgerEntries } = useApp();
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState('All');

  const myEntries = ledgerEntries.filter(
    e => e.memberId === currentMember.memberId
  );

  const filteredEntries = myEntries.filter(entry => {
    if (filterType === 'All') return true;
    if (filterType === 'Credit') return entry.credit > 0;
    if (filterType === 'Debit') return entry.debit > 0;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Wallet Balance & Financial Journal</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time accounting ledger of all credited overrides, bonuses, and processed withdrawals.
          </p>
        </div>

        <button
          onClick={() => navigate('/member/withdraw')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>Request Payout</span>
        </button>
      </div>

      {/* Top 3 Wallet KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Available Balance"
          value={currentMember.formattedWallet}
          subtext="Withdrawable immediately"
          icon={Wallet}
          className="border-blue-200 bg-blue-50/20"
        />
        <StatCard
          label="Total Credits"
          value="₹1,85,400"
          subtext="Cumulative commissions & bonuses"
          icon={ArrowDownLeft}
          className="border-emerald-200 bg-emerald-50/20"
        />
        <StatCard
          label="Total Withdrawals"
          value="₹1,42,550"
          subtext="Disbursed to bank account"
          icon={ArrowUpRight}
        />
      </div>

      {/* Ledger Table & Filters */}
      <div className="card-clean overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Personal Ledger History</h3>
            <p className="text-xs text-slate-500">Every credit and debit posted to your distributor wallet</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filter:</span>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded border border-slate-200 bg-white focus:outline-none"
            >
              <option value="All">All Transactions</option>
              <option value="Credit">Credits Only (+)</option>
              <option value="Debit">Debits Only (-)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Type</th>
                <th className="py-3 px-4 font-medium">Description / Reference</th>
                <th className="py-3 px-4 font-medium text-right">Credit (+)</th>
                <th className="py-3 px-4 font-medium text-right">Debit (-)</th>
                <th className="py-3 px-4 font-medium text-right">Balance</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEntries.map(entry => (
                <tr key={entry.id} className="table-row-hover">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{entry.date}</td>
                  <td className="py-3 px-4 font-medium text-slate-900">{entry.transactionType}</td>
                  <td className="py-3 px-4 text-slate-600 max-w-sm">
                    <span className="block truncate" title={entry.sourceReference}>
                      {entry.sourceReference}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{entry.reference}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">
                    {entry.credit > 0 ? `+₹${entry.credit.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">
                    {entry.debit > 0 ? `-₹${entry.debit.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    ₹{entry.balanceAfter.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={entry.status} />
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
