import React, { useState } from 'react';
import { Bell, CheckCheck, Filter, ShieldCheck, Package, Percent, Gift, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MemberNotifications: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNotifications = notifications.filter(
    n => selectedCategory === 'All' || n.category === selectedCategory
  );

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'KYC':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'Package':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'Commission':
        return <Percent className="w-4 h-4 text-emerald-600" />;
      case 'Bonus':
        return <Gift className="w-4 h-4 text-amber-600" />;
      case 'Payout':
        return <ArrowUpRight className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Notification Center</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time activity alerts on commissions, bonus pool qualifications, and payout updates.
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Commission', 'Bonus', 'Payout', 'KYC', 'Package'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="card-clean overflow-hidden divide-y divide-slate-100">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No notifications in this category.
          </div>
        ) : (
          filteredNotifications.map(item => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-4 transition-colors flex items-start gap-4 cursor-pointer hover:bg-slate-50/80 ${
                !item.read ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="p-2 rounded-lg bg-slate-100 mt-0.5 flex-shrink-0">
                {getCategoryIcon(item.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {item.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.message}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {item.category}
                  </span>
                  {!item.read && (
                    <span className="text-[10px] text-blue-600 font-medium">
                      Unread
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
