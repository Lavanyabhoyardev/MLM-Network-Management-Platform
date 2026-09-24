import React, { useState } from 'react';
import { ClipboardList, Filter, Download, Search, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';

export const AdminAuditLogs: React.FC = () => {
  const { auditLogs } = useApp();
  const [filterModule, setFilterModule] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesModule = filterModule === 'All' || log.module === filterModule;
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.reference.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesModule && matchesSearch;
  });

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Timestamp,Admin,Role,Action,Module,Reference,Description,IP Address,Status']
        .concat(
          filteredLogs.map(
            l =>
              `"${l.timestamp}","${l.adminName}","${l.adminRole}","${l.action}","${l.module}","${l.reference}","${l.description}","${l.ipAddress}","${l.status}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `audit_logs_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Audit & Compliance Logs</h2>
          <p className="text-xs text-slate-500 mt-1">
            Immutable audit record of all administrative operations, KYC signoffs, bonus issuances, and payouts.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="card-clean p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search action, administrator, description, reference ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <div>
            <select
              value={filterModule}
              onChange={e => setFilterModule(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
            >
              <option value="All">All Modules</option>
              <option value="KYC">KYC</option>
              <option value="Bonus">Bonus</option>
              <option value="Withdrawals">Withdrawals</option>
              <option value="Packages">Packages</option>
              <option value="Commissions">Commissions</option>
              <option value="Members">Members</option>
              <option value="Settings">Settings</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Recorded Event Stream</h3>
            <p className="text-xs text-slate-500">Live system audit events</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{filteredLogs.length} Events</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Timestamp</th>
                <th className="py-3 px-4 font-medium">Administrator</th>
                <th className="py-3 px-4 font-medium">Action</th>
                <th className="py-3 px-4 font-medium">Module</th>
                <th className="py-3 px-4 font-medium">Reference</th>
                <th className="py-3 px-4 font-medium">Description</th>
                <th className="py-3 px-4 font-medium">Client Info</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="table-row-hover">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{log.adminName}</span>
                    <span className="text-[10px] text-slate-400">{log.adminRole}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">{log.action}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700">
                      {log.module}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{log.reference}</td>
                  <td className="py-3 px-4 text-slate-600 max-w-sm" title={log.description}>
                    {log.description}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[10px]">
                    <div>{log.ipAddress}</div>
                    <div className="truncate max-w-[120px]">{log.device}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={log.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
