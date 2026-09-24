import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Building,
  CreditCard,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';

export const MemberKYC: React.FC = () => {
  const { currentMember } = useApp();
  const [mockUploadedDoc, setMockUploadedDoc] = useState<string | null>(null);

  const documents = [
    {
      id: 'doc-aadhaar',
      name: 'Government Identity Proof (Aadhaar / PAN)',
      type: 'Aadhaar Card (UIDAI)',
      number: 'XXXX-XXXX-4421',
      status: 'Verified',
      uploadedDate: '14 Jan 2024',
      fileName: 'aadhaar_card_rahul_verified.pdf'
    },
    {
      id: 'doc-pan',
      name: 'Tax Compliance Document',
      type: 'Permanent Account Number (PAN)',
      number: 'APQRS5541L',
      status: 'Verified',
      uploadedDate: '14 Jan 2024',
      fileName: 'pan_card_front_scan.pdf'
    },
    {
      id: 'doc-bank',
      name: 'Bank Payout Proof',
      type: 'Bank Statement / Cancelled Cheque',
      number: 'HDFC Bank ••••4891',
      status: 'Verified',
      uploadedDate: '14 Jan 2024',
      fileName: 'hdfc_cancelled_cheque.pdf'
    }
  ];

  const handleMockUpload = (docName: string) => {
    setMockUploadedDoc(docName);
    setTimeout(() => setMockUploadedDoc(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">KYC & Compliance Verification</h2>
        <p className="text-xs text-slate-500 mt-1">
          Government ID and bank account verification required for payout eligibility.
        </p>
      </div>

      {mockUploadedDoc && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            Mock document upload received for <strong>{mockUploadedDoc}</strong>. Marked for compliance queue.
          </span>
        </div>
      )}

      {/* KYC Status Overview Banner */}
      <div className="card-clean p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/30 border-emerald-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">KYC Status: Fully Verified</h3>
              <StatusBadge status="Approved" size="sm" />
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Verified by Officer Rajesh V. on 14 Jan 2024. Your account has uncapped wallet withdrawals enabled.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded bg-white border border-emerald-200 text-emerald-800 font-semibold self-start sm:self-auto">
          Compliance Level: Tier 1 Passed
        </span>
      </div>

      {/* Document Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">Submitted Proof of Record</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documents.map(doc => (
            <div key={doc.id} className="card-clean p-4 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Document
                  </span>
                  <StatusBadge status="Approved" size="sm" />
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug">{doc.name}</h4>
                <p className="text-xs font-mono font-medium text-blue-600 mt-1">{doc.number}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Type: {doc.type}</p>

                <div className="mt-3 p-2 rounded bg-slate-50 border border-slate-100 flex items-center gap-2 text-[11px] text-slate-600">
                  <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{doc.fileName}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified {doc.uploadedDate}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Valid
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Upload Interaction Area */}
      <div className="card-clean p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">Upload Additional Document (Mock Demo)</h3>
        </div>

        <p className="text-xs text-slate-500">
          In case of bank account changes or address revisions, submit a document scan below:
        </p>

        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-slate-50/50">
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-800">
            Drag and drop bank passbook or updated ID proof here
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Supported formats: PDF, JPG, PNG (Max 5MB per document)
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleMockUpload('Updated Bank Statement')}
              className="px-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              Simulate Upload: Bank Passbook
            </button>
            <button
              onClick={() => handleMockUpload('Passport NRI Proof')}
              className="px-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              Simulate Upload: Passport Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
