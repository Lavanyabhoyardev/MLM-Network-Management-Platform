import React, { useState } from 'react';
import {
  ArrowUpRight,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Building,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WithdrawalRequest } from '../../mockData/withdrawals';
import { StatusBadge } from '../../components/StatusBadge';
import { Drawer } from '../../components/Drawer';

export const AdminWithdrawals: React.FC = () => {
  const {
    withdrawals,
    approveWithdrawal,
    rejectWithdrawal,
    markWithdrawalProcessing,
    markWithdrawalPaid
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Pending' | 'Approved' | 'Processing' | 'Paid' | 'Rejected'>('Pending');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const filteredWithdrawals = withdrawals.filter(w => w.status === activeTab);

  const handleAction = (action: 'approve' | 'process' | 'pay') => {
    if (!selectedWithdrawal) return;
    if (action === 'approve') approveWithdrawal(selectedWithdrawal.id);
    if (action === 'process') markWithdrawalProcessing(selectedWithdrawal.id);
    if (action === 'pay') markWithdrawalPaid(selectedWithdrawal.id);
    setSelectedWithdrawal(null);
  };

  const handleReject = () => {
    if (!selectedWithdrawal) return;
    if (!rejectReason.trim()) {
      alert('Please enter a rejection explanation for the distributor audit log.');
      return;
    }
    rejectWithdrawal(selectedWithdrawal.id, rejectReason);
    setIsRejecting(false);
    setRejectReason('');
    setSelectedWithdrawal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Withdrawal Requests & Payout Dispatch</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review, approve, and track batch payouts into banking rails and UPI gateways.
        </p>
      </div>

      <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg text-xs text-blue-900 leading-relaxed">
        <strong>Frontend UI/UX Demo:</strong> Approval and payout transitions update local frontend mock state only. No live banking dispatches or payment gateways are triggered.
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {(['Pending', 'Approved', 'Processing', 'Paid', 'Rejected'] as const).map(tab => {
          const count = withdrawals.filter(w => w.status === tab).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-medium border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="card-clean overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Request ID</th>
                <th className="py-3 px-4 font-medium">Member</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Requested Time</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Payment Method</th>
                <th className="py-3 px-4 font-medium">Gateway Ref</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWithdrawals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No {activeTab.toLowerCase()} withdrawal requests found.
                  </td>
                </tr>
              ) : (
                filteredWithdrawals.map(w => (
                  <tr key={w.id} className="table-row-hover">
                    <td className="py-3 px-4 font-mono font-medium text-slate-900">{w.requestId}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{w.memberName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{w.memberId}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {w.formattedAmount}
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{w.requestedDate}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={w.status} />
                    </td>
                    <td className="py-3 px-4 text-slate-600">{w.paymentMethod}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {w.transactionRef || 'Pending Ref'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedWithdrawal(w);
                          setIsRejecting(false);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Action Drawer */}
      <Drawer
        isOpen={!!selectedWithdrawal}
        onClose={() => setSelectedWithdrawal(null)}
        title="Payout Settlement Details"
        subtitle={`Request ID: ${selectedWithdrawal?.requestId}`}
        width="md"
      >
        {selectedWithdrawal && (
          <div className="space-y-6 text-xs">
            {/* Amount Banner */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[11px] block">Requested Payout</span>
                <span className="text-2xl font-bold font-mono text-slate-900">
                  {selectedWithdrawal.formattedAmount}
                </span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Method: {selectedWithdrawal.paymentMethod}
                </span>
              </div>
              <StatusBadge status={selectedWithdrawal.status} size="md" />
            </div>

            {/* Member Details */}
            <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Beneficiary Particulars
              </span>
              <div className="flex justify-between">
                <span className="text-slate-500">Name:</span>
                <span className="font-semibold text-slate-900">{selectedWithdrawal.memberName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Member ID:</span>
                <span className="font-mono text-slate-700">{selectedWithdrawal.memberId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="text-slate-700">{selectedWithdrawal.memberEmail}</span>
              </div>
            </div>

            {/* Bank / Gateway Account Details */}
            <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Destination Account Information
              </span>
              {selectedWithdrawal.accountDetails.bankName && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bank Name:</span>
                    <span className="font-medium text-slate-900">
                      {selectedWithdrawal.accountDetails.bankName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account Number:</span>
                    <span className="font-mono text-slate-900">
                      {selectedWithdrawal.accountDetails.accountNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">IFSC Code:</span>
                    <span className="font-mono text-slate-900">
                      {selectedWithdrawal.accountDetails.ifscCode}
                    </span>
                  </div>
                </>
              )}
              {selectedWithdrawal.accountDetails.upiId && (
                <div className="flex justify-between">
                  <span className="text-slate-500">UPI Virtual ID:</span>
                  <span className="font-mono font-bold text-blue-600">
                    {selectedWithdrawal.accountDetails.upiId}
                  </span>
                </div>
              )}
              {selectedWithdrawal.remarks && (
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Remarks:</span> {selectedWithdrawal.remarks}
                </div>
              )}
            </div>

            {/* Workflow Action Bar */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <span className="text-xs font-semibold text-slate-900 block">
                Compliance & Financial Actions:
              </span>

              {!isRejecting ? (
                <div className="space-y-2">
                  {selectedWithdrawal.status === 'Pending' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setIsRejecting(true)}
                        className="py-2.5 px-3 rounded border border-rose-200 text-rose-700 hover:bg-rose-50 font-medium transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAction('approve')}
                        className="py-2.5 px-3 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        Approve Payout
                      </button>
                    </div>
                  )}

                  {selectedWithdrawal.status === 'Approved' && (
                    <button
                      onClick={() => handleAction('process')}
                      className="w-full py-2.5 px-3 rounded bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors shadow-sm"
                    >
                      Dispatch to Bank / Gateway (Mark Processing)
                    </button>
                  )}

                  {selectedWithdrawal.status === 'Processing' && (
                    <button
                      onClick={() => handleAction('pay')}
                      className="w-full py-2.5 px-3 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      Confirm Gateway Settlement (Mark Paid)
                    </button>
                  )}

                  {(selectedWithdrawal.status === 'Paid' || selectedWithdrawal.status === 'Rejected') && (
                    <div className="p-3 bg-slate-50 rounded text-center text-slate-500">
                      No further state transitions applicable for {selectedWithdrawal.status} request.
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 space-y-3">
                  <label className="block text-xs font-semibold text-rose-900">
                    Reason for Rejecting Payout:
                  </label>
                  <textarea
                    rows={2}
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    placeholder="e.g. Bank IFSC invalid or compliance discrepancy..."
                    className="w-full p-2 text-xs rounded border border-rose-300 focus:outline-none bg-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsRejecting(false)}
                      className="px-3 py-1 rounded text-slate-600 hover:bg-rose-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReject}
                      className="px-3 py-1 rounded bg-rose-600 text-white font-medium hover:bg-rose-700"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
