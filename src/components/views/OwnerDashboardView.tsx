import React from 'react';
import {
  Calendar,
  Users,
  CreditCard,
  Sparkles,
  ArrowUpRight,
  Plus,
  Megaphone,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  Home,
  BarChart3,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { ScreenId, DanceClass, StudentChild, PaymentRecord } from '../../types';

interface OwnerDashboardViewProps {
  onNavigate: (screen: ScreenId) => void;
  classes: DanceClass[];
  students: StudentChild[];
  payments: PaymentRecord[];
  onOpenCreateClass: () => void;
  onOpenAddStudent: () => void;
  onOpenAnnouncement: () => void;
  onSelectClassForRoster: (classId: string) => void;
}

export const OwnerDashboardView: React.FC<OwnerDashboardViewProps> = ({
  onNavigate,
  classes,
  students,
  payments,
  onOpenCreateClass,
  onOpenAddStudent,
  onOpenAnnouncement,
  onSelectClassForRoster,
}) => {
  const unpaidStudents = students.filter((s) => s.feeStatus === 'due' || s.dueAmount > 0);
  const totalOutstanding = unpaidStudents.reduce((acc, curr) => acc + curr.dueAmount, 0);

  const totalCollectedThisMonth = payments
    .filter((p) => p.date.includes('Sep 2026') || p.date.includes('Sep'))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSeats = classes.reduce((sum, c) => sum + c.totalSeats, 0);
  const totalEnrolled = classes.reduce((sum, c) => sum + c.enrolledCount, 0);
  const overallOccupancyPct = Math.round((totalEnrolled / (totalSeats || 1)) * 100);

  const handleMarkClass = (clsId: string) => {
    onSelectClassForRoster(clsId);
    onNavigate('roster');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      {/* SaaS Dashboard Container */}
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Welcome Hero Banner */}
        <div className="bg-gradient-to-r from-[#6B2D5C] via-[#7B366B] to-[#8B4A78] rounded-3xl p-5 sm:p-7 text-white shadow-xl shadow-[#6B2D5C]/15 relative overflow-hidden">
          {/* Subtle decorative background shapes */}
          <div className="absolute -right-8 -bottom-10 w-48 h-48 rounded-full bg-white/5 blur-xl pointer-events-none" />
          <div className="absolute right-24 top-0 w-32 h-32 rounded-full bg-[#E8B04B]/10 blur-lg pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[#E8B04B] text-xs font-bold mb-2 backdrop-blur-xs">
                <Sparkles size={12} />
                <span>Namaste, Priya Sen</span>
                <span className="opacity-60">·</span>
                <span className="text-white/90">Tuesday, 18 September 2026</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Studio Studio Control Center
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl font-medium leading-relaxed">
                You have <b className="text-white">3 active sessions</b> scheduled today with{' '}
                <b className="text-white">{classes[0]?.enrolledCount || 8} students</b> arriving this
                evening.
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                onClick={onOpenCreateClass}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#6B2D5C] hover:bg-neutral-100 text-xs font-bold transition shadow-sm active:scale-98"
              >
                <Plus size={14} />
                <span>New Class</span>
              </button>
              <button
                onClick={onOpenAddStudent}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition backdrop-blur-xs active:scale-98"
              >
                <Users size={14} />
                <span>Add Student</span>
              </button>
              <button
                onClick={onOpenAnnouncement}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E8B04B] text-[#1A1A1A] hover:bg-[#F0BF64] text-xs font-bold transition shadow-sm active:scale-98"
              >
                <Megaphone size={14} />
                <span>Broadcast</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Premium SaaS Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Monthly Collections */}
          <div
            onClick={() => onNavigate('reports')}
            className="bg-white rounded-2xl p-5 border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#6B2D5C]/30 transition cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                Sep Collections
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FAF2F7] text-[#6B2D5C] flex items-center justify-center group-hover:scale-110 transition">
                <CreditCard size={16} />
              </div>
            </div>
            <div className="mt-2.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                ₹{totalCollectedThisMonth.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#2E9E6B] font-semibold">
                <TrendingUp size={13} />
                <span>+18.4% vs last month</span>
              </div>
            </div>
            <div className="w-full bg-[#FAF7F5] rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-[#6B2D5C] h-full rounded-full w-3/4" />
            </div>
          </div>

          {/* 2. Active Enrolled Students */}
          <div
            onClick={() => onNavigate('students')}
            className="bg-white rounded-2xl p-5 border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#6B2D5C]/30 transition cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                Total Enrolled
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#EAF1F9] text-[#3B6FA8] flex items-center justify-center group-hover:scale-110 transition">
                <Users size={16} />
              </div>
            </div>
            <div className="mt-2.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                {students.length}{' '}
                <span className="text-xs font-medium text-[#9A9490]">/ {totalSeats} capacity</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#6B6B6B] font-semibold">
                <span>{overallOccupancyPct}% overall studio capacity</span>
              </div>
            </div>
            <div className="w-full bg-[#FAF7F5] rounded-full h-1.5 mt-3 overflow-hidden">
              <div
                className="bg-[#3B6FA8] h-full rounded-full transition-all duration-300"
                style={{ width: `${overallOccupancyPct}%` }}
              />
            </div>
          </div>

          {/* 3. Average Attendance Rate */}
          <div
            onClick={() => onNavigate('roster')}
            className="bg-white rounded-2xl p-5 border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#6B2D5C]/30 transition cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                Attendance Rate
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#E7F5EE] text-[#2E9E6B] flex items-center justify-center group-hover:scale-110 transition">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="mt-2.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                87.5%
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#2E9E6B] font-semibold">
                <ArrowUpRight size={13} />
                <span>+4.2% higher this week</span>
              </div>
            </div>
            <div className="w-full bg-[#FAF7F5] rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-[#2E9E6B] h-full rounded-full w-[87%]" />
            </div>
          </div>

          {/* 4. Pending Unpaid Dues */}
          <div
            onClick={() => onNavigate('payment')}
            className="bg-white rounded-2xl p-5 border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#C77F1A]/50 transition cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                Pending Fees
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FDF3E2] text-[#C77F1A] flex items-center justify-center group-hover:scale-110 transition">
                <AlertCircle size={16} />
              </div>
            </div>
            <div className="mt-2.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C77F1A] tracking-tight">
                ₹{totalOutstanding.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#C77F1A] font-semibold">
                <span>{unpaidStudents.length} students have dues</span>
              </div>
            </div>
            <div className="w-full bg-[#FAF7F5] rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-[#C77F1A] h-full rounded-full w-1/2" />
            </div>
          </div>
        </div>

        {/* Two Column Layout: Today's Schedule + Analytics Chart & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Left (2 cols): Today's Schedule & Attendance Desk */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F0ECE9] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE9]">
                <div>
                  <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2">
                    <Calendar size={18} className="text-[#6B2D5C]" />
                    <span>Today&apos;s Class Schedule &amp; Attendance</span>
                  </h3>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">
                    Click &quot;Mark Roster&quot; to take instant attendance or check seat status
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('classes')}
                  className="text-xs text-[#6B2D5C] hover:underline font-bold flex items-center gap-1"
                >
                  All Classes <ChevronRight size={14} />
                </button>
              </div>

              <div className="divide-y divide-[#F0ECE9] mt-2">
                {classes.map((cls) => {
                  const isFull = cls.enrolledCount >= cls.totalSeats;
                  const pct = Math.min(100, Math.round((cls.enrolledCount / cls.totalSeats) * 100));

                  return (
                    <div
                      key={cls.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF7F5]/60 rounded-2xl px-2 sm:px-3 transition"
                    >
                      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-[#FAF2F7] flex items-center justify-center text-2xl shrink-0 border border-[#F0ECE9]">
                          {cls.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-[#1A1A1A] truncate">{cls.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F5] text-[#6B6B6B] border border-[#F0ECE9]">
                              {cls.category}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isFull
                                  ? 'bg-[#FDECEB] text-[#D9534F]'
                                  : 'bg-[#E7F5EE] text-[#2E9E6B]'
                              }`}
                            >
                              {isFull ? 'Full (Waitlist active)' : 'Open'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-[#6B6B6B] mt-1 font-medium flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock size={12} className="text-[#9A9490]" />
                              {cls.time}
                            </span>
                            <span>·</span>
                            <span>Instructor: {cls.instructor}</span>
                            <span>·</span>
                            <span>₹{cls.dropInFee} drop-in</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 shrink-0 justify-between sm:justify-end">
                        <div className="text-right sm:min-w-28">
                          <div className="text-xs font-bold text-[#1A1A1A]">
                            {cls.enrolledCount} / {cls.totalSeats} Enrolled
                          </div>
                          <div className="w-24 sm:w-28 bg-[#F0ECE9] rounded-full h-1.5 mt-1 overflow-hidden">
                            <div
                              className="bg-[#6B2D5C] h-full rounded-full transition-all duration-300"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => handleMarkClass(cls.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition shadow-xs active:scale-95"
                        >
                          Mark Roster
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Studio Revenue & Attendance Weekly Chart */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F0ECE9] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0ECE9] gap-2">
                <div>
                  <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2">
                    <TrendingUp size={18} className="text-[#2E9E6B]" />
                    <span>Weekly Studio Performance</span>
                  </h3>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">
                    Attendance trend &amp; session revenue over the last 5 days
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5 text-[#6B2D5C]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6B2D5C]" /> Attendance (%)
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#E8B04B]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E8B04B]" /> Revenue (₹k)
                  </span>
                </div>
              </div>

              {/* Chart Graphic using SVG */}
              <div className="mt-4 pt-2">
                <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center items-end h-44 pb-2 border-b border-[#F0ECE9]">
                  {[
                    { day: 'Fri (14 Sep)', att: 84, rev: 4000, hAtt: '84%', hRev: '40%' },
                    { day: 'Sat (15 Sep)', att: 92, rev: 6800, hAtt: '92%', hRev: '68%' },
                    { day: 'Mon (17 Sep)', att: 88, rev: 5200, hAtt: '88%', hRev: '52%' },
                    { day: 'Tue (Today)', att: 95, rev: 8000, hAtt: '95%', hRev: '80%' },
                    { day: 'Thu (Forecast)', att: 90, rev: 7200, hAtt: '90%', hRev: '72%' },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center justify-end h-full gap-1 group">
                      <div className="text-[10.5px] font-bold text-[#1A1A1A] opacity-0 group-hover:opacity-100 transition">
                        {bar.att}%
                      </div>
                      <div className="flex items-end gap-1.5 w-full max-w-[40px] h-32 justify-center">
                        {/* Attendance Bar */}
                        <div
                          style={{ height: bar.hAtt }}
                          className="w-3.5 sm:w-4 bg-[#6B2D5C] rounded-t-md hover:brightness-110 transition shadow-xs"
                          title={`Attendance: ${bar.att}%`}
                        />
                        {/* Revenue Bar */}
                        <div
                          style={{ height: bar.hRev }}
                          className="w-3.5 sm:w-4 bg-[#E8B04B] rounded-t-md hover:brightness-110 transition shadow-xs"
                          title={`Revenue: ₹${bar.rev}`}
                        />
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-[#6B6B6B] font-medium truncate w-full mt-1">
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-[#9A9490] pt-2 font-medium">
                  <span>Target: 85% attendance minimum</span>
                  <button
                    onClick={() => onNavigate('reports')}
                    className="text-[#6B2D5C] hover:underline font-bold"
                  >
                    View detailed financial report →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (1 col): Quick Actions & Activity Feed & Dues alerts */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#F0ECE9] shadow-xs">
              <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-3">
                Quick Studio Actions
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={onOpenCreateClass}
                  className="p-3.5 rounded-2xl bg-[#FAF7F5] hover:bg-[#FAF2F7] border border-[#F0ECE9] hover:border-[#6B2D5C]/30 text-left transition group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#FAF2F7] text-[#6B2D5C] flex items-center justify-center mb-2 group-hover:scale-110 transition">
                    <Plus size={16} />
                  </div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Create Batch</p>
                  <p className="text-[10.5px] text-[#6B6B6B] mt-0.5">Add dance class</p>
                </button>

                <button
                  onClick={onOpenAddStudent}
                  className="p-3.5 rounded-2xl bg-[#FAF7F5] hover:bg-[#FAF2F7] border border-[#F0ECE9] hover:border-[#6B2D5C]/30 text-left transition group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#EAF1F9] text-[#3B6FA8] flex items-center justify-center mb-2 group-hover:scale-110 transition">
                    <Users size={16} />
                  </div>
                  <p className="text-xs font-bold text-[#1A1A1A]">New Student</p>
                  <p className="text-[10.5px] text-[#6B6B6B] mt-0.5">Register admission</p>
                </button>

                <button
                  onClick={() => onNavigate('payment')}
                  className="p-3.5 rounded-2xl bg-[#FAF7F5] hover:bg-[#FAF2F7] border border-[#F0ECE9] hover:border-[#6B2D5C]/30 text-left transition group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#E7F5EE] text-[#2E9E6B] flex items-center justify-center mb-2 group-hover:scale-110 transition">
                    <CreditCard size={16} />
                  </div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Record Fee</p>
                  <p className="text-[10.5px] text-[#6B6B6B] mt-0.5">Cash, UPI or bank</p>
                </button>

                <button
                  onClick={onOpenAnnouncement}
                  className="p-3.5 rounded-2xl bg-[#FAF7F5] hover:bg-[#FAF2F7] border border-[#F0ECE9] hover:border-[#6B2D5C]/30 text-left transition group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#FDF3E2] text-[#C77F1A] flex items-center justify-center mb-2 group-hover:scale-110 transition">
                    <Megaphone size={16} />
                  </div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Broadcast</p>
                  <p className="text-[10.5px] text-[#6B6B6B] mt-0.5">Notify dancers</p>
                </button>
              </div>
            </div>

            {/* Pending Dues Alert Widget */}
            {unpaidStudents.length > 0 && (
              <div className="bg-[#FAF2F7] rounded-3xl p-5 border border-[#6B2D5C]/20 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-[#6B2D5C]" />
                    <h3 className="text-xs font-bold text-[#6B2D5C] uppercase tracking-wider">
                      Dues Requiring Attention
                    </h3>
                  </div>
                  <span className="text-[10.5px] font-bold text-[#6B2D5C] bg-white px-2 py-0.5 rounded-full shadow-2xs">
                    {unpaidStudents.length} Students
                  </span>
                </div>

                <div className="space-y-2">
                  {unpaidStudents.slice(0, 3).map((stu) => (
                    <div
                      key={stu.id}
                      className="p-2.5 rounded-xl bg-white border border-[#F0ECE9] flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-[#1A1A1A]">{stu.name}</p>
                        <p className="text-[10.5px] text-[#6B6B6B]">{stu.enrolledClass}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-[#C77F1A] block">
                          ₹{stu.dueAmount.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => onNavigate('payment')}
                          className="text-[10px] font-bold text-[#6B2D5C] hover:underline"
                        >
                          Record Fee
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate('students')}
                  className="w-full mt-3 py-2 rounded-xl bg-white border border-[#6B2D5C]/30 text-xs font-bold text-[#6B2D5C] hover:bg-[#FAF2F7] transition text-center shadow-2xs"
                >
                  View all unpaid accounts →
                </button>
              </div>
            )}

            {/* Recent Studio Activity Stream */}
            <div className="bg-white rounded-3xl p-5 border border-[#F0ECE9] shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0ECE9]">
                <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  Recent Studio Activity
                </h3>
                <span className="text-[11px] text-[#9A9490]">Live sync</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#E7F5EE] text-[#2E9E6B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    AS
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1A1A]">
                      Ananya Sharma confirmed attendance
                    </p>
                    <p className="text-[11px] text-[#6B6B6B]">Ballet Kids · Today 6:00 PM</p>
                    <span className="text-[10px] text-[#9A9490] mt-0.5 block">10 mins ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF2F7] text-[#6B2D5C] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ₹
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1A1A]">
                      ₹2,000 recorded via UPI
                    </p>
                    <p className="text-[11px] text-[#6B6B6B]">Kavya R. · September Fees</p>
                    <span className="text-[10px] text-[#9A9490] mt-0.5 block">1 hour ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FDF3E2] text-[#C77F1A] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    📣
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1A1A]">
                      Studio reminder broadcasted
                    </p>
                    <p className="text-[11px] text-[#6B6B6B]">Recital rehearsals next week</p>
                    <span className="text-[10px] text-[#9A9490] mt-0.5 block">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only bottom navigation bar */}
      <nav className="md:hidden shrink-0 flex bg-white border-t border-[#F0ECE9] py-2 px-3 justify-around shadow-lg z-20">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex flex-col items-center text-[#6B2D5C] font-semibold text-[10px]"
        >
          <Home size={18} className="mb-0.5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => onNavigate('classes')}
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
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
