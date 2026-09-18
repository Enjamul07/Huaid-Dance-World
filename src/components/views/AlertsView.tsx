import React, { useState } from 'react';
import {
  Home,
  Calendar,
  ClipboardList,
  Bell,
  User,
  CheckCircle2,
  AlertTriangle,
  Megaphone,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';
import { ScreenId, Announcement } from '../../types';

interface AlertsViewProps {
  onNavigate: (screen: ScreenId) => void;
  announcements: Announcement[];
  onMarkAllAsRead: () => void;
  showToast: (msg: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  onNavigate,
  announcements,
  onMarkAllAsRead,
  showToast,
}) => {
  const [filter, setFilter] = useState<'All' | 'reminder' | 'announcement' | 'payment'>('All');

  const handleReadAll = () => {
    onMarkAllAsRead();
    showToast('All notifications marked as read');
  };

  const filtered = announcements.filter((a) => {
    if (filter === 'All') return true;
    return a.type === filter;
  });

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'reminder':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF2F7] text-[#6B2D5C]">
            <Clock size={11} /> Reminder
          </span>
        );
      case 'payment':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FDF3E2] text-[#C77F1A]">
            <AlertTriangle size={11} /> Dues &amp; Billing
          </span>
        );
      case 'announcement':
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E7F5EE] text-[#2E9E6B]">
            <Megaphone size={11} /> Broadcast
          </span>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              Studio Notices &amp; Reminders
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5">
              Official schedule updates, fee notifications and recital bulletins.
            </p>
          </div>

          <button
            onClick={handleReadAll}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#F0ECE9] hover:bg-neutral-50 text-[#1A1A1A] text-xs font-bold transition shadow-xs self-start sm:self-auto"
          >
            <Check size={14} />
            <span>Mark All As Read</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {(
            [
              { id: 'All', label: 'All Notices' },
              { id: 'reminder', label: 'Class Reminders' },
              { id: 'announcement', label: 'Studio Broadcasts' },
              { id: 'payment', label: 'Fee Invoices' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filter === t.id
                  ? 'bg-[#6B2D5C] text-white shadow-xs'
                  : 'bg-white text-[#6B6B6B] border border-[#F0ECE9] hover:text-[#1A1A1A]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Notices Feed */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-[#F0ECE9] shadow-xs">
              <p className="text-sm font-bold text-[#1A1A1A]">No notifications found</p>
              <p className="text-xs text-[#6B6B6B] mt-1">You are all caught up with studio updates!</p>
            </div>
          ) : (
            filtered.map((ann) => (
              <div
                key={ann.id}
                className={`bg-white rounded-3xl p-5 border transition shadow-xs hover:shadow-md ${
                  !ann.read ? 'border-[#6B2D5C]/40 ring-1 ring-[#6B2D5C]/10' : 'border-[#F0ECE9]'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {getAlertBadge(ann.type)}
                    {!ann.read && (
                      <span className="w-2 h-2 rounded-full bg-[#6B2D5C]" title="Unread" />
                    )}
                  </div>
                  <span className="text-[11px] text-[#9A9490] font-medium">{ann.date}</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A] mt-1">
                  {ann.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 leading-relaxed">
                  {ann.body || (ann as any).message || ''}
                </p>

                {ann.tag && (
                  <div className="mt-3 pt-2.5 border-t border-[#F0ECE9] flex items-center justify-between text-[11px] text-[#9A9490]">
                    <span>Audience: {ann.tag}</span>
                    <span className="text-[#6B2D5C] font-semibold">Huaid Dance World Official</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile-only bottom navigation bar */}
      <nav className="md:hidden shrink-0 flex bg-white border-t border-[#F0ECE9] py-2 px-3 justify-around shadow-lg z-20">
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
        >
          <Home size={18} className="mb-0.5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => onNavigate('schedule')}
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
        >
          <Calendar size={18} className="mb-0.5" />
          <span>Schedule</span>
        </button>
        <button
          onClick={() => onNavigate('bookings')}
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
        >
          <ClipboardList size={18} className="mb-0.5" />
          <span>Bookings</span>
        </button>
        <button
          onClick={() => onNavigate('alerts')}
          className="flex flex-col items-center text-[#6B2D5C] font-semibold text-[10px]"
        >
          <Bell size={18} className="mb-0.5" />
          <span>Alerts</span>
        </button>
        <button
          onClick={() => onNavigate('dues')}
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
        >
          <User size={18} className="mb-0.5" />
          <span>Me &amp; Dues</span>
        </button>
      </nav>
    </div>
  );
};
