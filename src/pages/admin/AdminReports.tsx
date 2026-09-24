import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, FileSpreadsheet, Layers, TrendingUp } from 'lucide-react';
import { REPORT_CATEGORIES, ReportCategory } from '../../mockData/reports';
import { StatCard } from '../../components/StatCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminReports: React.FC = () => {
  const [selectedReportId, setSelectedReportId] = useState(REPORT_CATEGORIES[0].id);
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [exportedToast, setExportedToast] = useState(false);

  const selectedCategory =
    REPORT_CATEGORIES.find(r => r.id === selectedReportId) || REPORT_CATEGORIES[0];

  // Dynamic sample data for visual report chart
  const sampleReportData = [
    { period: 'Week 1', count: 120, volume: 450000 },
    { period: 'Week 2', count: 185, volume: 680000 },
    { period: 'Week 3', count: 240, volume: 920000 },
    { period: 'Week 4', count: 310, volume: 1140000 }
  ];

  const handleExport = () => {
    setExportedToast(true);
    setTimeout(() => setExportedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Enterprise Financial & Operational Reports</h2>
          <p className="text-xs text-slate-500 mt-1">
            Generate compliant accounting summaries, downline depth analysis, and commission distribution statements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="text-xs px-3 py-2 rounded-md border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none"
          >
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Current Financial Year (FY24-25)</option>
          </select>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate & Export Report</span>
          </button>
        </div>
      </div>

      {exportedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
          <span>
            Export file generated for <strong>{selectedCategory.name}</strong> ({dateRange}). Downloading...
          </span>
          <span className="font-mono text-[11px]">CSV / XLSX</span>
        </div>
      )}

      {/* Main Container: Category Selector on left, Active Report on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category List */}
        <div className="card-clean p-4 lg:col-span-1 space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
            Available Modules ({REPORT_CATEGORIES.length})
          </h3>

          <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
            {REPORT_CATEGORIES.map(cat => {
              const isSelected = cat.id === selectedReportId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedReportId(cat.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <span className="block truncate">{cat.name}</span>
                    <span
                      className={`text-[10px] block truncate ${
                        isSelected ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {cat.summaryStat}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {cat.totalRecords.toLocaleString('en-IN')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Report Preview & Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Header Card */}
          <div className="card-clean p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Active Report
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">{selectedCategory.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedCategory.description}
                </p>
              </div>

              <div className="text-right sm:border-l sm:border-slate-100 sm:pl-4">
                <span className="text-[11px] text-slate-400 block">Total Database Rows</span>
                <span className="text-xl font-bold font-mono text-slate-900">
                  {selectedCategory.totalRecords.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Updated: {selectedCategory.lastGenerated}
                </span>
              </div>
            </div>

            {/* Quick Chart */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-700 mb-3">
                Distribution Trend across {dateRange}
              </h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sampleReportData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                    <Tooltip
                      formatter={(val: any) => [val.toLocaleString('en-IN'), 'Event Count / Volume']}
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Bar dataKey="volume" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sample Data Preview Table */}
          <div className="card-clean overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900">Sample Extract Preview (First 5 Rows)</span>
              <span className="text-[11px] text-slate-400">Read-only presentation</span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 font-medium">Record ID</th>
                  <th className="py-2.5 px-4 font-medium">Primary Entity</th>
                  <th className="py-2.5 px-4 font-medium">Classification</th>
                  <th className="py-2.5 px-4 font-medium">Volume</th>
                  <th className="py-2.5 px-4 font-medium text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                <tr>
                  <td className="py-2.5 px-4 text-slate-900">#REC-00192</td>
                  <td className="py-2.5 px-4 font-sans font-medium text-slate-800">Rahul Sharma</td>
                  <td className="py-2.5 px-4 font-sans text-slate-600">Premium Tier Payout</td>
                  <td className="py-2.5 px-4 text-emerald-600 font-bold">₹11,000</td>
                  <td className="py-2.5 px-4 text-right text-slate-400">18 Jun 14:32</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-900">#REC-00191</td>
                  <td className="py-2.5 px-4 font-sans font-medium text-slate-800">Sunil Verma</td>
                  <td className="py-2.5 px-4 font-sans text-slate-600">Pro Tier Allocation</td>
                  <td className="py-2.5 px-4 text-emerald-600 font-bold">₹18,600</td>
                  <td className="py-2.5 px-4 text-right text-slate-400">18 Jun 11:20</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-900">#REC-00190</td>
                  <td className="py-2.5 px-4 font-sans font-medium text-slate-800">Priya Patel</td>
                  <td className="py-2.5 px-4 font-sans text-slate-600">Standard Tier Level</td>
                  <td className="py-2.5 px-4 text-emerald-600 font-bold">₹5,000</td>
                  <td className="py-2.5 px-4 text-right text-slate-400">17 Jun 16:45</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
