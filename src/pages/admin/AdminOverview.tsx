import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Package,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';

export const AdminOverview: React.FC = () => {
  const { packages, kycList, withdrawals } = useApp();
  const navigate = useNavigate();

  // Growth Chart Data
  const memberGrowthData = [
    { month: 'Jan', members: 4200, active: 3600 },
    { month: 'Feb', members: 5800, active: 4900 },
    { month: 'Mar', members: 7900, active: 6800 },
    { month: 'Apr', members: 9600, active: 8200 },
    { month: 'May', members: 11400, active: 9750 },
    { month: 'Jun', members: 12842, active: 10964 }
  ];

  // Package Sales Data
  const packageSalesData = [
    { name: 'Basic (₹3k)', sales: 1236, revenue: '₹12.36L' },
    { name: 'Standard (₹5k)', sales: 2715, revenue: '₹27.15L' },
    { name: 'Premium (₹11k)', sales: 2651, revenue: '₹26.51L' },
    { name: 'Pro (₹18.6k)', sales: 1640, revenue: '₹16.40L' }
  ];

  // Income Distribution Donut Data
  const incomeDistributionData = [
    { name: 'Active Income (Direct)', value: 45, color: '#2563eb' },
    { name: 'Passive Income (L2-L5)', value: 28, color: '#10b981' },
    { name: 'Weekly Bonus', value: 12, color: '#f59e0b' },
    { name: 'Monthly Bonus', value: 10, color: '#8b5cf6' },
    { name: 'Manual Bonus', value: 5, color: '#ec4899' }
  ];

  const recentActivities = [
    {
      id: 'act-1',
      title: 'KYC verified & approved',
      desc: 'Rahul Sharma (MEM-10482) identity verified by Officer Rajesh V.',
      time: '12 mins ago',
      badge: 'KYC',
      type: 'success'
    },
    {
      id: 'act-2',
      title: 'New Member Registered',
      desc: 'Tanvi Shinde joined via referral code KNAIR (Standard tier)',
      time: '34 mins ago',
      badge: 'Network',
      type: 'info'
    },
    {
      id: 'act-3',
      title: 'Package Upgraded to Pro',
      desc: 'Rohan Kapoor upgraded from Standard to Pro (₹18,600)',
      time: '1 hour ago',
      badge: 'Package',
      type: 'info'
    },
    {
      id: 'act-4',
      title: 'Withdrawal Requested',
      desc: 'Ananya Rao requested ₹8,500 via UPI gateway',
      time: '2 hours ago',
      badge: 'Payout',
      type: 'warning'
    },
    {
      id: 'act-5',
      title: 'Manual Bonus Credited',
      desc: '₹5,000 executive leadership bonus credited to Rahul Sharma',
      time: '4 hours ago',
      badge: 'Bonus',
      type: 'success'
    },
    {
      id: 'act-6',
      title: 'Weekly Bonus Pool Settled',
      desc: 'Week 24 settled at ₹2,500 pool across 2 qualifying distributors',
      time: '1 day ago',
      badge: 'Bonus',
      type: 'neutral'
    }
  ];

  const pendingKYC = kycList.filter(k => k.status === 'Pending').length;
  const pendingWith = withdrawals.filter(w => w.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
        <p className="text-xs text-slate-500 mt-1">
          Overview of members, network activity and financial operations.
        </p>
      </div>

      {/* Top KPI Section (6 KPI cards with clear hierarchy) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          label="Total Members"
          value="12,842"
          subtext="+842 this month"
          trend={{ value: '7.2%', isPositive: true }}
          icon={Users}
        />
        <StatCard
          label="Active Members"
          value="10,964"
          subtext="85.3% engagement"
          trend={{ value: '4.1%', isPositive: true }}
          icon={UserCheck}
        />
        <StatCard
          label="Total Package Sales"
          value="₹48.6L"
          subtext="Across 4 tiers"
          trend={{ value: '12.8%', isPositive: true }}
          icon={Package}
        />
        <StatCard
          label="Pending KYC"
          value={pendingKYC > 0 ? `${pendingKYC}` : '126'}
          subtext="Needs compliance"
          icon={ShieldAlert}
          className="border-amber-200 bg-amber-50/20"
        />
        <StatCard
          label="Pending Withdrawals"
          value="₹2.84L"
          subtext={`${pendingWith} requests awaiting`}
          icon={ArrowUpRight}
          className="border-amber-200 bg-amber-50/20"
        />
        <StatCard
          label="Total Commission"
          value="₹18.72L"
          subtext="38.5% of revenue"
          trend={{ value: '9.4%', isPositive: true }}
          icon={TrendingUp}
        />
      </div>

      {/* Main Analytics Section: 3 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member Growth */}
        <div className="card-clean p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Member Network Growth</h3>
              <p className="text-xs text-slate-500">Total vs Active registrations over the last 6 months</p>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Last 6 Months
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memberGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="members" name="Total Members" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="active" name="Active Members" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income Distribution */}
        <div className="card-clean p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Income Distribution</h3>
            <p className="text-xs text-slate-500">Breakdown of total commission and bonus payouts</p>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {incomeDistributionData.map(entry => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 mt-2 text-xs">
            {incomeDistributionData.map(item => (
              <div key={item.name} className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-semibold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Sales Bar Chart */}
      <div className="card-clean p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Package Revenue Distribution</h3>
            <p className="text-xs text-slate-500">Units sold and total transaction turnover by bundle tier</p>
          </div>
          <span className="text-xs text-slate-400">Total Volume: ₹82.42L</span>
        </div>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={packageSalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <Tooltip
                formatter={(value: any, name: string, item: any) => [`${value} Units (${item.payload.revenue})`, 'Volume']}
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="sales" name="Units Sold" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Actions & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Actions Cards */}
        <div className="card-clean p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Pending Actions</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
              Action Required
            </span>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => navigate('/admin/kyc')}
              className="p-3 rounded-lg border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">KYC Approvals</span>
                <span className="text-xs font-bold text-amber-700">{pendingKYC} Pending</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                New identity submissions awaiting verification from compliance team.
              </p>
            </div>

            <div
              onClick={() => navigate('/admin/withdrawals')}
              className="p-3 rounded-lg border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Withdrawal Approvals</span>
                <span className="text-xs font-bold text-amber-700">{pendingWith} Requests</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Payout batch queued for verification before bank gateway dispatch.
              </p>
            </div>

            <div
              onClick={() => navigate('/admin/packages')}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Package Configuration</span>
                <span className="text-xs text-blue-600 font-medium">4 Tiers Active</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Review syllabus descriptions, price points, and level depth allowances.
              </p>
            </div>

            <div
              onClick={() => navigate('/admin/commissions')}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Bonus & Commission Rules</span>
                <span className="text-xs text-amber-600 font-medium">Draft Matrix</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Percentages marked illustrative pending executive client signoff.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="card-clean p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Recent Platform Activity</h3>
            <button
              onClick={() => navigate('/admin/audit-logs')}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              Audit Log <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivities.map(act => (
              <div key={act.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1 rounded-full bg-slate-100 text-slate-600">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{act.title}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                        {act.badge}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{act.desc}</p>
                  </div>
                </div>
                <span className="text-slate-400 whitespace-nowrap text-[11px]">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Performance Table */}
      <div className="card-clean overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Package Performance Overview</h3>
            <p className="text-xs text-slate-500">
              Active course packages, retail price, members enrolled, sales volume, and earning depth
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/packages')}
            className="text-xs text-blue-600 hover:underline"
          >
            Manage Packages
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-medium">Package</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Members</th>
                <th className="py-3 px-4 font-medium">Sales Volume</th>
                <th className="py-3 px-4 font-medium">Earning Depth</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.map(pkg => (
                <tr key={pkg.id} className="table-row-hover">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{pkg.name}</span>
                    <span className="block text-[11px] text-slate-400 line-clamp-1">{pkg.description}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-900">
                    {pkg.formattedPrice}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {pkg.membersCount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {pkg.totalSales}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {pkg.earningDepth} Levels
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={pkg.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => navigate('/admin/packages')}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Configure
                    </button>
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
