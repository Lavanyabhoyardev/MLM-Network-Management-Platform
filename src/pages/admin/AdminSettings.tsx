import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Percent,
  Calendar,
  Wallet,
  ArrowUpRight,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { BannerNotice } from '../../components/BannerNotice';
import { StatusBadge } from '../../components/StatusBadge';

export const AdminSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'general' | 'packages' | 'commissions' | 'weekly' | 'monthly' | 'withdrawals' | 'payouts'
  >('commissions');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const sections = [
    { id: 'general', label: 'General System', icon: Settings },
    { id: 'packages', label: 'Packages (4 Tiers)', icon: Shield },
    { id: 'commissions', label: 'Commission Rules', icon: Percent, badge: 'Pending Approval' },
    { id: 'weekly', label: 'Weekly Bonus', icon: Calendar },
    { id: 'monthly', label: 'Monthly Bonus', icon: Calendar, badge: 'TBD' },
    { id: 'withdrawals', label: 'Withdrawal Rules', icon: ArrowUpRight },
    { id: 'payouts', label: 'Payout Gateways', icon: Wallet }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">System & Policy Configuration</h2>
        <p className="text-xs text-slate-500 mt-1">
          Define global platform parameters, financial guardrails, and compensation schedules.
        </p>
      </div>

      <BannerNotice
        type="warning"
        title="Unconfirmed Mathematical Formulas"
        message="Compensation mathematics and payout rules are marked as 'Pending Client Configuration'. Changes made in this demo are recorded in local prototype state."
      />

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Configuration preferences updated locally.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="card-clean p-2 lg:col-span-1 space-y-1">
          {sections.map(sec => {
            const Icon = sec.icon;
            const isSelected = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`w-full flex items-center justify-between p-2.5 rounded-md text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{sec.label}</span>
                </div>
                {sec.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {sec.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Section Forms */}
        <div className="card-clean p-6 lg:col-span-3">
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {/* COMMISSION RULES SECTION */}
            {activeSection === 'commissions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Multi-Level Commission Matrix</h3>
                    <p className="text-slate-500">Tier compensation distributions</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                    Pending Client Configuration
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Basic Package Max Depth:
                      </label>
                      <input
                        type="text"
                        disabled
                        value="2 Levels (Fixed by specification)"
                        className="w-full p-2 rounded border border-slate-200 bg-slate-100 text-slate-600 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Standard/Premium/Pro Max Depth:
                      </label>
                      <input
                        type="text"
                        disabled
                        value="5 Levels (Fixed by specification)"
                        className="w-full p-2 rounded border border-slate-200 bg-slate-100 text-slate-600 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <span className="font-semibold text-slate-900 block">
                      Working Draft Percentage Allocation:
                    </span>
                    <div className="grid grid-cols-5 gap-2 text-center">
                      <div className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400 block">Level 1 (Direct)</span>
                        <input
                          type="text"
                          defaultValue="50.00%"
                          className="w-full text-center font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                      <div className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400 block">Level 2</span>
                        <input
                          type="text"
                          defaultValue="25.00%"
                          className="w-full text-center font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                      <div className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400 block">Level 3</span>
                        <input
                          type="text"
                          defaultValue="12.50%"
                          className="w-full text-center font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                      <div className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400 block">Level 4</span>
                        <input
                          type="text"
                          defaultValue="6.25%"
                          className="w-full text-center font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                      <div className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400 block">Level 5</span>
                        <input
                          type="text"
                          defaultValue="3.125%"
                          className="w-full text-center font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Status: <em>"Pending Client Approval"</em> — rates remain provisional until formal client meeting.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* MONTHLY BONUS SECTION */}
            {activeSection === 'monthly' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Monthly Performance Bonus Engine</h3>
                    <p className="text-slate-500">Qualification thresholds and pool formulas</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                    Client Approval Required
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Monthly Target Benchmark:</label>
                    <input
                      type="text"
                      defaultValue="₹30,000"
                      className="w-full p-2 rounded border border-slate-200 font-mono font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Pool Percentage Allocation:</label>
                    <input
                      type="text"
                      placeholder="Pending confirmation (e.g. 3%)"
                      className="w-full p-2 rounded border border-amber-300 bg-amber-50/30 text-amber-900 placeholder:text-amber-700/60"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-amber-900 leading-relaxed">
                  <strong>Notice:</strong> As explicitly specified in the business requirements document, the exact monthly formula is awaiting client confirmation. No unapproved formula has been implemented into the system core.
                </div>
              </div>
            )}

            {/* GENERAL SECTION */}
            {activeSection === 'general' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  General Platform Parameters
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Platform Brand Name:</label>
                    <input
                      type="text"
                      defaultValue="ApexMLM Management Suite"
                      className="w-full p-2 rounded border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Currency Code & Symbol:</label>
                    <input
                      type="text"
                      defaultValue="INR (₹)"
                      disabled
                      className="w-full p-2 rounded border border-slate-200 bg-slate-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PACKAGES SECTION */}
            {activeSection === 'packages' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Package Tier Architecture
                </h3>
                <div className="p-3 bg-blue-50/60 rounded border border-blue-200 text-blue-900">
                  Platform strictly locked to four packages: <strong>Basic (₹3,000)</strong>, <strong>Standard (₹5,000)</strong>, <strong>Premium (₹11,000)</strong>, and <strong>Pro (₹18,600)</strong>. Creation of a fifth package is strictly disallowed by business rules.
                </div>
              </div>
            )}

            {/* WEEKLY BONUS SECTION */}
            {activeSection === 'weekly' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Weekly Bonus Working Logic
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Weekly Target:</label>
                    <input
                      type="text"
                      defaultValue="₹20,000+"
                      className="w-full p-2 rounded border border-slate-200 font-mono font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Bonus Rate:</label>
                    <input
                      type="text"
                      defaultValue="5%"
                      className="w-full p-2 rounded border border-slate-200 font-mono font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Settlement Cycle:</label>
                    <input
                      type="text"
                      defaultValue="Every Sunday Midnight"
                      className="w-full p-2 rounded border border-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* WITHDRAWAL RULES */}
            {activeSection === 'withdrawals' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Withdrawal Limits & Timing
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Minimum Withdrawal:</label>
                    <input
                      type="text"
                      defaultValue="₹1,000"
                      className="w-full p-2 rounded border border-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Maximum Daily Limit:</label>
                    <input
                      type="text"
                      defaultValue="₹1,00,000"
                      className="w-full p-2 rounded border border-slate-200 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PAYOUT GATEWAYS */}
            {activeSection === 'payouts' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Payout Gateways & Rails
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-900 block">IMPS Bank Transfer</span>
                      <span className="text-slate-500 text-[11px]">Instant settlement rail</span>
                    </div>
                    <StatusBadge status="Active" />
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-900 block">UPI Direct Handle</span>
                      <span className="text-slate-500 text-[11px]">Zero-fee UPI VPA settlement</span>
                    </div>
                    <StatusBadge status="Active" />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-sm transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Setting Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
