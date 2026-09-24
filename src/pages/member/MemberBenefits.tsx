import React from 'react';
import { Award, Sparkles, CheckCircle2, Package, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { StatCard } from '../../components/StatCard';

export const MemberBenefits: React.FC = () => {
  const { nonWorkingBenefits, currentMember } = useApp();

  const myBenefits = nonWorkingBenefits.filter(
    b => b.memberId === currentMember.memberId
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Non-Working & Administrative Benefits</h2>
        <p className="text-xs text-slate-500 mt-1">
          Special educational module allowances, reward point incentives, and administrative stipends provisioned to your account.
        </p>
      </div>

      {/* Top 3 Benefit KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Active Grants"
          value={myBenefits.length}
          subtext="Provisioned privileges"
          icon={Award}
        />
        <StatCard
          label="Course Privileges"
          value="Advanced SEO Module"
          subtext="Complimentary leader access"
          icon={Package}
        />
        <StatCard
          label="Reward Standing"
          value="VIP Partner"
          subtext="Direct administrative recognition"
          icon={Sparkles}
          className="border-blue-200 bg-blue-50/20"
        />
      </div>

      {/* Benefits Table */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Your Granted Benefits Record</h3>
            <p className="text-xs text-slate-500">Official log of admin-authorized non-working incentives</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{myBenefits.length} Active Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Issue Date</th>
                <th className="py-3 px-4 font-medium">Benefit Classification</th>
                <th className="py-3 px-4 font-medium">Granted Privilege / Amount</th>
                <th className="py-3 px-4 font-medium">Justification Reason</th>
                <th className="py-3 px-4 font-medium">Issuer</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myBenefits.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No non-working benefits recorded yet.
                  </td>
                </tr>
              ) : (
                myBenefits.map(b => (
                  <tr key={b.id} className="table-row-hover">
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{b.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                          b.benefitType === 'Cash'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : b.benefitType === 'Points'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {b.benefitType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{b.amountOrPackage}</td>
                    <td className="py-3 px-4 text-slate-600 max-w-sm">{b.reason}</td>
                    <td className="py-3 px-4 text-slate-500">{b.createdBy}</td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
