import React, { useState } from 'react';
import {
  Home,
  Calendar,
  ClipboardList,
  Bell,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Ticket,
  ChevronRight,
} from 'lucide-react';
import { ScreenId, Booking } from '../../types';

interface BookingsViewProps {
  onNavigate: (screen: ScreenId) => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  showToast: (msg: string) => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  onNavigate,
  bookings,
  onCancelBooking,
  showToast,
}) => {
  const [subtab, setSubtab] = useState<'Upcoming' | 'Past'>('Upcoming');

  const upcomingBookings = bookings.filter(
    (b) => b.status === 'booked' || b.status === 'waitlist'
  );
  const pastBookings = bookings.filter((b) => b.status === 'completed');

  const handleCancel = (b: Booking) => {
    onCancelBooking(b.id);
    showToast(b.status === 'waitlist' ? 'Left waitlist queue' : 'Booking cancelled');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              My Reservations &amp; Attendance
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5">
              Track upcoming dance sessions, waitlist status and attendance history.
            </p>
          </div>

          <button
            onClick={() => onNavigate('schedule')}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition shadow-xs"
          >
            + Book New Session
          </button>
        </div>

        {/* Subtabs */}
        <div className="flex bg-white p-1 rounded-2xl border border-[#F0ECE9] shadow-xs max-w-sm">
          {(['Upcoming', 'Past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSubtab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                subtab === tab
                  ? 'bg-[#6B2D5C] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
              }`}
            >
              {tab === 'Upcoming'
                ? `Upcoming Sessions (${upcomingBookings.length})`
                : `Past History (${pastBookings.length})`}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {subtab === 'Upcoming' ? (
          <div className="space-y-3">
            {upcomingBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center shadow-xs border border-[#F0ECE9]">
                <p className="text-sm font-bold text-[#1A1A1A]">No active bookings</p>
                <p className="text-xs text-[#6B6B6B] mt-1">Explore our schedule and book your slot!</p>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="mt-4 px-5 py-2 rounded-xl bg-[#6B2D5C] text-white text-xs font-bold transition shadow-xs"
                >
                  Browse Schedule
                </button>
              </div>
            ) : (
              upcomingBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl p-5 border border-[#F0ECE9] shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF2F7] flex items-center justify-center text-2xl shrink-0 border border-[#F0ECE9]">
                      🩰
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                          {b.className}
                        </h4>
                        {b.status === 'waitlist' ? (
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FDF3E2] text-[#C77F1A] border border-[#E8B04B]/30">
                            Waitlist Queue #{b.waitlistPos || 2}
                          </span>
                        ) : (
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#EAF1F9] text-[#3B6FA8]">
                            Confirmed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6B6B6B] mt-1 font-medium">
                        Dancer: <b className="text-[#1A1A1A]">{b.studentName}</b>
                      </p>
                      <p className="text-xs text-[#6B6B6B] mt-0.5 flex items-center gap-1">
                        <Clock size={12} className="text-[#6B2D5C]" />
                        <span>
                          {b.dateStr} · {b.timeStr}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 justify-end">
                    <button
                      onClick={() => handleCancel(b)}
                      className="py-2 px-4 rounded-xl bg-[#FAF7F5] hover:bg-[#FDECEB] text-[#D9534F] text-xs font-bold transition border border-[#F0ECE9]"
                    >
                      {b.status === 'waitlist' ? 'Leave Waitlist' : 'Cancel Booking'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {pastBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-4 border border-[#F0ECE9] shadow-xs flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">{b.className}</h4>
                  <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                    {b.studentName} · {b.dateStr} · {b.timeStr}
                  </p>
                </div>
                <span
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    b.attendanceResult === 'present'
                      ? 'bg-[#E7F5EE] text-[#2E9E6B]'
                      : 'bg-[#F1EFED] text-[#6B6B6B]'
                  }`}
                >
                  {b.attendanceResult === 'present' ? (
                    <>
                      <CheckCircle2 size={12} /> Present
                    </>
                  ) : (
                    <>
                      <XCircle size={12} /> Absent
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
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
          className="flex flex-col items-center text-[#6B2D5C] font-semibold text-[10px]"
        >
          <ClipboardList size={18} className="mb-0.5" />
          <span>Bookings</span>
        </button>
        <button
          onClick={() => onNavigate('alerts')}
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
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
