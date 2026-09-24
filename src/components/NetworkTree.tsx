import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  User,
  Shield,
  Layers,
  Search,
  ExternalLink,
  Users,
  Wallet
} from 'lucide-react';
import { NetworkNode } from '../mockData/network';
import { StatusBadge } from './StatusBadge';
import { Drawer } from './Drawer';

interface NetworkTreeProps {
  data: NetworkNode;
  title?: string;
  allowSearch?: boolean;
}

export const NetworkTree: React.FC<NetworkTreeProps> = ({
  data,
  title = 'Multi-Branch Network Hierarchy',
  allowSearch = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    [data.id]: true,
    'mem-10512': true,
    'mem-10534': true
  });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getPackageBadgeColor = (pkg: string) => {
    switch (pkg) {
      case 'Pro':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Premium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Standard':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const renderNode = (node: NetworkNode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = !!expandedNodes[node.id];
    const isMatchingSearch =
      searchQuery.trim() === '' ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.packageName.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      <div key={node.id} className="relative">
        <div
          onClick={() => setSelectedNode(node)}
          className={`group flex items-center justify-between p-3 my-1.5 rounded-lg border transition-all cursor-pointer ${
            isMatchingSearch
              ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-sm'
              : 'bg-slate-50/50 border-slate-100 opacity-40'
          }`}
          style={{ marginLeft: `${Math.min(depth * 28, 140)}px` }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Level indicator / expand toggle */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {hasChildren ? (
                <button
                  type="button"
                  onClick={e => toggleExpand(node.id, e)}
                  className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                  title={isExpanded ? 'Collapse branch' : 'Expand branch'}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <span className="w-6 h-6 flex items-center justify-center text-slate-300">•</span>
              )}

              <span
                className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border ${
                  depth === 0
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {depth === 0 ? 'ROOT' : `L${node.level}`}
              </span>
            </div>

            {/* Avatar & Identifiers */}
            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs flex items-center justify-center border border-slate-200 flex-shrink-0">
              {node.name.substring(0, 1)}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-900 truncate">{node.name}</span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  {node.memberId}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-slate-400" />
                  {node.directReferralsCount} direct
                </span>
                <span>•</span>
                <span>{node.totalNetworkCount} team</span>
              </div>
            </div>
          </div>

          {/* Right badges & Actions */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span
              className={`text-xs px-2 py-0.5 rounded border font-medium ${getPackageBadgeColor(
                node.packageName
              )}`}
            >
              {node.packageName}
            </span>

            <StatusBadge status={node.status} size="sm" />

            <button
              onClick={e => {
                e.stopPropagation();
                setSelectedNode(node);
              }}
              className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Inspect Member Details"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Children Render */}
        {hasChildren && isExpanded && (
          <div className="relative pl-3 border-l-2 border-slate-200 ml-4 sm:ml-6 my-1">
            {node.children!.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click on any branch to inspect downline volume, package tiers, and earning depth.
          </p>
        </div>

        {allowSearch && (
          <div className="relative sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search member, ID or tier..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
            />
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 px-1 text-xs text-slate-600">
        <span className="font-medium text-slate-700">Levels:</span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-600" /> L1 Direct
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-600" /> L2 Secondary
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> L3 Tier
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-600" /> L4 Tier
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-indigo-600" /> L5 Deep
        </span>
        <span className="text-slate-400 ml-auto text-[11px]">
          Note: Direct referral capacity is uncapped; package tier determines payout depth.
        </span>
      </div>

      {/* Tree container */}
      <div className="bg-slate-50/60 p-4 rounded-lg border border-slate-200 overflow-x-auto min-h-[300px]">
        {renderNode(data, 0)}
      </div>

      {/* Member Details Drawer */}
      <Drawer
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        title="Member Network Record"
        subtitle={`Member ID: ${selectedNode?.memberId}`}
        width="md"
      >
        {selectedNode && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-semibold text-lg flex items-center justify-center">
                {selectedNode.name.substring(0, 1)}
              </div>
              <div>
                <h4 className="text-base font-semibold text-slate-900">{selectedNode.name}</h4>
                <p className="text-xs text-slate-500">
                  {selectedNode.memberId} • Joined {selectedNode.joinedDate}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded border font-medium ${getPackageBadgeColor(
                      selectedNode.packageName
                    )}`}
                  >
                    {selectedNode.packageName} Package (₹{selectedNode.packagePrice.toLocaleString('en-IN')})
                  </span>
                  <StatusBadge status={selectedNode.status} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Direct Referrals
                </span>
                <p className="text-xl font-semibold text-slate-900 mt-1">
                  {selectedNode.directReferralsCount}
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> Total Team Size
                </span>
                <p className="text-xl font-semibold text-slate-900 mt-1">
                  {selectedNode.totalNetworkCount}
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5" /> Wallet Balance
                </span>
                <p className="text-xl font-semibold text-slate-900 mt-1">
                  {selectedNode.walletBalance}
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Total Earnings
                </span>
                <p className="text-xl font-semibold text-slate-900 mt-1">
                  {selectedNode.totalEarnings}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Sponsor</span>
                <span className="font-medium text-slate-900">{selectedNode.sponsorName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Placement Level</span>
                <span className="font-medium text-slate-900">
                  {selectedNode.level === 0 ? 'Genesis (Level 0)' : `Level ${selectedNode.level}`}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Earning Eligibility Depth</span>
                <span className="font-medium text-slate-900">
                  {selectedNode.packageName === 'Basic' ? '2 Levels' : '5 Levels'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedNode(null)}
                className="w-full py-2 px-4 rounded-md border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
