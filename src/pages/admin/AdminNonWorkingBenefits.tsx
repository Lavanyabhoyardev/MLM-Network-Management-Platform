import React, { useState } from 'react';
import { Award, Plus, CheckCircle2, Sparkles, User, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MEMBERS } from '../../mockData/members';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';

export const AdminNonWorkingBenefits: React.FC = () => {
  const { nonWorkingBenefits, addNonWorkingBenefit } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(MEMBERS[0].memberId);
  const [benefitType, setBenefitType] = useState<'Cash' | 'Points' | 'Package'>('Package');
  const [amountOrPackage, setAmountOrPackage] = useState('');
  const [reason, setReason] = useState('');
  const [remarks, setRemarks] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  const targetMember = MEMBERS.find(m => m.memberId === selectedMemberId) || MEMBERS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountOrPackage.trim() || !reason.trim()) {
      alert('Please fill in benefit details and reason.');
      return;
    }

    addNonWorkingBenefit({
      memberId: targetMember.memberId,
      memberName: targetMember.name,
      benefitType,
      amountOrPackage,
      reason,
      remarks: remarks || 'Non-working administrative benefit grant',
      createdBy: 'Super Admin (AD-01)'
    });

    setIsModalOpen(false);
    setAmountOrPackage('');
    setReason('');
    setRemarks('');
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Non-Working & Passive Benefits</h2>
          <p className="text-xs text-slate-500 mt-1">
            Distribute loyalty course grants, reward points, and passive support allocations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Grant Non-Working Benefit</span>
        </button>
      </div>

      {successToast && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Non-working benefit successfully recorded and provisioned.</span>
          </div>
          <button onClick={() => setSuccessToast(false)} className="text-xs text-emerald-900 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Benefits Table */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Provisioned Benefits Ledger</h3>
            <p className="text-xs text-slate-500">Overview of active course privileges and passive grants</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{nonWorkingBenefits.length} Grants</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Member</th>
                <th className="py-3 px-4 font-medium">Benefit Type</th>
                <th className="py-3 px-4 font-medium">Amount / Provisioned Benefit</th>
                <th className="py-3 px-4 font-medium">Reason</th>
                <th className="py-3 px-4 font-medium">Issued By</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {nonWorkingBenefits.map(b => (
                <tr key={b.id} className="table-row-hover">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{b.date}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{b.memberName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{b.memberId}</span>
                  </td>
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
                  <td className="py-3 px-4 font-medium text-slate-900">{b.amountOrPackage}</td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={b.reason}>
                    {b.reason}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{b.createdBy}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Benefit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Grant Non-Working Benefit"
        subtitle="Provision educational course modules, reward credits, or passive support stipends."
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Member */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Beneficiary Member:</label>
            <select
              value={selectedMemberId}
              onChange={e => setSelectedMemberId(e.target.value)}
              className="w-full p-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              {MEMBERS.map(m => (
                <option key={m.memberId} value={m.memberId}>
                  {m.name} ({m.memberId}) • {m.packageName}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Benefit Type:</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Package', 'Points', 'Cash'] as const).map(type => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setBenefitType(type)}
                  className={`py-2 text-center rounded border transition-colors font-medium ${
                    benefitType === type
                      ? 'border-blue-600 bg-blue-50 text-blue-800'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Amount / Package */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {benefitType === 'Package'
                ? 'Course Module / Access Title:'
                : benefitType === 'Points'
                ? 'Reward Points Count:'
                : 'Stipend Amount (₹):'}
            </label>
            <input
              type="text"
              value={amountOrPackage}
              onChange={e => setAmountOrPackage(e.target.value)}
              placeholder={
                benefitType === 'Package'
                  ? 'e.g. Masterclass Social Funnel Module'
                  : benefitType === 'Points'
                  ? 'e.g. 2,000 Loyalty Reward Credits'
                  : 'e.g. ₹2,500'
              }
              className="w-full p-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Grant Justification:</label>
            <textarea
              rows={2}
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="e.g. Regional promotion partner grant..."
              className="w-full p-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Internal Reference:</label>
            <input
              type="text"
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              placeholder="e.g. Board resolution directive"
              className="w-full p-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Issue Benefit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
