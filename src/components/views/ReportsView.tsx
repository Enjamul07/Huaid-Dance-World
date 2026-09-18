import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Users,
  Home,
  Settings,
  TrendingUp,
  Download,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';
import { ScreenId, StudentChild, PaymentRecord, DanceClass } from '../../types';

interface ReportsViewProps {
  onNavigate: (screen: ScreenId) => void;
  students: StudentChild[];
  payments: PaymentRecord[];
  classes: DanceClass[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  onNavigate,
  students,
  payments,
  classes,
}) => {
  const [period, setPeriod] = useState<'This month' | 'Last month' | 'All time'>('This month');

  const totalCollected = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const outstandingDues = students.reduce((acc, curr) => acc + (curr.dueAmount || 0), 0);
  const unpaidCount = students.filter((s) => s.dueAmount > 0).length;

  const upiPayments = payments.filter((p) => p.method === 'UPI');
  const cashPayments = payments.filter((p) => p.method === 'Cash');
  const bankPayments = payments.filter((p) => p.method === 'Bank');

  const upiTotal = upiPayments.reduce((acc, p) => acc + p.amount, 0);
  const cashTotal = cashPayments.reduce((acc, p) => acc + p.amount, 0);
  const bankTotal = bankPayments.reduce((acc, p) => acc + p.amount, 0);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Date,Student,Amount,Method,Status']
        .concat(payments.map((p) => `${p.date},"${p.studentName}",${p.amount},${p.method},${p.status}`))
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HuaidDanceWorld_Report_${period.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              Studio Financial &amp; Attendance Analytics
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5">
              Comprehensive report of studio revenue, attendance consistency, and fee compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Period Filter Buttons */}
            <div className="flex bg-white p-1 rounded-2xl border border-[#F0ECE9] shadow-xs">
              {(['This month', 'Last month', 'All time'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    period === p
                      ? 'bg-[#6B2D5C] text-white shadow-xs'
                      : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white border border-[#F0ECE9] hover:bg-neutral-50 text-[#1A1A1A] text-xs font-bold transition shadow-xs active:scale-98"
            >
              <Download size={14} className="text-[#6B2D5C]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#6B2D5C] to-[#8B4A78] rounded-3xl p-5 sm:p-6 text-white shadow-md shadow-[#6B2D5C]/20">
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-80 block">
              Gross Collections ({period})
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5">
              ₹{totalCollected.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#E8B04B]">
              <ArrowUpRight size={14} />
              <span>Target: ₹25,000 / mo</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] block">
              Outstanding Dues
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#C77F1A] mt-1.5">
              ₹{outstandingDues.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-[#C77F1A] font-semibold">
              <AlertCircle size={13} />
              <span>{unpaidCount} students pending payment</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] block">
              Studio Attendance Rate
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2E9E6B] mt-1.5">87.5%</div>
            <div className="flex items-center gap-1 mt-2 text-xs text-[#2E9E6B] font-semibold">
              <CheckCircle2 size={13} />
              <span>+3.8% vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] block">
              Total Enrolled Dancers
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] mt-1.5">
              {students.length} Active
            </div>
            <p className="text-[11px] text-[#6B6B6B] font-medium mt-2">
              Across 4 specialized dance batches
            </p>
          </div>
        </div>

        {/* Analytics Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Attendance By Batch Breakdown (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE9]">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2">
                  <BarChart3 size={16} className="text-[#6B2D5C]" />
                  <span>Batch Attendance &amp; Occupancy</span>
                </h3>
                <p className="text-xs text-[#6B6B6B] mt-0.5">
                  Roll-call attendance rate calculated across all past sessions
                </p>
              </div>
              <span className="text-xs font-bold text-[#2E9E6B] bg-[#E7F5EE] px-2.5 py-1 rounded-full">
                Healthy
              </span>
            </div>

            <div className="space-y-4 pt-1">
              {classes.map((cls, idx) => {
                const percentages = [88, 92, 79, 85];
                const attPct = percentages[idx % percentages.length];
                const seatPct = Math.round((cls.enrolledCount / cls.totalSeats) * 100);

                return (
                  <div key={cls.id} className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{cls.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-[#1A1A1A]">{cls.name}</p>
                          <span className="text-[10.5px] text-[#6B6B6B]">
                            {cls.instructor} · {cls.days}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-[#6B2D5C]">{attPct}% Attendance</span>
                        <span className="block text-[10.5px] text-[#6B6B6B]">
                          {cls.enrolledCount}/{cls.totalSeats} seats filled
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#F0ECE9]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6B2D5C] to-[#8B4A78] transition-all duration-300"
                        style={{ width: `${attPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Modes & Collections Breakdown (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE9]">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2">
                  <PieChart size={16} className="text-[#E8B04B]" />
                  <span>Payment Channels</span>
                </h3>
                <p className="text-xs text-[#6B6B6B] mt-0.5">Mode share for {period}</p>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">UPI / QR Scan</p>
                  <p className="text-[11px] text-[#6B6B6B]">{upiPayments.length} transactions</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-[#6B2D5C]">
                    ₹{upiTotal.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] font-semibold text-[#2E9E6B]">
                    {totalCollected > 0 ? Math.round((upiTotal / totalCollected) * 100) : 0}% of
                    total
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Direct Cash</p>
                  <p className="text-[11px] text-[#6B6B6B]">{cashPayments.length} transactions</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-[#1A1A1A]">
                    ₹{cashTotal.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] font-semibold text-[#6B6B6B]">
                    {totalCollected > 0 ? Math.round((cashTotal / totalCollected) * 100) : 0}% of
                    total
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Bank NEFT / IMPS</p>
                  <p className="text-[11px] text-[#6B6B6B]">{bankPayments.length} transactions</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-[#1A1A1A]">
                    ₹{bankTotal.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] font-semibold text-[#6B6B6B]">
                    {totalCollected > 0 ? Math.round((bankTotal / totalCollected) * 100) : 0}% of
                    total
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('payment')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F5] hover:bg-[#FAF2F7] text-xs font-bold text-[#6B2D5C] transition border border-[#F0ECE9] text-center"
              >
                Go to fee recording desk →
              </button>
            </div>
          </div>
        </div>
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
          className="flex flex-col items-center text-[#6B2D5C] font-semibold text-[10px]"
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
