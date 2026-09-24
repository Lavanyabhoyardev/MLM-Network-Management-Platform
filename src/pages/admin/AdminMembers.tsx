import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  User,
  Shield,
  Layers,
  Wallet,
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';
import { MEMBERS, MemberData } from '../../mockData/members';
import { StatusBadge } from '../../components/StatusBadge';
import { Drawer } from '../../components/Drawer';

export const AdminMembers: React.FC = () => {
  const [membersList] = useState<MemberData[]>(MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [packageFilter, setPackageFilter] = useState('All');
  const [kycFilter, setKycFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);

  const itemsPerPage = 8;

  // Filtering
  const filteredMembers = membersList.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.referralCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sponsorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPackage = packageFilter === 'All' || m.packageName === packageFilter;
    const matchesKYC = kycFilter === 'All' || m.kycStatus === kycFilter;
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;

    return matchesSearch && matchesPackage && matchesKYC && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Member ID,Name,Email,Package,Sponsor,Referral Code,Network Size,Wallet,KYC,Status,Joined']
        .concat(
          filteredMembers.map(
            m =>
              `${m.memberId},${m.name},${m.email},${m.packageName},${m.sponsorName},${m.referralCode},${m.networkSize},${m.walletBalance},${m.kycStatus},${m.status},${m.joinedDate}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `members_export_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Member Directory</h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage distributor network, verify placement lines, and review account records.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-clean p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, ID, code, sponsor..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Package Filter */}
          <div>
            <select
              value={packageFilter}
              onChange={e => {
                setPackageFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Packages</option>
              <option value="Basic">Basic (₹3,000)</option>
              <option value="Standard">Standard (₹5,000)</option>
              <option value="Premium">Premium (₹11,000)</option>
              <option value="Pro">Pro (₹18,600)</option>
            </select>
          </div>

          {/* KYC Filter */}
          <div>
            <select
              value={kycFilter}
              onChange={e => {
                setKycFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All KYC Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Account Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Account Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Showing {filteredMembers.length} members matching filters</span>
          {(searchQuery || packageFilter !== 'All' || kycFilter !== 'All' || statusFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setPackageFilter('All');
                setKycFilter('All');
                setStatusFilter('All');
                setCurrentPage(1);
              }}
              className="text-blue-600 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Members Table */}
      <div className="card-clean overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Member</th>
                <th className="py-3 px-4 font-medium">Member ID</th>
                <th className="py-3 px-4 font-medium">Package</th>
                <th className="py-3 px-4 font-medium">Sponsor</th>
                <th className="py-3 px-4 font-medium">Referral Code</th>
                <th className="py-3 px-4 font-medium">Network Size</th>
                <th className="py-3 px-4 font-medium">Wallet</th>
                <th className="py-3 px-4 font-medium">KYC</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Joined</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedMembers.map(member => (
                <tr
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="table-row-hover cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center border border-slate-200">
                        {member.name.substring(0, 1)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block">{member.name}</span>
                        <span className="text-[11px] text-slate-400">{member.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">
                    {member.memberId}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {member.packageName}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {member.sponsorName}
                  </td>
                  <td className="py-3 px-4 font-mono text-blue-600 font-medium">
                    {member.referralCode}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <span className="font-medium">{member.networkSize}</span>
                    <span className="text-[11px] text-slate-400 block">
                      ({member.directReferrals} direct)
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-900">
                    {member.formattedWallet}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={member.kycStatus} />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={member.status} />
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {member.joinedDate}
                  </td>
                  <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
                      title="Inspect Member Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        <div className="px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Member Details Drawer */}
      <Drawer
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title="Member Dossier"
        subtitle={`Member ID: ${selectedMember?.memberId}`}
        width="lg"
      >
        {selectedMember && (
          <div className="space-y-6">
            {/* Header Snapshot */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 font-bold text-xl flex items-center justify-center border border-blue-200">
                {selectedMember.name.substring(0, 1)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-slate-900">{selectedMember.name}</h4>
                  <StatusBadge status={selectedMember.status} />
                </div>
                <p className="text-xs text-slate-500">{selectedMember.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium border border-blue-200">
                    {selectedMember.packageName} Tier
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Ref Code: <strong className="text-slate-800">{selectedMember.referralCode}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Financial & Network KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Wallet Balance</span>
                <span className="text-base font-bold text-slate-900">{selectedMember.formattedWallet}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Total Earnings</span>
                <span className="text-base font-bold text-slate-900">{selectedMember.formattedEarnings}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Direct Referrals</span>
                <span className="text-base font-bold text-slate-900">{selectedMember.directReferrals}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Total Network</span>
                <span className="text-base font-bold text-slate-900">{selectedMember.networkSize}</span>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="space-y-3 text-xs">
              <h5 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Placement & Contact Particulars
              </h5>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Sponsor
                </span>
                <span className="font-medium text-slate-900">{selectedMember.sponsorName}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </span>
                <span className="font-medium text-slate-900">{selectedMember.phone}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> City & State
                </span>
                <span className="font-medium text-slate-900">
                  {selectedMember.city}, {selectedMember.state}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Onboarding Date
                </span>
                <span className="font-medium text-slate-900">{selectedMember.joinedDate}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> KYC Compliance
                </span>
                <StatusBadge status={selectedMember.kycStatus} />
              </div>
            </div>

            {/* Recent Activity Mini-Ledger */}
            <div>
              <h5 className="font-semibold text-slate-900 text-xs mb-2">Recent Wallet Actions</h5>
              <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                <div className="p-2.5 bg-slate-50 text-slate-500 border-b border-slate-200 flex justify-between font-medium">
                  <span>Type</span>
                  <span>Amount</span>
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="p-2.5 flex justify-between">
                    <div>
                      <span className="font-medium text-slate-800 block">Direct Referral Commission</span>
                      <span className="text-[10px] text-slate-400">18 Jun 2024</span>
                    </div>
                    <span className="font-semibold text-emerald-600">+₹2,500</span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <div>
                      <span className="font-medium text-slate-800 block">Weekly Bonus Share</span>
                      <span className="text-[10px] text-slate-400">15 Jun 2024</span>
                    </div>
                    <span className="font-semibold text-emerald-600">+₹1,250</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedMember(null)}
                className="w-full py-2 rounded-md bg-slate-100 text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
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
