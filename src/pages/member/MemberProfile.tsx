import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Calendar, Edit3, CheckCircle2, Copy } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';

export const MemberProfile: React.FC = () => {
  const { currentMember, updateMemberProfile } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(currentMember.name);
  const [email, setEmail] = useState(currentMember.email);
  const [phone, setPhone] = useState(currentMember.phone);
  const [city, setCity] = useState(currentMember.city);
  const [state, setState] = useState(currentMember.state);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMemberProfile({ name, email, phone, city, state });
    setIsEditModalOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentMember.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Distributor Profile & Account</h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage your personal credentials, sponsor affiliation, and payout contact particulars.
          </p>
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile Details</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes updated successfully.</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="card-clean p-6 space-y-6">
        {/* Avatar & Identifiers */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 font-bold text-3xl flex items-center justify-center border-2 border-blue-200 flex-shrink-0">
            {currentMember.name.substring(0, 1)}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-lg font-bold text-slate-900">{currentMember.name}</h3>
              <StatusBadge status={currentMember.status} size="sm" />
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {currentMember.packageName} Tier
              </span>
            </div>

            <p className="text-xs font-mono text-slate-500">
              Distributor ID: <strong>{currentMember.memberId}</strong> • Member since {currentMember.joinedDate}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500">Referral Code:</span>
              <button
                onClick={handleCopyCode}
                className="font-mono font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors flex items-center gap-1"
                title="Click to copy referral code"
              >
                <span>{currentMember.referralCode}</span>
                <Copy className="w-3 h-3" />
              </button>
              {copiedCode && <span className="text-[11px] text-emerald-600 font-medium">Copied!</span>}
            </div>
          </div>
        </div>

        {/* Detailed Particulars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Contact Particulars */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] text-slate-400">
              Personal & Contact Information
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Primary Email</span>
                  <span className="font-medium text-slate-900">{currentMember.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Registered Mobile</span>
                  <span className="font-medium text-slate-900">{currentMember.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Location</span>
                  <span className="font-medium text-slate-900">
                    {currentMember.city}, {currentMember.state}, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Network & Compliance */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] text-slate-400">
              Sponsorship & Platform Status
            </h4>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 block text-[11px]">Direct Sponsor</span>
                <span className="font-semibold text-slate-900 block">{currentMember.sponsorName}</span>
                <span className="font-mono text-slate-400 text-[10px]">{currentMember.sponsorId}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px]">KYC Verification Status</span>
                  <span className="font-medium text-slate-900">Government Verified</span>
                </div>
                <StatusBadge status={currentMember.kycStatus} />
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px]">Comp Plan Standing</span>
                  <span className="font-medium text-slate-900">5 Levels Active Payout</span>
                </div>
                <span className="text-xs font-semibold text-emerald-700">Eligible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Personal Information"
        subtitle="Update your public profile and registered contact details."
        maxWidth="md"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Legal Name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-2 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mobile Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full p-2 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">City:</label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full p-2 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">State:</label>
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full p-2 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-sm"
            >
              Save Profile Details
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
