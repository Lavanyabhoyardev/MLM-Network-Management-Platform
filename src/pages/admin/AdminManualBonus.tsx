import React, { useState } from 'react';
import { Gift, Plus, CheckCircle2, AlertCircle, Clock, User, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MEMBERS } from '../../mockData/members';
import { Modal } from '../../components/Modal';
import { StatusBadge } from '../../components/StatusBadge';

export const AdminManualBonus: React.FC = () => {
  const { manualBonuses, addManualBonus } = useApp();

  const [selectedMemberId, setSelectedMemberId] = useState(MEMBERS[0].memberId);
  const [amount, setAmount] = useState('5000');
  const [bonusType, setBonusType] = useState<
    'Performance Leadership' | 'Top Recruiter' | 'Event Incentive' | 'Discretionary Adjustment'
  >('Performance Leadership');
  const [reason, setReason] = useState('');
  const [remarks, setRemarks] = useState('');

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const targetMember = MEMBERS.find(m => m.memberId === selectedMemberId) || MEMBERS[0];

  const handleOpenPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid credit amount');
      return;
    }
    if (!reason.trim()) {
      alert('Please enter a justifiable reason for the compliance audit trail');
      return;
    }
    setShowPreviewModal(true);
  };

  const handleConfirmCredit = () => {
    addManualBonus({
      memberId: targetMember.memberId,
      memberName: targetMember.name,
      amount: Number(amount),
      bonusType,
      reason,
      remarks: remarks || 'Executive Admin Discretionary Credit',
      createdBy: 'Super Admin (AD-01)'
    });

    setShowPreviewModal(false);
    setReason('');
    setRemarks('');
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Manual & Discretionary Bonus Grants</h2>
        <p className="text-xs text-slate-500 mt-1">
          Issue authorized executive performance credits, incentive rewards, and direct wallet disbursements.
        </p>
      </div>

      {successToast && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              Successfully credited <strong>₹{Number(amount).toLocaleString('en-IN')}</strong> to{' '}
              {targetMember.name}'s wallet ledger.
            </span>
          </div>
          <button onClick={() => setSuccessToast(false)} className="text-xs text-emerald-900 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="card-clean p-5 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">Credit New Bonus</h3>
          </div>

          <form onSubmit={handleOpenPreview} className="space-y-4 text-xs">
            {/* Target Member */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Beneficiary Member:</label>
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

            {/* Amount */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bonus Amount (₹ INR):</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-semibold">₹</span>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="5000"
                  className="w-full pl-7 pr-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-slate-900"
                />
              </div>
            </div>

            {/* Bonus Type */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Incentive Category:</label>
              <select
                value={bonusType}
                onChange={e => setBonusType(e.target.value as any)}
                className="w-full p-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="Performance Leadership">Performance Leadership</option>
                <option value="Top Recruiter">Top Recruiter</option>
                <option value="Event Incentive">Event Incentive</option>
                <option value="Discretionary Adjustment">Discretionary Adjustment</option>
              </select>
            </div>

            {/* Justification Reason */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Audit Reason / Justification:
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="e.g. Q2 Top conversion leader bonus approved by board..."
                className="w-full p-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Internal Remarks (Optional):</label>
              <input
                type="text"
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                placeholder="e.g. Resolution ref #BM-994"
                className="w-full p-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Metadata Preview */}
            <div className="p-2.5 rounded bg-slate-50 border border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Created By:</span>
                <span className="font-medium text-slate-700">Super Admin (AD-01)</span>
              </div>
              <div className="flex justify-between">
                <span>Execution Time:</span>
                <span className="font-medium text-slate-700">Immediate Real-Time</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setReason('');
                  setRemarks('');
                }}
                className="px-3 py-2 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors text-center"
              >
                Preview & Credit Bonus
              </button>
            </div>
          </form>
        </div>

        {/* Existing Bonuses Table */}
        <div className="card-clean overflow-hidden lg:col-span-2">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Manual Bonus Audit Log</h3>
              <p className="text-xs text-slate-500">Historical records of discretionary allocations</p>
            </div>
            <span className="text-xs font-mono text-slate-400">{manualBonuses.length} Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-medium">Date/Time</th>
                  <th className="py-3 px-4 font-medium">Member</th>
                  <th className="py-3 px-4 font-medium">Amount</th>
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Reason</th>
                  <th className="py-3 px-4 font-medium">Created By</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {manualBonuses.map(b => (
                  <tr key={b.id} className="table-row-hover">
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{b.dateTime}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{b.memberName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{b.memberId}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">
                      +{b.formattedAmount}
                    </td>
                    <td className="py-3 px-4 text-slate-700">{b.bonusType}</td>
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
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Confirm Discretionary Bonus Credit"
        subtitle="This action will instantly post a credit to the member's wallet ledger."
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Beneficiary:</span>
              <span className="font-semibold text-slate-900">
                {targetMember.name} ({targetMember.memberId})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Credit Amount:</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">
                +₹{Number(amount).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="font-medium text-slate-900">{bonusType}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2">
              <span className="text-slate-500">Current Wallet:</span>
              <span className="font-mono text-slate-700">{targetMember.formattedWallet}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Projected Balance:</span>
              <span className="font-mono font-bold text-slate-900">
                ₹{(targetMember.walletBalance + Number(amount)).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
            <strong>Audit Note:</strong> An entry will be generated in the platform Audit Log and recorded in the double-entry wallet ledger.
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="px-4 py-2 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmCredit}
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-sm"
            >
              Confirm & Credit Bonus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
