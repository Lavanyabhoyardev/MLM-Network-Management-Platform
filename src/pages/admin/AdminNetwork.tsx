import React, { useState } from 'react';
import { GitFork, Users, Layers, Shield, Search, ArrowRightLeft } from 'lucide-react';
import { NetworkTree } from '../../components/NetworkTree';
import { ADMIN_NETWORK_ROOT, NETWORK_TREE_DATA, NetworkNode } from '../../mockData/network';

export const AdminNetwork: React.FC = () => {
  const [activeRoot, setActiveRoot] = useState<'corporate' | 'rahul'>('corporate');

  const rootData = activeRoot === 'corporate' ? ADMIN_NETWORK_ROOT : NETWORK_TREE_DATA;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Multi-Branch Network Matrix</h2>
          <p className="text-xs text-slate-500 mt-1">
            Analyze lineage placement, direct referral capacity, and earning depth across 5 vertical tiers.
          </p>
        </div>

        {/* Root Selector */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
          <span className="text-xs text-slate-500 pl-2">Root Node:</span>
          <button
            onClick={() => setActiveRoot('corporate')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeRoot === 'corporate'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Corporate Root (Genesis)
          </button>
          <button
            onClick={() => setActiveRoot('rahul')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeRoot === 'rahul'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Rahul Sharma (Branch #10482)
          </button>
        </div>
      </div>

      {/* Info Notice on Compensation Matrix vs Direct Limits */}
      <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 leading-relaxed">
        <strong>Direct Referrals vs. Earning Depth:</strong> Direct referrals on this platform are completely uncapped. Any member can sponsor an unlimited number of Level 1 frontline partners. The package tier (Basic: 2 levels, Standard/Premium/Pro: 5 levels) determines the vertical depth from which overriding secondary level commissions are earned.
      </div>

      {/* Network Tree */}
      <NetworkTree
        data={rootData}
        title={activeRoot === 'corporate' ? 'System Lineage Matrix (All Branches)' : 'Sublineage Tree: Rahul Sharma'}
        allowSearch={true}
      />
    </div>
  );
};
