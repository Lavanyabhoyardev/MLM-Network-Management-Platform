import React from 'react';
import { Layers, Calendar, ShieldCheck, Download } from 'lucide-react';
import { COMMISSION_TRANSACTIONS } from '../../mockData/commissions';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { BannerNotice } from '../../components/BannerNotice';

export const MemberPassiveIncome: React.FC = () => {
  const passiveTransactions = COMMISSION_TRANSACTIONS.filter(
    tx => tx.memberId === 'MEM-10482' && tx.commissionType === 'Level Commission'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Passive Level Overrides</h2>
        <p className="text-xs text-slate-500 mt-1">
          Secondary multi-tier commissions earned from downline network enrollments across Levels 2 through 5.
        </p>
      </div>

      <BannerNotice
        type="warning"
        title="Illustrative — Pending Client Approval"
        message="Passive income level mapping, override eligibility, and secondary commission percentages are unfinalized draft business rules displayed for demonstration purposes only. All calculations shown below represent mock/demo data awaiting client confirmation."
      />

      {/* Top 3 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Current Passive Income (Demo)"
          value="₹18,200"
          subtext="Mock secondary override earnings"
          icon={Layers}
        />
        <StatCard
          label="This Month (June Demo)"
          value="₹6,420"
          subtext="Illustrative secondary overrides"
          trend={{ value: '18.4%', isPositive: true }}
          icon={Calendar}
          className="border-emerald-200 bg-emerald-50/20"
        />
        <StatCard
          label="Override Depth"
          value="5 Levels"
          subtext="Illustrative Draft Tiering"
          badge="Demo Rule"
        />
      </div>

      {/* Transaction Table */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Secondary Level Override Entries (Mock Demo Data)</h3>
            <p className="text-xs text-slate-500">Illustrative downline override records — pending client confirmation of matrix</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{passiveTransactions.length} Demo Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Downline Source Member</th>
                <th className="py-3 px-4 font-medium">Package Enrolled</th>
                <th className="py-3 px-4 font-medium">Tier Depth</th>
                <th className="py-3 px-4 font-medium">Override Rate</th>
                <th className="py-3 px-4 font-medium text-right">Amount</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
                <th className="py-3 px-4 font-medium text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {passiveTransactions.map(tx => (
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
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                      L{tx.level} Override
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{tx.percentageRate}</td>
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
