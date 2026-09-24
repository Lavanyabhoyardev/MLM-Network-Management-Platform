import React, { useState } from 'react';
import { Percent, AlertTriangle, Layers, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { COMMISSION_RULES, COMMISSION_TRANSACTIONS } from '../../mockData/commissions';
import { StatusBadge } from '../../components/StatusBadge';
import { BannerNotice } from '../../components/BannerNotice';
import { StatCard } from '../../components/StatCard';

export const AdminCommissions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'transactions'>('rules');
  const [selectedRulePkg, setSelectedRulePkg] = useState('pkg-standard');

  const selectedRule = COMMISSION_RULES.find(r => r.packageId === selectedRulePkg) || COMMISSION_RULES[1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Commission Architecture & Ledger</h2>
        <p className="text-xs text-slate-500 mt-1">
          Multi-level compensation breakdown, tier rules, and transaction disbursement audit.
        </p>
      </div>

      {/* Prominent Disclaimer Banner */}
      <BannerNotice
        type="warning"
        title="Illustrative commission matrix — pending client approval"
        message="Commission matrix requires client approval before implementation. The L1 50%, L2 25%, L3 12.5%, L4 6.25%, L5 3.125% percentages reflect an illustrative working interpretation, not finalized financial logic."
      />

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Commissions Credited"
          value="₹18.72L"
          subtext="Lifetime disbursements"
        />
        <StatCard
          label="Active Direct Income"
          value="₹11.84L"
          subtext="Level 1 Direct Referrals"
        />
        <StatCard
          label="Passive Overrides (L2-L5)"
          value="₹6.88L"
          subtext="Secondary depth tiers"
        />
        <StatCard
          label="Rule Matrix Status"
          value="Under Review"
          subtext="Client signoff required"
          badge="Draft"
          className="border-amber-200"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('rules')}
          className={`py-3 px-5 text-xs font-medium border-b-2 transition-all ${
            activeTab === 'rules'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Commission Rules Configuration (4 Tiers)
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`py-3 px-5 text-xs font-medium border-b-2 transition-all ${
            activeTab === 'transactions'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Commission Transactions Audit Log
        </button>
      </div>

      {/* TAB 1: RULES CONFIGURATION */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          {/* Package Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {COMMISSION_RULES.map(pkg => (
              <button
                key={pkg.packageId}
                onClick={() => setSelectedRulePkg(pkg.packageId)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                  selectedRulePkg === pkg.packageId
                    ? 'bg-blue-50 border-blue-400 text-blue-800 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{pkg.packageName}</span>
                  <span className="text-slate-400 font-mono">₹{pkg.packagePrice.toLocaleString('en-IN')}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-600">
                    {pkg.earningLevels} Levels
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Package Rule Detail Table */}
          <div className="card-clean overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedRule.packageName} Package Commission Tiering
                  </h3>
                  <StatusBadge status="Illustrative / Pending Client Approval" size="sm" />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Retail Price: ₹{selectedRule.packagePrice.toLocaleString('en-IN')} • Eligible Depth: {selectedRule.earningLevels} Levels
                </p>
              </div>

              <span className="text-[11px] px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                Working Draft Interpretation
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-medium">Tier Level</th>
                    <th className="py-3 px-4 font-medium">Level Designation</th>
                    <th className="py-3 px-4 font-medium">Illustrative Payout Rate</th>
                    <th className="py-3 px-4 font-medium">Calculated Payout per Enrollment</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedRule.levels.map(lvl => (
                    <tr key={lvl.level} className="table-row-hover">
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-slate-100 text-slate-700 font-mono font-bold text-xs">
                          L{lvl.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">{lvl.description}</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">
                        {lvl.illustrativeRate}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                        {lvl.calculatedExample}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Pending Client Approval
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
              <p className="font-semibold text-slate-700 mb-1">
                Working Model Note (Standard Interpretation):
              </p>
              <p className="leading-relaxed">
                Under the documented working model (e.g. Standard package ₹5,000): Level 1 receives 50% (₹2,500), Level 2 receives 25% (₹1,250), Level 3 receives 12.5% (₹625), Level 4 receives 6.25% (₹312.50), and Level 5 receives 3.125% (₹156.25). This structured model provides exponential downline motivation while maintaining balanced financial reserves. Final rate configuration will be adjusted upon receipt of client sign-off.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRANSACTIONS AUDIT */}
      {activeTab === 'transactions' && (
        <div className="card-clean overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Disbursed Commission Records</h3>
              <p className="text-xs text-slate-500">Real-time credit entries generated from team enrollments</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {COMMISSION_TRANSACTIONS.length} Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">Beneficiary Member</th>
                  <th className="py-3 px-4 font-medium">Source Member</th>
                  <th className="py-3 px-4 font-medium">Package</th>
                  <th className="py-3 px-4 font-medium">Level</th>
                  <th className="py-3 px-4 font-medium">Commission Type</th>
                  <th className="py-3 px-4 font-medium">Amount</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMMISSION_TRANSACTIONS.map(tx => (
                  <tr key={tx.id} className="table-row-hover">
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{tx.date}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{tx.memberName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{tx.memberId}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800 block">{tx.sourceMemberName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{tx.sourceMemberId}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700">
                        {tx.packagePurchased} (₹{tx.packageAmount.toLocaleString('en-IN')})
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-700">
                      L{tx.level}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{tx.commissionType}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">
                      +{tx.formattedAmount}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {tx.reference}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
