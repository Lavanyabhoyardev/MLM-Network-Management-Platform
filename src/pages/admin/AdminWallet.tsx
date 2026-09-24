import React, { useState } from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight, Filter, Download, Search, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LedgerEntry } from '../../mockData/walletLedger';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';

export const AdminWallet: React.FC = () => {
  const { ledgerEntries, withdrawals } = useApp();

  const [searchMember, setSearchMember] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter logic
  const filteredLedger = ledgerEntries.filter(entry => {
    const matchesMember =
      entry.memberName.toLowerCase().includes(searchMember.toLowerCase()) ||
      entry.memberId.toLowerCase().includes(searchMember.toLowerCase()) ||
      entry.reference.toLowerCase().includes(searchMember.toLowerCase()) ||
      entry.sourceReference.toLowerCase().includes(searchMember.toLowerCase());

    const matchesType = selectedType === 'All' || entry.transactionType === selectedType;
    const matchesStatus = selectedStatus === 'All' || entry.status === selectedStatus;

    return matchesMember && matchesType && matchesStatus;
  });

  const pendingWithdrawalsSum = withdrawals
    .filter(w => w.status === 'Pending')
    .reduce((sum, w) => sum + w.amount, 0);

  const handleExportLedger = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Date,Reference,Member,Member ID,Transaction Type,Source,Credit,Debit,Balance,Status']
        .concat(
          filteredLedger.map(
            e =>
              `${e.date},${e.reference},${e.memberName},${e.memberId},"${e.transactionType}","${e.sourceReference}",${e.credit},${e.debit},${e.balanceAfter},${e.status}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `financial_ledger_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Financial Ledger & Wallet Vault</h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete double-entry accounting ledger of credits, overrides, debits, and pending liabilities.
          </p>
        </div>

        <button
          onClick={handleExportLedger}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Ledger CSV</span>
        </button>
      </div>

      {/* Top Ledger Stats (4 stats required) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Wallet Balance"
          value="₹48.92L"
          subtext="Total liability in system"
          icon={Wallet}
        />
        <StatCard
          label="Total Credits"
          value="₹64.20L"
          subtext="Commissions & bonuses paid"
          icon={ArrowDownLeft}
          className="border-emerald-200 bg-emerald-50/20"
        />
        <StatCard
          label="Total Debits"
          value="₹15.28L"
          subtext="Withdrawals disbursed"
          icon={ArrowUpRight}
        />
        <StatCard
          label="Pending Withdrawals"
          value={`₹${(pendingWithdrawalsSum || 284000).toLocaleString('en-IN')}`}
          subtext="Awaiting bank payout"
          className="border-amber-200 bg-amber-50/20"
        />
      </div>

      {/* Ledger Filters */}
      <div className="card-clean p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search member, ID, reference..."
              value={searchMember}
              onChange={e => setSearchMember(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
            >
              <option value="All">All Transaction Types</option>
              <option value="Direct / Level Commission">Direct / Level Commission</option>
              <option value="Active Income">Active Income</option>
              <option value="Passive Income">Passive Income</option>
              <option value="Weekly Bonus">Weekly Bonus</option>
              <option value="Monthly Bonus">Monthly Bonus</option>
              <option value="Manual Bonus">Manual Bonus</option>
              <option value="Non-working Benefit">Non-working Benefit</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="Refund / Reversal">Refund / Reversal</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Reversed">Reversed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Double-Entry Financial Journal</h3>
            <p className="text-xs text-slate-500">Immutable credit & debit entries with running balance</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{filteredLedger.length} Entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Date & Time</th>
                <th className="py-3 px-4 font-medium">Beneficiary Member</th>
                <th className="py-3 px-4 font-medium">Transaction Type</th>
                <th className="py-3 px-4 font-medium">Source / Reference</th>
                <th className="py-3 px-4 font-medium text-right">Credit (+)</th>
                <th className="py-3 px-4 font-medium text-right">Debit (-)</th>
                <th className="py-3 px-4 font-medium text-right">Balance</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLedger.map(entry => (
                <tr key={entry.id} className="table-row-hover">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{entry.date}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{entry.memberName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{entry.memberId}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">{entry.transactionType}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px] max-w-xs truncate" title={entry.sourceReference}>
                    {entry.sourceReference}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">
                    {entry.credit > 0 ? `+₹${entry.credit.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">
                    {entry.debit > 0 ? `-₹${entry.debit.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-slate-900">
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
