import React, { useState } from 'react';
import { Package, Edit3, CheckCircle2, Shield, Layers, Users, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PackageData } from '../../mockData/packages';
import { StatusBadge } from '../../components/StatusBadge';
import { Drawer } from '../../components/Drawer';

export const AdminPackages: React.FC = () => {
  const { packages, updatePackage } = useApp();
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState<'Active' | 'Under Review'>('Active');
  const [savedNotification, setSavedNotification] = useState(false);

  const handleOpenEdit = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setEditDescription(pkg.description);
    setEditStatus(pkg.status);
    setSavedNotification(false);
  };

  const handleSavePackage = () => {
    if (!selectedPackage) return;
    updatePackage(selectedPackage.id, {
      description: editDescription,
      status: editStatus
    });
    setSavedNotification(true);
    setTimeout(() => {
      setSelectedPackage(null);
      setSavedNotification(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Digital Course Packages</h2>
        <p className="text-xs text-slate-500 mt-1">
          Defined package tiers qualifying distributors for active training curricula and commission depth.
        </p>
      </div>

      {/* Package Cards Grid (Strictly 4 Packages) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className="card-clean p-5 flex flex-col justify-between hover:border-blue-400 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Tier {pkg.earningDepth === 2 ? 'Starter' : 'Advanced'}
                </span>
                <StatusBadge status={pkg.status} size="sm" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
              <p className="text-2xl font-extrabold text-blue-600 mt-1 tracking-tight font-sans">
                {pkg.formattedPrice}
              </p>

              <div className="mt-3 py-2 px-2.5 bg-slate-50 rounded-md border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Earning Depth:</span>
                <span className="font-semibold text-slate-900">{pkg.earningDepth} Levels</span>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
                {pkg.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Enrolled Members:</span>
                  <span className="font-semibold text-slate-900">{pkg.membersCount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Gross Volume:</span>
                  <span className="font-semibold text-slate-900">{pkg.totalSales}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleOpenEdit(pkg)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-sm transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>Configure Package</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Package Detail / Edit Drawer */}
      <Drawer
        isOpen={!!selectedPackage}
        onClose={() => setSelectedPackage(null)}
        title="Package Settings & Curriculum"
        subtitle={`Tier: ${selectedPackage?.name} (${selectedPackage?.formattedPrice})`}
        width="md"
      >
        {selectedPackage && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">{selectedPackage.name} Bundle</h4>
                  <p className="text-xs text-blue-600 font-semibold">{selectedPackage.formattedPrice} Retail Price</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold">
                  {selectedPackage.earningDepth} Earning Levels
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Enrolled Members</span>
                  <span className="font-bold text-slate-800">{selectedPackage.membersCount.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Total Turnover</span>
                  <span className="font-bold text-slate-800">{selectedPackage.totalSales}</span>
                </div>
              </div>
            </div>

            {/* Included Curriculum Features */}
            <div>
              <h5 className="text-xs font-semibold text-slate-900 mb-2 uppercase tracking-wider">
                Digital Course Access Rights
              </h5>
              <div className="space-y-2">
                {selectedPackage.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 p-2 rounded bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Editable Description & Status */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Package Public Overview:
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  className="w-full text-xs p-2.5 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Package Availability Status:
                </label>
                <select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="Active">Active (Available for purchase & enrollments)</option>
                  <option value="Under Review">Under Review (Enrollments temporarily paused)</option>
                </select>
              </div>
            </div>

            {savedNotification && (
              <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Package configuration saved successfully.</span>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedPackage(null)}
                className="flex-1 py-2 px-3 rounded border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePackage}
                className="flex-1 py-2 px-3 rounded bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
