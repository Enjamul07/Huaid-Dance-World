import React from 'react';
import {
  Copy,
  Home,
  Calendar,
  ClipboardList,
  Bell,
  User,
  CheckCircle2,
  QrCode,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { ScreenId, StudentChild, PaymentRecord } from '../../types';
import { QRCode } from '../QRCode';

interface DuesViewProps {
  onNavigate: (screen: ScreenId) => void;
  students: StudentChild[];
  upiId: string;
  payments: PaymentRecord[];
  showToast: (msg: string) => void;
}

export const DuesView: React.FC<DuesViewProps> = ({
  onNavigate,
  students,
  upiId,
  payments,
  showToast,
}) => {
  const dueStudents = students.filter((s) => s.dueAmount > 0);
  const totalDue = dueStudents.reduce((acc, curr) => acc + curr.dueAmount, 0);

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    showToast('UPI ID copied to clipboard');
  };

  const handleNotifyPaid = () => {
    showToast("Payment notification sent to studio owner Priya Sen");
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              Dues &amp; Payment Portal
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5">
              Zero platform fees. Pay directly to studio via UPI QR or cash.
            </p>
          </div>
        </div>

        {/* Due Balance Card */}
        <div className="bg-gradient-to-br from-[#6B2D5C] via-[#7B366B] to-[#8B4A78] rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-[#6B2D5C]/15 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E8B04B] bg-white/10 px-2.5 py-0.5 rounded-full">
              Total Outstanding Balance
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
              ₹{totalDue.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-white/80 mt-1">
              {totalDue > 0
                ? 'Pending for active dance training batches'
                : 'All dues cleared! No pending balance.'}
            </p>
          </div>

          {totalDue > 0 && (
            <button
              onClick={handleNotifyPaid}
              className="px-5 py-2.5 rounded-xl bg-[#E8B04B] text-[#1A1A1A] hover:bg-[#F0BF64] text-xs font-extrabold transition shadow-xs active:scale-98 shrink-0"
            >
              I&apos;ve Paid · Notify Studio
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct UPI Payment Section */}
          <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#F0ECE9]">
              <div className="w-8 h-8 rounded-xl bg-[#FAF2F7] text-[#6B2D5C] flex items-center justify-center">
                <QrCode size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">Instant UPI Payment</h3>
                <p className="text-[11px] text-[#6B6B6B]">Scan with GPay, PhonePe, Paytm, BHIM</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-[#FAF7F5] rounded-2xl border border-[#F0ECE9]">
              <QRCode upiId={upiId} amount={totalDue} size={150} />
              <p className="text-xs font-bold text-[#1A1A1A] mt-3">
                Scan to pay ₹{totalDue.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-[#6B6B6B]">Zero transaction fees applied</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Studio UPI VPA
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={upiId}
                  className="flex-1 bg-[#FAF7F5] border border-[#F0ECE9] rounded-xl px-3.5 py-2 text-xs font-mono font-semibold text-[#1A1A1A]"
                />
                <button
                  onClick={handleCopyUpi}
                  className="px-3.5 py-2 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <Copy size={13} />
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dues Breakdown & History */}
          <div className="space-y-6">
            {/* Student Breakdown */}
            <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                Fee Breakdown
              </h3>

              <div className="space-y-2">
                {dueStudents.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-[#E7F5EE] text-[#2E9E6B] text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>All fees have been settled for the current billing cycle!</span>
                  </div>
                ) : (
                  dueStudents.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#1A1A1A]">{s.name}</p>
                        <p className="text-[11px] text-[#6B6B6B]">September monthly batch fees</p>
                      </div>
                      <span className="text-sm font-extrabold text-[#C77F1A]">
                        ₹{s.dueAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Payment Receipts History */}
            <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                <Receipt size={14} className="text-[#6B2D5C]" />
                <span>Verified Payment History</span>
              </h3>

              <div className="space-y-2">
                {payments.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">
                        ₹{p.amount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-[11px] text-[#6B6B6B]">
                        {p.date} · via {p.method}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E7F5EE] text-[#2E9E6B]">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
        >
          <Bell size={18} className="mb-0.5" />
          <span>Alerts</span>
        </button>
        <button
          onClick={() => onNavigate('dues')}
          className="flex flex-col items-center text-[#6B2D5C] font-semibold text-[10px]"
        >
          <User size={18} className="mb-0.5" />
          <span>Me &amp; Dues</span>
        </button>
      </nav>
    </div>
  );
};
