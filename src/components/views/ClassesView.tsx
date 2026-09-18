import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Clock,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  CalendarDays,
  Sparkles,
  Home,
  BarChart3,
  Settings,
  ChevronRight,
  MapPin,
  IndianRupee,
} from 'lucide-react';
import { ScreenId, DanceClass, AgeGroup } from '../../types';

interface ClassesViewProps {
  onNavigate: (screen: ScreenId) => void;
  classes: DanceClass[];
  onOpenCreateClass: () => void;
  onSelectClassForRoster: (classId: string) => void;
}

export const ClassesView: React.FC<ClassesViewProps> = ({
  onNavigate,
  classes,
  onOpenCreateClass,
  onSelectClassForRoster,
}) => {
  const [filter, setFilter] = useState<'All' | AgeGroup>('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredClasses = classes.filter((c) => {
    const matchesFilter = filter === 'All' || c.category === filter;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.level.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalSeats = classes.reduce((sum, c) => sum + c.totalSeats, 0);
  const totalEnrolled = classes.reduce((sum, c) => sum + c.enrolledCount, 0);
  const avgOccupancy = Math.round((totalEnrolled / (totalSeats || 1)) * 100);

  const handleCardClick = (clsId: string) => {
    onSelectClassForRoster(clsId);
    onNavigate('roster');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              Classes &amp; Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5">
              Manage dance batches, age groups, timings and real-time attendance roll-calls.
            </p>
          </div>
          <button
            onClick={onOpenCreateClass}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition shadow-xs active:scale-98 shrink-0"
          >
            <Plus size={16} />
            <span>Create New Batch</span>
          </button>
        </div>

        {/* Quick KPI Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Active Batches
            </span>
            <span className="text-2xl font-extrabold text-[#1A1A1A] mt-1 block">
              {classes.length}
            </span>
            <span className="text-[11px] text-[#2E9E6B] font-semibold mt-0.5 block">
              All active &amp; scheduled
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Total Enrolled
            </span>
            <span className="text-2xl font-extrabold text-[#1A1A1A] mt-1 block">
              {totalEnrolled} <span className="text-xs text-[#9A9490]">/ {totalSeats} seats</span>
            </span>
            <span className="text-[11px] text-[#6B6B6B] font-semibold mt-0.5 block">
              Across all categories
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Studio Capacity
            </span>
            <span className="text-2xl font-extrabold text-[#6B2D5C] mt-1 block">
              {avgOccupancy}%
            </span>
            <span className="text-[11px] text-[#2E9E6B] font-semibold mt-0.5 block">
              Healthy studio density
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Instructors
            </span>
            <span className="text-2xl font-extrabold text-[#1A1A1A] mt-1 block">3 Teachers</span>
            <span className="text-[11px] text-[#6B6B6B] font-semibold mt-0.5 block">
              Priya Sen, Kabir, Ananya
            </span>
          </div>
        </div>

        {/* Filters & Search Header */}
        <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['All', 'Kids', 'Teens', 'Adult'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#6B2D5C] text-white shadow-xs'
                    : 'bg-[#FAF7F5] text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F2EDE9]'
                }`}
              >
                {cat} {cat === 'All' ? `(${classes.length})` : ''}
              </button>
            ))}
          </div>

          {/* Search bar & View switch */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9490]"
              />
              <input
                type="text"
                placeholder="Search batch or teacher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#FAF7F5] border border-[#F0ECE9] rounded-xl text-xs text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
              />
            </div>

            <div className="hidden sm:flex bg-[#FAF7F5] p-1 rounded-xl border border-[#F0ECE9]">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'grid' ? 'bg-white text-[#6B2D5C] shadow-xs' : 'text-[#6B6B6B]'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'table' ? 'bg-white text-[#6B2D5C] shadow-xs' : 'text-[#6B6B6B]'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Classes Display: Grid or Table */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClasses.map((cls) => {
              const isFull = cls.enrolledCount >= cls.totalSeats;
              const pct = Math.min(100, Math.round((cls.enrolledCount / cls.totalSeats) * 100));
              const spotsLeft = Math.max(0, cls.totalSeats - cls.enrolledCount);

              return (
                <div
                  key={cls.id}
                  className="bg-white rounded-3xl p-5 border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#6B2D5C]/30 transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Icon, Name & Status */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-[#FAF2F7] flex items-center justify-center text-2xl shrink-0 border border-[#F0ECE9] group-hover:scale-105 transition">
                          {cls.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight truncate">
                            {cls.name}
                          </h3>
                          <span className="text-[11px] font-semibold text-[#6B6B6B] block truncate">
                            {cls.level}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                          isFull
                            ? 'bg-[#FDECEB] text-[#D9534F] border border-[#D9534F]/20'
                            : 'bg-[#E7F5EE] text-[#2E9E6B] border border-[#2E9E6B]/20'
                        }`}
                      >
                        {isFull ? 'Waitlist' : `${spotsLeft} seats open`}
                      </span>
                    </div>

                    {/* Schedule & Timing Info */}
                    <div className="space-y-2 py-3 border-y border-[#F0ECE9] text-xs text-[#6B6B6B]">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={14} className="text-[#6B2D5C]" />
                        <span className="font-semibold text-[#1A1A1A]">{cls.days}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#9A9490]" />
                        <span>
                          {cls.time} ({cls.durationMinutes} mins)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-[#9A9490]" />
                        <span>Instructor: {cls.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee size={14} className="text-[#9A9490]" />
                        <span>
                          ₹{cls.monthlyFee.toLocaleString('en-IN')} / mo · ₹{cls.dropInFee} drop-in
                        </span>
                      </div>
                    </div>

                    {/* Seat Occupancy Meter */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs font-bold text-[#1A1A1A] mb-1.5">
                        <span>Seat Occupancy</span>
                        <span>
                          {cls.enrolledCount} / {cls.totalSeats} Enrolled
                        </span>
                      </div>
                      <div className="w-full bg-[#FAF7F5] rounded-full h-2 overflow-hidden border border-[#F0ECE9]">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isFull
                              ? 'bg-[#D9534F]'
                              : 'bg-gradient-to-r from-[#6B2D5C] to-[#8B4A78]'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-[#F0ECE9] flex items-center gap-2">
                    <button
                      onClick={() => handleCardClick(cls.id)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs active:scale-98"
                    >
                      <CheckCircle2 size={14} />
                      <span>Mark Attendance</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectClassForRoster(cls.id);
                        onNavigate('roster');
                      }}
                      title="View Class Roster"
                      className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F0ECE9] text-[#6B6B6B] hover:text-[#1A1A1A] transition border border-[#F0ECE9]"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View for High Density */
          <div className="bg-white rounded-3xl border border-[#F0ECE9] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F5] text-[#6B6B6B] uppercase font-bold text-[10px] tracking-wider border-b border-[#F0ECE9]">
                  <tr>
                    <th className="px-5 py-3.5">Batch Name</th>
                    <th className="px-4 py-3.5">Age Group</th>
                    <th className="px-4 py-3.5">Schedule &amp; Time</th>
                    <th className="px-4 py-3.5">Instructor</th>
                    <th className="px-4 py-3.5">Enrolled / Seats</th>
                    <th className="px-4 py-3.5">Monthly Fee</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE9]">
                  {filteredClasses.map((cls) => {
                    const isFull = cls.enrolledCount >= cls.totalSeats;
                    return (
                      <tr key={cls.id} className="hover:bg-[#FAF7F5]/50 transition">
                        <td className="px-5 py-3.5 font-bold text-[#1A1A1A]">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{cls.icon}</span>
                            <div>
                              <span>{cls.name}</span>
                              <span className="block text-[10.5px] font-normal text-[#6B6B6B]">
                                {cls.level}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-[#6B6B6B]">{cls.category}</td>
                        <td className="px-4 py-3.5 font-medium text-[#1A1A1A]">
                          <div>{cls.days}</div>
                          <span className="text-[10.5px] text-[#9A9490]">{cls.time}</span>
                        </td>
                        <td className="px-4 py-3.5 font-medium text-[#1A1A1A]">{cls.instructor}</td>
                        <td className="px-4 py-3.5 font-bold">
                          <span className={isFull ? 'text-[#D9534F]' : 'text-[#2E9E6B]'}>
                            {cls.enrolledCount} / {cls.totalSeats}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-bold text-[#1A1A1A]">
                          ₹{cls.monthlyFee.toLocaleString('en-IN')}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleCardClick(cls.id)}
                            className="px-3 py-1.5 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white font-bold text-xs transition"
                          >
                            Mark Attendance
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-only bottom navigation bar */}
      <nav className="md:hidden shrink-0 flex bg-white border-t border-[#F0ECE9] py-2 px-3 justify-around shadow-lg z-20">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
        >
          <Home size={18} className="mb-0.5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => onNavigate('classes')}
          className="flex flex-col items-center text-[#6B2D5C] font-semibold text-[10px]"
        >
          <Calendar size={18} className="mb-0.5" />
          <span>Classes</span>
        </button>
        <button
          onClick={() => onNavigate('students')}
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
        >
          <Users size={18} className="mb-0.5" />
          <span>Students</span>
        </button>
        <button
          onClick={() => onNavigate('reports')}
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
        >
          <BarChart3 size={18} className="mb-0.5" />
          <span>Reports</span>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
        >
          <Settings size={18} className="mb-0.5" />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
};
