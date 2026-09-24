import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  XCircle,
  Eye,
  AlertCircle,
  Calendar,
  User,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { Drawer } from '../../components/Drawer';
import { KYCSubmission } from '../../mockData/kycRequests';

export const AdminKYC: React.FC = () => {
  const { kycList, approveKYC, rejectKYC } = useApp();
  const [activeTab, setActiveTab] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [selectedKYC, setSelectedKYC] = useState<KYCSubmission | null>(null);
  const [rejectReasonInput, setRejectReasonInput] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const filteredList = kycList.filter(k => k.status === activeTab);

  const handleApprove = (id: string) => {
    approveKYC(id);
    setSelectedKYC(null);
  };

  const handleReject = (id: string) => {
    if (!rejectReasonInput.trim()) {
      alert('Please enter a brief rejection reason for the member audit log.');
      return;
    }
    rejectKYC(id, rejectReasonInput);
    setRejectReasonInput('');
    setIsRejecting(false);
    setSelectedKYC(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">KYC Compliance Review</h2>
        <p className="text-xs text-slate-500 mt-1">
          Verify government ID credentials and banking documentation according to statutory compliance.
        </p>
      </div>

      <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg text-xs text-blue-900 leading-relaxed">
        <strong>Frontend UI/UX Demo:</strong> KYC submissions, review workflows, and approval/rejection actions operate on mock prototype state only. No external government identity verification APIs are connected.
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {(['Pending', 'Approved', 'Rejected'] as const).map(tab => {
          const count = kycList.filter(k => k.status === tab).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 py-3 px-5 text-xs font-medium border-b-2 transition-all ${
                isActive
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <span>{tab} Submissions</span>
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

      {/* KYC Table */}
      <div className="card-clean overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Member</th>
                <th className="py-3 px-4 font-medium">KYC ID</th>
                <th className="py-3 px-4 font-medium">Submitted</th>
                <th className="py-3 px-4 font-medium">Documents</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Reviewer</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No {activeTab.toLowerCase()} KYC submissions in record.
                  </td>
                </tr>
              ) : (
                filteredList.map(kyc => (
                  <tr key={kyc.id} className="table-row-hover">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center">
                          {kyc.memberName.substring(0, 1)}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block">{kyc.memberName}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{kyc.memberId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-700">{kyc.kycId}</td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{kyc.submittedDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {kyc.documents.map((doc, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700 border border-slate-200"
                          >
                            <FileText className="w-2.5 h-2.5 text-slate-500" />
                            {doc.type}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={kyc.status} />
                    </td>
                    <td className="py-3 px-4 text-slate-600">{kyc.reviewer}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedKYC(kyc);
                          setIsRejecting(false);
                          setRejectReasonInput('');
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Drawer */}
      <Drawer
        isOpen={!!selectedKYC}
        onClose={() => {
          setSelectedKYC(null);
          setIsRejecting(false);
        }}
        title="Compliance Verification"
        subtitle={`Request: ${selectedKYC?.kycId}`}
        width="lg"
      >
        {selectedKYC && (
          <div className="space-y-6">
            {/* Member Card */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-slate-900">{selectedKYC.memberName}</h4>
                  <p className="text-xs text-slate-500">
                    {selectedKYC.memberId} • Package: {selectedKYC.packagePurchased}
                  </p>
                </div>
                <StatusBadge status={selectedKYC.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Email</span>
                  <span className="font-medium text-slate-800">{selectedKYC.memberEmail}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Phone</span>
                  <span className="font-medium text-slate-800">{selectedKYC.memberPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Submission Timestamp</span>
                  <span className="font-medium text-slate-800">{selectedKYC.submittedDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Current Reviewer</span>
                  <span className="font-medium text-slate-800">{selectedKYC.reviewer}</span>
                </div>
              </div>

              {selectedKYC.notes && (
                <div className="mt-3 p-2 rounded bg-white border border-slate-200 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Internal Note:</span> {selectedKYC.notes}
                </div>
              )}

              {selectedKYC.rejectionReason && (
                <div className="mt-3 p-2 rounded bg-rose-50 border border-rose-200 text-xs text-rose-800">
                  <span className="font-semibold">Rejection Cause:</span> {selectedKYC.rejectionReason}
                </div>
              )}
            </div>

            {/* Document Proof Previews */}
            <div>
              <h5 className="text-xs font-semibold text-slate-900 mb-3 uppercase tracking-wider">
                Submitted Verification Documents ({selectedKYC.documents.length})
              </h5>

              <div className="space-y-3">
                {selectedKYC.documents.map((doc, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-slate-900">{doc.type}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        No: {doc.documentNumber}
                      </span>
                    </div>

                    {/* Placeholder Document Preview */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="h-28 bg-slate-100 rounded border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs p-2 text-center">
                        <FileText className="w-6 h-6 mb-1 text-slate-400" />
                        <span>Front Scan Verified</span>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5">SHA256 Encrypted</span>
                      </div>
                      <div className="h-28 bg-slate-100 rounded border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs p-2 text-center">
                        <FileText className="w-6 h-6 mb-1 text-slate-400" />
                        <span>{doc.backUrl ? 'Back Scan Verified' : 'Single Sided Document'}</span>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5">Government Issued</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar (Approve / Reject) */}
            {selectedKYC.status === 'Pending' && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                {!isRejecting ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setIsRejecting(true)}
                      className="py-2.5 px-4 rounded-md border border-rose-200 bg-white text-rose-700 hover:bg-rose-50 text-xs font-medium transition-colors"
                    >
                      Reject Submission
                    </button>
                    <button
                      onClick={() => handleApprove(selectedKYC.id)}
                      className="py-2.5 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-medium shadow-sm transition-colors"
                    >
                      Approve KYC
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-200 space-y-3">
                    <label className="block text-xs font-semibold text-rose-900">
                      Reason for Rejection (Audit Log Entry):
                    </label>
                    <textarea
                      rows={2}
                      value={rejectReasonInput}
                      onChange={e => setRejectReasonInput(e.target.value)}
                      placeholder="e.g. Blurred PAN card upload or mismatched beneficiary name..."
                      className="w-full text-xs p-2 rounded border border-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsRejecting(false)}
                        className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-rose-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReject(selectedKYC.id)}
                        className="px-3 py-1.5 rounded bg-rose-600 text-white text-xs font-medium hover:bg-rose-700"
                      >
                        Confirm Rejection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedKYC.status !== 'Pending' && (
              <div className="pt-2 text-center">
                <span className="text-xs text-slate-400">
                  This submission has already been finalized as {selectedKYC.status}.
                </span>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};
