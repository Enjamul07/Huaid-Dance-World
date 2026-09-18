import React from 'react';
import {
  Bell,
  Home,
  Calendar,
  ClipboardList,
  User,
  Sparkles,
  Clock,
  MapPin,
  AlertCircle,
  CreditCard,
  ChevronRight,
  Megaphone,
  CheckCircle2,
} from 'lucide-react';
import { ScreenId, Booking, Announcement } from '../../types';

interface StudentHomeViewProps {
  onNavigate: (screen: ScreenId) => void;
  bookings: Booking[];
  announcements: Announcement[];
  onCancelBooking: (id: string) => void;
  totalDues: number;
}

export const StudentHomeView: React.FC<StudentHomeViewProps> = ({
  onNavigate,
  bookings,
  announcements,
  onCancelBooking,
  totalDues,
}) => {
  const nextBooking = bookings.find((b) => b.status === 'booked');
  const unreadAlerts = announcements.filter((a) => !a.read).length;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#6B2D5C] via-[#7B366B] to-[#8B4A78] rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-[#6B2D5C]/15 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[#E8B04B] text-xs font-bold mb-2 backdrop-blur-xs">
                <Sparkles size={12} />
                <span>Parent Portal</span>
                <span className="opacity-60">·</span>
                <span className="text-white">Ananya Sharma (Age 7)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Namaste, Sunita Sharma
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-lg">
                Your child has <b className="text-white">1 active dance session</b> scheduled today at
                Huaid Dance World.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => onNavigate('alerts')}
                className="relative px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition backdrop-blur-xs flex items-center gap-1.5"
              >
                <Bell size={15} />
                <span>Alerts</span>
                {unreadAlerts > 0 && (
                  <span className="px-1.5 py-0.2 bg-[#E8B04B] text-[#1A1A1A] font-extrabold text-[10px] rounded-full">
                    {unreadAlerts}
                  </span>
                )}
              </button>
              <button
                onClick={() => onNavigate('schedule')}
                className="px-4 py-2 rounded-xl bg-[#E8B04B] text-[#1A1A1A] hover:bg-[#F0BF64] text-xs font-bold transition shadow-xs active:scale-98"
              >
                Book Class
              </button>
            </div>
          </div>
        </div>

        {/* Next Class Hero Spotlight */}
        {nextBooking ? (
          <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF2F7] border border-[#F0ECE9] flex items-center justify-center text-2xl shrink-0">
                🩰
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B2D5C] bg-[#FAF2F7] px-2.5 py-0.5 rounded-full">
                    Next Upcoming Session
                  </span>
                  <span className="text-[10px] font-bold text-[#2E9E6B] bg-[#E7F5EE] px-2 py-0.5 rounded-full">
                    Confirmed
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mt-1 tracking-tight">
                  {nextBooking.className}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#6B6B6B] mt-1 font-medium flex-wrap">
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-[#6B2D5C]" />
                    {nextBooking.timeStr}
                  </span>
                  <span>·</span>
                  <span>Dancer: {nextBooking.studentName}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-[#9A9490]" /> Studio Hall A
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:justify-end shrink-0">
              <button
                onClick={() => onCancelBooking(nextBooking.id)}
                className="px-4 py-2 rounded-xl bg-[#FAF7F5] hover:bg-[#FDECEB] text-[#D9534F] text-xs font-bold transition border border-[#F0ECE9]"
              >
                Cancel Session
              </button>
              <button
                onClick={() => onNavigate('bookings')}
                className="px-4 py-2 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition shadow-xs"
              >
                View Details
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 text-center border border-[#F0ECE9] shadow-xs">
            <p className="text-sm font-bold text-[#1A1A1A]">No classes booked for today</p>
            <p className="text-xs text-[#6B6B6B] mt-1">
              Check out our weekly dance timetable and reserve a slot for your child!
            </p>
            <button
              onClick={() => onNavigate('schedule')}
              className="mt-3 px-5 py-2 rounded-xl bg-[#6B2D5C] text-white text-xs font-bold transition shadow-xs"
            >
              Browse Timetable
            </button>
          </div>
        )}

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('schedule')}
            className="bg-white p-5 rounded-3xl text-left border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#6B2D5C]/30 transition group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FAF2F7] text-[#6B2D5C] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
              📅
            </div>
            <h4 className="text-sm font-bold text-[#1A1A1A]">Book Class</h4>
            <p className="text-xs text-[#6B6B6B] mt-0.5">Explore batches</p>
          </button>

          <button
            onClick={() => onNavigate('bookings')}
            className="bg-white p-5 rounded-3xl text-left border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#6B2D5C]/30 transition group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#EAF1F9] text-[#3B6FA8] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
              📋
            </div>
            <h4 className="text-sm font-bold text-[#1A1A1A]">My Bookings</h4>
            <p className="text-xs text-[#6B6B6B] mt-0.5">{bookings.length} reservations</p>
          </button>

          <button
            onClick={() => onNavigate('dues')}
            className="bg-white p-5 rounded-3xl text-left border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#E8B04B]/50 transition group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FDF3E2] text-[#C77F1A] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
              💳
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#1A1A1A]">Fees &amp; Dues</h4>
              {totalDues > 0 && (
                <span className="text-[10px] font-extrabold text-[#C77F1A] bg-[#FDF3E2] px-1.5 py-0.5 rounded-md">
                  Due
                </span>
              )}
            </div>
            <p className="text-xs font-extrabold text-[#C77F1A] mt-0.5">
              ₹{totalDues.toLocaleString('en-IN')} pending
            </p>
          </button>

          <button
            onClick={() => onNavigate('alerts')}
            className="bg-white p-5 rounded-3xl text-left border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#6B2D5C]/30 transition group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#E7F5EE] text-[#2E9E6B] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
              📣
            </div>
            <h4 className="text-sm font-bold text-[#1A1A1A]">Studio Notices</h4>
            <p className="text-xs text-[#6B6B6B] mt-0.5">{announcements.length} broadcasts</p>
          </button>
        </div>

        {/* Studio Announcements Feed */}
        <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE9]">
            <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
              <Megaphone size={16} className="text-[#6B2D5C]" />
              <span>Studio Bulletin Board</span>
            </h3>
            <button
              onClick={() => onNavigate('alerts')}
              className="text-xs text-[#6B2D5C] hover:underline font-bold"
            >
              View all notices →
            </button>
          </div>

          <div className="space-y-2.5">
            {announcements.slice(0, 2).map((a) => (
              <div
                key={a.id}
                onClick={() => onNavigate('alerts')}
                className="p-4 rounded-2xl bg-[#FAF7F5] hover:bg-[#FAF2F7] border border-[#F0ECE9] flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📣</span>
                  <div>
                    <h5 className="text-xs font-bold text-[#1A1A1A]">{a.title}</h5>
                    <p className="text-[11px] text-[#6B6B6B] mt-0.5">{a.body || (a as any).message || ''}</p>
                    <span className="text-[10px] text-[#9A9490] mt-1 block">{a.date}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#9A9490]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-only bottom navigation bar */}
      <nav className="md:hidden shrink-0 flex bg-white border-t border-[#F0ECE9] py-2 px-3 justify-around shadow-lg z-20">
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center text-[#6B2D5C] font-semibold text-[10px]"
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
