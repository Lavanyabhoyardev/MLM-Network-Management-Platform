import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Building,
  CreditCard,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { WithdrawalRequest } from '../../mockData/withdrawals';

export const MemberWithdraw: React.FC = () => {
  const { currentMember, submitMemberWithdrawal, withdrawals } = useApp();

  const [amount, setAmount] = useState('10000');
  const [method, setMethod] = useState<WithdrawalRequest['paymentMethod']>('Bank Transfer (IMPS)');
  const [accountNumber, setAccountNumber] = useState('••••••••4891');
  const [ifscCode, setIfscCode] = useState('HDFC0000128');
  const [upiId, setUpiId] = useState('rahul.sharma@okhdfcbank');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const myWithdrawals = withdrawals.filter(
    w => w.memberId === currentMember.memberId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      setErrorMessage('Please specify a positive withdrawal amount.');
      return;
    }

    if (numAmount > currentMember.walletBalance) {
      setErrorMessage(`Insufficient wallet balance. Maximum withdrawable is ${currentMember.formattedWallet}.`);
      return;
    }

    if (numAmount < 1000) {
      setErrorMessage('Minimum single withdrawal limit is ₹1,000.');
      return;
    }

    const success = submitMemberWithdrawal(numAmount, method, {
      bankName: method.includes('Bank') ? 'HDFC Bank Ltd' : undefined,
      accountNumber: method.includes('Bank') ? accountNumber : undefined,
      ifscCode: method.includes('Bank') ? ifscCode : undefined,
      upiId: method === 'UPI' ? upiId : undefined,
      holderName: currentMember.name
    });

    if (success) {
      setToastMessage(`Payout request for ₹${numAmount.toLocaleString('en-IN')} submitted successfully!`);
      setAmount('5000');
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Withdraw Available Earnings</h2>
        <p className="text-xs text-slate-500 mt-1">
          Initiate direct settlements into verified domestic bank accounts or UPI VPAs.
        </p>
      </div>

      <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg text-xs text-blue-900 leading-relaxed">
        <strong>Frontend UI/UX Demo:</strong> Submitting payout requests modifies local mock state only for client presentation. No live banking, IMPS/NEFT APIs, or real financial transactions are executed.
      </div>

      {toastMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Snapshot Card */}
        <div className="card-clean p-5 md:col-span-1 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Withdrawable Balance
            </span>
            <span className="text-3xl font-extrabold font-mono text-slate-900 block mt-1">
              {currentMember.formattedWallet}
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              Zero pending processing holds
            </span>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>KYC Verification:</span>
                <span className="font-semibold text-emerald-600">Passed</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Payout:</span>
                <span className="font-mono">₹1,000</span>
              </div>
              <div className="flex justify-between">
                <span>Settlement Time:</span>
                <span>Within 24 Hours</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900">
            <strong>Demo Simulation:</strong> Submitting debits your local wallet immediately and adds the entry into the Admin Payout queue.
          </div>
        </div>

        {/* Withdrawal Form Card */}
        <div className="card-clean p-5 md:col-span-2">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Payout Destination & Amount</h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Amount */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Enter Amount to Withdraw (₹ INR):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  max={currentMember.walletBalance}
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 rounded-md border border-slate-200 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[5000, 10000, 25000].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(String(val))}
                    className="px-2.5 py-1 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[11px] font-medium text-slate-700"
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAmount(String(currentMember.walletBalance))}
                  className="px-2.5 py-1 rounded border border-blue-200 bg-blue-50 text-[11px] font-medium text-blue-700 hover:bg-blue-100"
                >
                  Max All
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Transfer Method:</label>
              <select
                value={method}
                onChange={e => setMethod(e.target.value as any)}
                className="w-full p-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="Bank Transfer (IMPS)">Bank Transfer (IMPS - Instant)</option>
                <option value="Bank Transfer (NEFT)">Bank Transfer (NEFT - Standard)</option>
                <option value="UPI">UPI Virtual Payment Address</option>
              </select>
            </div>

            {/* Destination Preview */}
            {method.includes('Bank') ? (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination Bank:</span>
                  <span className="font-semibold text-slate-900">HDFC Bank Ltd</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Account Number:</span>
                  <span className="font-mono text-slate-900">{accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">IFSC Code:</span>
                  <span className="font-mono text-slate-900">{ifscCode}</span>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 block text-[11px]">UPI Handle:</span>
                <span className="font-mono font-bold text-blue-600 block">{upiId}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={currentMember.walletBalance <= 0}
              className="w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Withdrawal Request
            </button>
          </form>
        </div>
      </div>

      {/* Withdrawal History Table */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Withdrawal Request History</h3>
            <p className="text-xs text-slate-500">Lifecycle status of previous payout disbursements</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{myWithdrawals.length} Requests</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Request ID</th>
                <th className="py-3 px-4 font-medium">Requested Date</th>
                <th className="py-3 px-4 font-medium">Payout Method</th>
                <th className="py-3 px-4 font-medium text-right">Amount</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
                <th className="py-3 px-4 font-medium text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myWithdrawals.map(w => (
                <tr key={w.id} className="table-row-hover">
                  <td className="py-3 px-4 font-mono font-medium text-slate-900">{w.requestId}</td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{w.requestedDate}</td>
                  <td className="py-3 px-4 text-slate-700">{w.paymentMethod}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    {w.formattedAmount}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={w.status} />
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400">
                    {w.transactionRef || 'Under Review'}
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
