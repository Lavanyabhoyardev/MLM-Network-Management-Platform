import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Package,
  GitFork,
  Percent,
  CalendarDays,
  CalendarCheck2,
  Gift,
  Award,
  Wallet,
  ArrowUpRight,
  BarChart3,
  Settings,
  ClipboardList,
  UserCheck,
  TrendingUp,
  Sparkles,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) => {
  const { role, setRole, kycList, withdrawals, currentMember, notifications } = useApp();
  const navigate = useNavigate();

  const pendingKYCCount = kycList.filter(k => k.status === 'Pending').length;
  const pendingWithdrawalCount = withdrawals.filter(w => w.status === 'Pending').length;
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const adminNavItems = [
    { label: 'Overview', to: '/admin', icon: LayoutDashboard },
    { label: 'Members', to: '/admin/members', icon: Users },
    {
      label: 'KYC',
      to: '/admin/kyc',
      icon: ShieldCheck,
      badge: pendingKYCCount > 0 ? `${pendingKYCCount}` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    { label: 'Packages', to: '/admin/packages', icon: Package },
    { label: 'Network', to: '/admin/network', icon: GitFork },
    { label: 'Commissions', to: '/admin/commissions', icon: Percent },
    { label: 'Weekly Bonus', to: '/admin/weekly-bonus', icon: CalendarDays },
    { label: 'Monthly Bonus', to: '/admin/monthly-bonus', icon: CalendarCheck2 },
    { label: 'Manual Bonuses', to: '/admin/manual-bonus', icon: Gift },
    { label: 'Non-working Benefits', to: '/admin/non-working-benefits', icon: Award },
    { label: 'Wallet / Ledger', to: '/admin/wallet', icon: Wallet },
    {
      label: 'Withdrawals',
      to: '/admin/withdrawals',
      icon: ArrowUpRight,
      badge: pendingWithdrawalCount > 0 ? `${pendingWithdrawalCount}` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    { label: 'Reports', to: '/admin/reports', icon: BarChart3 },
    { label: 'Settings', to: '/admin/settings', icon: Settings },
    { label: 'Audit Logs', to: '/admin/audit-logs', icon: ClipboardList }
  ];

  const memberNavItems = [
    { label: 'Dashboard', to: '/member', icon: LayoutDashboard },
    { label: 'Profile', to: '/member/profile', icon: UserCheck },
    { label: 'KYC Verification', to: '/member/kyc', icon: ShieldCheck },
    { label: 'My Package', to: '/member/package', icon: Package },
    { label: 'My Network', to: '/member/network', icon: GitFork },
    { label: 'Active Income', to: '/member/active-income', icon: TrendingUp },
    { label: 'Passive Income', to: '/member/passive-income', icon: Layers },
    { label: 'Weekly Bonus', to: '/member/weekly-bonus', icon: CalendarDays },
    { label: 'Monthly Bonus', to: '/member/monthly-bonus', icon: CalendarCheck2 },
    { label: 'Benefits', to: '/member/benefits', icon: Sparkles },
    { label: 'Wallet', to: '/member/wallet', icon: Wallet },
    { label: 'Withdraw', to: '/member/withdraw', icon: ArrowUpRight },
    {
      label: 'Notifications',
      to: '/member/notifications',
      icon: Bell,
      badge: unreadNotifCount > 0 ? `${unreadNotifCount}` : undefined,
      badgeColor: 'bg-blue-100 text-blue-800'
    }
  ];

  const navItems = role === 'admin' ? adminNavItems : memberNavItems;

  const handleRoleToggle = () => {
    if (role === 'admin') {
      setRole('member');
      navigate('/member');
    } else {
      setRole('admin');
      navigate('/admin');
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
            A
          </div>
          {!collapsed && (
            <div className="truncate">
              <span className="font-semibold text-white text-sm tracking-tight">ApexMLM</span>
              <span className="text-[10px] block font-mono text-slate-400 uppercase tracking-wider">
                {role === 'admin' ? 'Enterprise Admin' : 'Member Portal'}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Switcher Pill in Sidebar */}
      {!collapsed && (
        <div className="p-3 bg-slate-950/40 border-b border-slate-800">
          <button
            onClick={handleRoleToggle}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700/80 text-xs font-medium text-white transition-all border border-slate-700/70"
          >
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-400" />
              <span>Switch to {role === 'admin' ? 'Member Portal' : 'Admin View'}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
              DEMO
            </span>
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin' || item.to === '/member'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                } ${collapsed ? 'justify-center' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.badge && (
                <span
                  className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Profile Snapshot */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center font-medium text-xs border border-slate-600 flex-shrink-0">
            {role === 'admin' ? 'AD' : currentMember.name.substring(0, 1)}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white truncate">
                {role === 'admin' ? 'Sanjay Deshmukh' : currentMember.name}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {role === 'admin' ? 'Super Administrator' : `${currentMember.memberId} • ${currentMember.packageName}`}
              </p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => navigate('/')}
              className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Exit to Login Screen"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed inset-y-0 left-0 z-30 transition-all duration-200 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-xs flex-1 flex flex-col h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
