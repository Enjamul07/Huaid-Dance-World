import React, { useState } from 'react';
import {
  Search,
  Home,
  Calendar,
  ClipboardList,
  Bell,
  User,
  Clock,
  Sparkles,
  Users,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { ScreenId, DanceClass, AgeGroup } from '../../types';

interface ScheduleViewProps {
  onNavigate: (screen: ScreenId) => void;
  classes: DanceClass[];
  onSelectClassForBooking: (cls: DanceClass) => void;
  onJoinWaitlist: (cls: DanceClass) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  onNavigate,
  classes,
  onSelectClassForBooking,
  onJoinWaitlist,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | AgeGroup>('All');
  const [selectedDay, setSelectedDay] = useState<'Tue' | 'Wed' | 'Thu' | 'Fri'>('Tue');

  const filtered = classes.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.level.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    return filter === 'All' ? true : c.category === filter;
  });

  const handleClassClick = (cls: DanceClass) => {
    onSelectClassForBooking(cls);
    onNavigate('class');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              Class Schedule &amp; Reservations
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5">
              Browse available slots, reserve spots for your dancer, or join class waitlists.
            </p>
          </div>
        </div>

        {/* Day Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'Tue', label: 'Today · Tue 18 Sep', count: '2 classes' },
            { id: 'Wed', label: 'Tomorrow · Wed 19 Sep', count: '2 classes' },
            { id: 'Thu', label: 'Thu 20 Sep', count: '3 classes' },
            { id: 'Fri', label: 'Fri 21 Sep', count: '2 classes' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDay(d.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                selectedDay === d.id
                  ? 'bg-[#6B2D5C] text-white shadow-xs'
                  : 'bg-white text-[#6B6B6B] border border-[#F0ECE9] hover:text-[#1A1A1A]'
              }`}
            >
              <span>{d.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  selectedDay === d.id ? 'bg-white/20 text-white' : 'bg-[#FAF7F5] text-[#9A9490]'
                }`}
              >
                {d.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['All', 'Kids', 'Teens', 'Adult'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#6B2D5C] text-white shadow-xs'
                    : 'bg-[#FAF7F5] text-[#6B6B6B] hover:text-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9490]"
            />
            <input
              type="text"
              placeholder="Search style or teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#FAF7F5] border border-[#F0ECE9] rounded-xl text-xs text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Class Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((cls) => {
            const isFull = cls.enrolledCount >= cls.totalSeats;
            const spotsLeft = Math.max(0, cls.totalSeats - cls.enrolledCount);

            return (
              <div
                key={cls.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#6B2D5C]/30 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF2F7] flex items-center justify-center text-2xl shrink-0 border border-[#F0ECE9] group-hover:scale-105 transition">
                        {cls.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#1A1A1A] tracking-tight">
                          {cls.name}
                        </h4>
                        <span className="text-[11px] text-[#6B6B6B] font-medium">
                          {cls.level} · {cls.category}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                        isFull
                          ? 'bg-[#FDECEB] text-[#D9534F] border border-[#D9534F]/20'
                          : 'bg-[#E7F5EE] text-[#2E9E6B] border border-[#2E9E6B]/20'
                      }`}
                    >
                      {isFull ? 'Full (Waitlist)' : `${spotsLeft} seats open`}
                    </span>
                  </div>

                  <div className="space-y-1.5 py-3 border-y border-[#F0ECE9] text-xs text-[#6B6B6B]">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[#6B2D5C]" />
                      <span className="font-semibold text-[#1A1A1A]">{cls.time}</span>
                      <span>({cls.durationMinutes} mins)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[#9A9490]" />
                      <span>Instructor: {cls.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[#1A1A1A] font-bold">
                        ₹{cls.dropInFee} <span className="text-[#9A9490] font-normal">/ drop-in</span>
                      </span>
                      <span className="text-[#6B2D5C] font-semibold">
                        ₹{cls.monthlyFee.toLocaleString('en-IN')} / month
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  {isFull ? (
                    <button
                      onClick={() => onJoinWaitlist(cls)}
                      className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#6B2D5C]/30 hover:bg-[#FAF2F7] text-[#6B2D5C] text-xs font-bold transition shadow-xs active:scale-98"
                    >
                      Join Waitlist (Queue #2)
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClassClick(cls)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition shadow-xs active:scale-98 flex items-center justify-center gap-1.5"
                    >
                      <span>Book Slot Now</span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile bottom navigation */}
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
          className="flex flex-col items-center text-[#6B2D5C] font-semibold text-[10px]"
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
