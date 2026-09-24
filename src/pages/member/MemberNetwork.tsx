import React, { useState } from 'react';
import { Users, UserCheck, Layers, GitFork } from 'lucide-react';
import { NETWORK_TREE_DATA } from '../../mockData/network';
import { NetworkTree } from '../../components/NetworkTree';
import { StatCard } from '../../components/StatCard';

export const MemberNetwork: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Downline Network Hierarchy</h2>
        <p className="text-xs text-slate-500 mt-1">
          Explore your multi-branch genealogy tree across 5 levels of earning depth.
        </p>
      </div>

      {/* Top 3 Member Network KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Network"
          value="126"
          subtext="Cumulative team size across 5 levels"
          icon={Layers}
        />
        <StatCard
          label="Direct Referrals"
          value="18"
          subtext="Frontline Level 1 partners (uncapped)"
          icon={Users}
        />
        <StatCard
          label="Active Members"
          value="104"
          subtext="82.5% active course participation"
          icon={UserCheck}
          className="border-emerald-200 bg-emerald-50/20"
        />
      </div>

      {/* Network Tree */}
      <NetworkTree
        data={NETWORK_TREE_DATA}
        title="Your Placement Genealogy (Downline Tree)"
        allowSearch={true}
      />
    </div>
  );
};
