import React, { useState } from 'react';
import { Package, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PACKAGES } from '../../mockData/packages';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';

export const MemberPackage: React.FC = () => {
  const { currentMember } = useApp();
  const [selectedUpgrade, setSelectedUpgrade] = useState<string | null>(null);

  const currentPkgData =
    PACKAGES.find(p => p.name === currentMember.packageName) || PACKAGES[2];

  const handleUpgradeClick = (pkgName: string) => {
    setSelectedUpgrade(pkgName);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Package & Tier Curriculum</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review your enrolled educational bundle, commission depth entitlements, and upgrade options.
        </p>
      </div>

      {/* Current Active Package Card */}
      <div className="card-clean p-6 bg-gradient-to-r from-blue-50/60 via-white to-slate-50 border-blue-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Current Active Package
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">{currentPkgData.name} Package</h3>
            <p className="text-xs text-slate-600 mt-0.5">{currentPkgData.description}</p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-3xl font-extrabold font-mono text-blue-700 block">
              {currentPkgData.formattedPrice}
            </span>
            <div className="flex items-center gap-2 mt-1 sm:justify-end">
              <span className="text-xs font-medium text-slate-600">Status:</span>
              <StatusBadge status="Active" size="sm" />
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Curriculum & Course Access
            </h4>
            <div className="space-y-2">
              {currentPkgData.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Compensation Rights
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Commission Depth:</span>
                <span className="font-bold text-slate-900">5 Full Earning Levels</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Weekly Bonus Pool:</span>
                <span className="font-semibold text-emerald-600">Qualified Eligible</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Leadership Bonus:</span>
                <span className="font-semibold text-emerald-600">Qualified Eligible</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Direct Sponsoring:</span>
                <span className="font-semibold text-blue-600">Uncapped Capacity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Comparison / Upgrade Section (Strictly 4 Packages) */}
      <div className="space-y-4 pt-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Package Upgrade Comparison</h3>
          <p className="text-xs text-slate-500">
            Compare syllabus depth and compensation eligibility across the four official system tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {PACKAGES.map(pkg => {
            const isCurrent = pkg.name === currentMember.packageName;
            return (
              <div
                key={pkg.id}
                className={`card-clean p-4 flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/10'
                    : 'hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{pkg.name}</span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-xl font-bold font-mono text-slate-900">{pkg.formattedPrice}</p>

                  <div className="mt-2 py-1 px-2 rounded bg-slate-100 text-[11px] font-medium text-slate-700 text-center">
                    {pkg.earningDepth} Earning Levels
                  </div>

                  <ul className="mt-4 space-y-2 text-[11px] text-slate-600">
                    {pkg.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-1.5 px-3 rounded bg-slate-100 text-slate-400 text-xs font-medium cursor-not-allowed text-center"
                    >
                      Active Tier
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgradeClick(pkg.name)}
                      className="w-full py-1.5 px-3 rounded bg-white hover:bg-slate-50 border border-slate-200 text-blue-600 text-xs font-semibold shadow-sm transition-colors text-center"
                    >
                      {pkg.price > currentPkgData.price ? 'Upgrade Tier' : 'View Details'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upgrade CTA Modal (Frontend only, no payment integration) */}
      <Modal
        isOpen={!!selectedUpgrade}
        onClose={() => setSelectedUpgrade(null)}
        title={`Upgrade to ${selectedUpgrade} Package`}
        subtitle="Frontend Demo Presentation Notice"
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-900 leading-relaxed">
            <strong>Client Presentation Mode:</strong> In production, selecting an upgrade initiates an online payment gateway or wallet debit. For this UI/UX demo, payment processing is intentionally omitted per requirements.
          </div>

          <p className="text-slate-600">
            Selected Tier: <strong>{selectedUpgrade}</strong>
            <br />
            Upgrading immediately elevates your compensation depth and unlocks higher course syllabus modules.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setSelectedUpgrade(null)}
              className="w-full py-2 rounded bg-slate-900 text-white font-medium hover:bg-slate-800"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
