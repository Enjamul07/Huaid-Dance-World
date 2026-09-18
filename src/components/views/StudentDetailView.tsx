import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit2,
  Phone,
  Calendar,
  CreditCard,
  GraduationCap,
  Copy,
  Check,
  Share2,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ScreenId, StudentChild, PaymentRecord } from '../../types';

interface StudentDetailViewProps {
  onNavigate: (screen: ScreenId) => void;
  selectedStudentId: string;
  students: StudentChild[];
  payments: PaymentRecord[];
  showToast: (msg: string) => void;
  onSetPaymentStudent: (studentId: string) => void;
}

export const StudentDetailView: React.FC<StudentDetailViewProps> = ({
  onNavigate,
  selectedStudentId,
  students,
  payments,
  showToast,
  onSetPaymentStudent,
}) => {
  const student = students.find((s) => s.id === selectedStudentId) || students[0];
  const [activeSubtab, setActiveSubtab] = useState<'Bookings' | 'Payments' | 'Notes'>('Bookings');
  const [copiedCode, setCopiedCode] = useState(false);

  const studentPayments = payments.filter(
    (p) => p.studentId === student.id || p.studentName === student.name
  );

  const handleRecordPayment = () => {
    onSetPaymentStudent(student.id);
    onNavigate('payment');
  };

  const handleCopyInviteCode = () => {
    navigator.clipboard?.writeText(`HUAID-${student.name.slice(0, 3).toUpperCase()}-77`);
    setCopiedCode(true);
    showToast(`Invite code copied: HUAID-${student.name.slice(0, 3).toUpperCase()}-77`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getAvatarGradient = (color: string) => {
    switch (color) {
      case 'gold':
        return 'from-[#D99B33] to-[#E8B04B]';
      case 'blue':
        return 'from-[#35608F] to-[#5B8FC7]';
      case 'green':
        return 'from-[#25855A] to-[#4BB98A]';
      default:
        return 'from-[#6B2D5C] to-[#8B4A78]';
    }
  };

  const hasDue = student.feeStatus === 'due' || student.dueAmount > 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('students')}
              className="w-10 h-10 rounded-2xl bg-white border border-[#F0ECE9] flex items-center justify-center text-[#1A1A1A] shadow-xs hover:bg-neutral-50 transition shrink-0"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
                Student Profile Dossier
              </h2>
              <p className="text-xs text-[#6B6B6B]">
                ID: {student.id} · Enrolled in {student.enrolledClass}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Guardian notification triggered via WhatsApp')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#F0ECE9] text-[#1A1A1A] hover:bg-[#FAF7F5] text-xs font-bold transition shadow-xs"
            >
              <Share2 size={14} className="text-[#6B2D5C]" />
              <span>Share Invite</span>
            </button>
            <button
              onClick={handleRecordPayment}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition shadow-xs active:scale-98"
            >
              <CreditCard size={14} />
              <span>Record Fee</span>
            </button>
          </div>
        </div>

        {/* Top Profile Summary Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br ${getAvatarGradient(
                  student.avatarColor
                )} text-white flex items-center justify-center font-extrabold text-xl sm:text-2xl shadow-md shrink-0`}
              >
                {student.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
                    {student.name}
                  </h3>
                  <span
                    className={`text-[11px] font-extrabold px-3 py-0.5 rounded-full ${
                      hasDue
                        ? 'bg-[#FDF3E2] text-[#C77F1A] border border-[#E8B04B]/30'
                        : 'bg-[#E7F5EE] text-[#2E9E6B] border border-[#2E9E6B]/20'
                    }`}
                  >
                    {hasDue ? `Fee Due: ₹${student.dueAmount}` : 'Fee Paid: All Clear'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
                  {student.category} Group · {student.age} years old · {student.gender}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#6B6B6B] mt-2 flex-wrap">
                  <span className="flex items-center gap-1 text-[#1A1A1A] font-semibold">
                    <GraduationCap size={14} className="text-[#6B2D5C]" />
                    {student.enrolledClass}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Phone size={14} className="text-[#9A9490]" />
                    {student.guardianName} ({student.guardianPhone})
                  </span>
                </div>
              </div>
            </div>

            {/* Parent Invite Code Badge */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] sm:text-right shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] block">
                Parent Linking Code
              </span>
              <div className="flex items-center gap-2 mt-1 sm:justify-end">
                <code className="text-xs font-extrabold text-[#6B2D5C] tracking-wide bg-white px-2 py-1 rounded-lg border border-[#F0ECE9]">
                  HUAID-{student.name.slice(0, 3).toUpperCase()}-77
                </code>
                <button
                  onClick={handleCopyInviteCode}
                  title="Copy code"
                  className="p-1.5 rounded-lg bg-white hover:bg-neutral-100 text-[#6B6B6B] transition border border-[#F0ECE9]"
                >
                  {copiedCode ? (
                    <Check size={14} className="text-[#2E9E6B]" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
              <span className="text-[10px] text-[#9A9490] mt-1 block">
                Share with parent for phone sync
              </span>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#F0ECE9] pb-3">
            <div className="flex items-center gap-2">
              {(['Bookings', 'Payments', 'Notes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubtab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeSubtab === tab
                      ? 'bg-[#6B2D5C] text-white shadow-xs'
                      : 'bg-[#FAF7F5] text-[#6B6B6B] hover:text-[#1A1A1A]'
                  }`}
                >
                  {tab === 'Bookings'
                    ? 'Attendance & Schedule'
                    : tab === 'Payments'
                    ? `Payment History (${studentPayments.length})`
                    : 'Teacher Notes'}
                </button>
              ))}
            </div>

            {activeSubtab === 'Payments' && hasDue && (
              <button
                onClick={handleRecordPayment}
                className="text-xs font-bold text-[#6B2D5C] hover:underline"
              >
                + Record new payment
              </button>
            )}
          </div>

          {/* Tab 1: Bookings & Attendance */}
          {activeSubtab === 'Bookings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upcoming */}
              <div>
                <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Clock size={14} className="text-[#3B6FA8]" />
                  <span>Upcoming Scheduled Sessions</span>
                </h4>
                <div className="space-y-2.5">
                  <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#F0ECE9] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">Ballet Kids</p>
                      <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                        Today · Tue 18 Sep · 6:00 – 7:00 PM
                      </p>
                    </div>
                    <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF1F9] text-[#3B6FA8]">
                      Confirmed
                    </span>
                  </div>

                  <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#F0ECE9] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">Ballet Kids</p>
                      <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                        Fri 21 Sep · 6:00 – 7:00 PM
                      </p>
                    </div>
                    <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF1F9] text-[#3B6FA8]">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

              {/* Past Attendance */}
              <div>
                <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#2E9E6B]" />
                  <span>Past Session History</span>
                </h4>
                <div className="space-y-2.5">
                  <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#F0ECE9] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">Ballet Kids</p>
                      <p className="text-[11px] text-[#6B6B6B] mt-0.5">Mon 17 Sep · 6:00 PM</p>
                    </div>
                    <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#E7F5EE] text-[#2E9E6B] flex items-center gap-1">
                      <CheckCircle2 size={12} /> Present
                    </span>
                  </div>

                  <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#F0ECE9] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">Ballet Kids</p>
                      <p className="text-[11px] text-[#6B6B6B] mt-0.5">Fri 14 Sep · 6:00 PM</p>
                    </div>
                    <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#F1EFED] text-[#6B6B6B] flex items-center gap-1">
                      <XCircle size={12} /> Absent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Payments Ledger */}
          {activeSubtab === 'Payments' && (
            <div className="space-y-3">
              {studentPayments.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#9A9490] bg-[#FAF7F5] rounded-2xl border border-[#F0ECE9]">
                  No prior payments recorded for {student.name}.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="text-[#6B6B6B] font-bold uppercase text-[10px] tracking-wider border-b border-[#F0ECE9]">
                      <tr>
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5">Description</th>
                        <th className="py-2.5">Method</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE9]">
                      {studentPayments.map((p) => (
                        <tr key={p.id}>
                          <td className="py-3 font-semibold text-[#1A1A1A]">{p.date}</td>
                          <td className="py-3 text-[#6B6B6B]">{p.note || 'Class fee'}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-md bg-[#FAF7F5] text-[#1A1A1A] font-semibold border border-[#F0ECE9]">
                              {p.method}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="text-[#2E9E6B] font-bold">{p.status}</span>
                          </td>
                          <td className="py-3 text-right font-extrabold text-[#1A1A1A]">
                            ₹{p.amount.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Instructor Notes */}
          {activeSubtab === 'Notes' && (
            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] text-xs text-[#1A1A1A] leading-relaxed">
                <p className="font-bold text-[#6B2D5C] mb-1">Dance Technique &amp; Progress Notes:</p>
                <p className="text-[#6B6B6B]">
                  {student.notes ||
                    'Student exhibits strong musicality and rhythmic discipline. Recommend practicing turnout position at home.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-[#9A9490]">
                <span>Last updated: 15 Sep 2026 by Priya Sen</span>
                <button
                  onClick={() => showToast('Notes edit prompt')}
                  className="text-[#6B2D5C] hover:underline font-bold"
                >
                  Edit Remarks
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
