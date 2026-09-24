import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  ChevronDown,
  User,
  ShieldAlert,
  ArrowRightLeft,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TopbarProps {
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ setMobileOpen, collapsed }) => {
  const { role, setRole, currentMember, notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPageTitle = (pathname: string) => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return 'Dashboard';
    if (parts.length === 1) {
      return parts[0] === 'admin' ? 'Admin Dashboard' : 'Member Dashboard';
    }
    const slug = parts[1];
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleRoleToggle = () => {
    if (role === 'admin') {
      setRole('member');
      navigate('/member');
    } else {
      setRole('admin');
      navigate('/admin');
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{role === 'admin' ? 'Administration' : 'Portal'}</span>
            <span>/</span>
            <span className="text-slate-600 font-medium capitalize">
              {getPageTitle(location.pathname)}
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-semibold text-slate-900 leading-tight">
            {getPageTitle(location.pathname)}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Global Search Bar */}
        <div className="hidden lg:flex items-center relative w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search records, members, IDs..."
            className="w-full text-xs pl-9 pr-3 py-1.5 rounded-md border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
          />
        </div>

        {/* Quick Role Switcher Pill */}
        <button
          onClick={handleRoleToggle}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors"
          title={`Currently in ${role.toUpperCase()} view. Click to switch.`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">Role:</span>
          <span className="font-semibold text-blue-600 capitalize">{role}</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="relative p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-100 text-blue-800 font-semibold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.slice(0, 5).map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationAsRead(n.id);
                      if (n.link) navigate(n.link);
                      setNotifOpen(false);
                    }}
                    className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                      !n.read ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-slate-100 text-center">
                <Link
                  to={role === 'admin' ? '/admin/audit-logs' : '/member/notifications'}
                  onClick={() => setNotifOpen(false)}
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  View all activity
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-semibold text-xs flex items-center justify-center">
              {role === 'admin' ? 'AD' : currentMember.name.substring(0, 1)}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-medium text-slate-900">
                  {role === 'admin' ? 'Super Administrator' : currentMember.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {role === 'admin' ? 'admin@apexmlm.internal' : currentMember.email}
                </p>
              </div>

              <div className="py-1 text-xs">
                {role === 'member' && (
                  <Link
                    to="/member/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleRoleToggle();
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-50"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Switch to {role === 'admin' ? 'Member' : 'Admin'}</span>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <Link
                  to="/"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50"
                >
                  <span>Exit to Role Select</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
