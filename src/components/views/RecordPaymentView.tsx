import React, { useState } from 'react';
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  Building,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Receipt,
  FileCheck,
  Search,
} from 'lucide-react';
import { ScreenId, StudentChild, PaymentRecord, PaymentMethod, PaymentStatus } from '../../types';

interface RecordPaymentViewProps {
  onNavigate: (screen: ScreenId) => void;
  students: StudentChild[];
  payments?: PaymentRecord[];
  onAddPayment?: (p: Omit<PaymentRecord, 'id'>) => void;
  onSavePayment?: (
    studentId: string,
    amount: number,
    method: PaymentMethod,
    notes?: string
  ) => void;
  initialStudentId?: string;
  selectedStudentId?: string;
  showToast?: (msg: string) => void;
}

export const RecordPaymentView: React.FC<RecordPaymentViewProps> = ({
  onNavigate,
  students,
  payments = [],
  onAddPayment,
  onSavePayment,
  initialStudentId,
  selectedStudentId,
  showToast,
}) => {
  const effectiveInitialId = selectedStudentId || initialStudentId;
  const defaultStudent =
    students.find((s) => s.id === effectiveInitialId) ||
    students.find((s) => s.feeStatus === 'due') ||
    students[0];

  const [studentId, setStudentId] = useState(defaultStudent?.id || students[0]?.id || '');
  const [amount, setAmount] = useState<string>(
    defaultStudent?.dueAmount ? String(defaultStudent.dueAmount) : '2000'
  );
  const [method, setMethod] = useState<PaymentMethod>('UPI');
  const [status, setStatus] = useState<PaymentStatus>('Paid');
  const [note, setNote] = useState('September 2026 Monthly Tuition Fee');
  const [date, setDate] = useState('18 Sep 2026');

  const selectedStudent = students.find((s) => s.id === studentId);

  const handleStudentChange = (id: string) => {
    setStudentId(id);
    const stu = students.find((s) => s.id === id);
    if (stu && stu.dueAmount > 0) {
      setAmount(String(stu.dueAmount));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;

    if (onSavePayment) {
      onSavePayment(studentId, num, method, note);
    } else if (onAddPayment) {
      onAddPayment({
        studentId,
        studentName: selectedStudent?.name || 'Student',
        amount: num,
        date,
        method,
        status,
        note,
      });
      if (showToast) {
        showToast(`Payment of ₹${num.toLocaleString('en-IN')} recorded successfully`);
      }
    }
    onNavigate('reports');
  };

  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);
  const unpaidStudents = students.filter((s) => s.dueAmount > 0);
  const totalDues = unpaidStudents.reduce((acc, s) => acc + s.dueAmount, 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-10 h-10 rounded-2xl bg-white border border-[#F0ECE9] flex items-center justify-center text-[#1A1A1A] shadow-xs hover:bg-neutral-50 transition shrink-0"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
                Studio Fee Desk &amp; Payment Ledger
              </h2>
              <p className="text-xs text-[#6B6B6B]">
                Record manual receipts (UPI, Cash, Bank) and track outstanding student dues.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('reports')}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#F0ECE9] text-[#6B2D5C] hover:bg-[#FAF2F7] text-xs font-bold transition shadow-xs"
            >
              Financial Reports →
            </button>
          </div>
        </div>

        {/* Top Mini Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#F0ECE9] shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
              Total Collections
            </span>
            <div className="text-2xl font-extrabold text-[#2E9E6B] mt-1">
              ₹{totalCollected.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-[#6B6B6B] mt-0.5">{payments.length} verified vouchers</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#F0ECE9] shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
              Outstanding Receivables
            </span>
            <div className="text-2xl font-extrabold text-[#C77F1A] mt-1">
              ₹{totalDues.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-[#C77F1A] mt-0.5">{unpaidStudents.length} students pending</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#F0ECE9] shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
              Preferred Mode
            </span>
            <div className="text-2xl font-extrabold text-[#6B2D5C] mt-1">UPI (78%)</div>
            <p className="text-[11px] text-[#6B6B6B] mt-0.5">Google Pay / PhonePe / Paytm</p>
          </div>
        </div>

        {/* Two Column Layout: Form on Left, Ledger on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Payment Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#F0ECE9] shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2">
                <Receipt size={18} className="text-[#6B2D5C]" />
                <span>Issue &amp; Record Payment Receipt</span>
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-0.5">
                Fill the details below to mark the student balance cleared and log in studio accounts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Select */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Select Student
                </label>
                <select
                  value={studentId}
                  onChange={(e) => handleStudentChange(e.target.value)}
                  className="w-full bg-[#FAF7F5] border border-[#F0ECE9] rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {s.enrolledClass} {s.dueAmount > 0 ? `(Pending ₹${s.dueAmount})` : '(Paid)'}
                    </option>
                  ))}
                </select>

                {selectedStudent && selectedStudent.dueAmount > 0 && (
                  <div className="mt-2 p-2.5 rounded-xl bg-[#FDF3E2] border border-[#E8B04B]/30 flex items-center justify-between text-xs">
                    <span className="text-[#C77F1A] font-semibold">
                      Current balance due: <b>₹{selectedStudent.dueAmount}</b>
                    </span>
                    <button
                      type="button"
                      onClick={() => setAmount(String(selectedStudent.dueAmount))}
                      className="text-[11px] font-bold text-[#6B2D5C] underline"
                    >
                      Fill full amount
                    </button>
                  </div>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Payment Amount (INR)
                </label>
                <div className="flex items-center">
                  <span className="py-2.5 px-4 bg-[#FAF7F5] border border-r-0 border-[#F0ECE9] rounded-l-2xl text-sm font-bold text-[#6B6B6B]">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="2000"
                    className="w-full bg-white border border-[#F0ECE9] rounded-r-2xl py-2.5 px-4 text-sm font-bold text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] transition"
                  />
                </div>
                {/* Quick amount chips */}
                <div className="flex items-center gap-1.5 mt-2">
                  {['1500', '2000', '2500', '3500'].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setAmount(preset)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                        amount === preset
                          ? 'bg-[#6B2D5C] text-white border-[#6B2D5C]'
                          : 'bg-[#FAF7F5] text-[#6B6B6B] border-[#F0ECE9] hover:bg-[#F0ECE9]'
                      }`}
                    >
                      ₹{preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Method Selection */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Payment Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'UPI', label: 'UPI / QR', icon: Smartphone },
                      { id: 'Cash', label: 'Cash In Hand', icon: Banknote },
                      { id: 'Bank', label: 'Bank Transfer', icon: Building },
                    ] as const
                  ).map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1.5 ${
                          method === m.id
                            ? 'bg-[#FAF2F7] border-[#6B2D5C] text-[#6B2D5C] shadow-xs'
                            : 'bg-[#FAF7F5] border-[#F0ECE9] text-[#6B6B6B] hover:bg-neutral-50'
                        }`}
                      >
                        <Icon size={18} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Payment Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Paid', 'Partial', 'Pending'] as const).map((st) => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setStatus(st)}
                      className={`py-2 rounded-xl text-xs font-bold transition border ${
                        status === st
                          ? 'bg-[#6B2D5C] text-white border-[#6B2D5C]'
                          : 'bg-[#FAF7F5] text-[#6B6B6B] border-[#F0ECE9] hover:bg-[#F0ECE9]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note and Date in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                    Description / Note
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. September fees"
                    className="w-full bg-[#FAF7F5] border border-[#F0ECE9] rounded-2xl px-4 py-2.5 text-xs text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                    Transaction Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FAF7F5] border border-[#F0ECE9] rounded-2xl px-4 py-2.5 text-xs text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white font-bold text-xs tracking-tight transition active:scale-98 shadow-sm flex items-center justify-center gap-2"
                >
                  <FileCheck size={16} />
                  <span>Confirm &amp; Record Payment Receipt</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Pending Dues & Recent Ledger (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Pending Dues to Clear */}
            <div className="bg-white rounded-3xl p-5 border border-[#F0ECE9] shadow-xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F0ECE9]">
                <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-[#C77F1A]" />
                  <span>Pending Dues Roster</span>
                </h3>
                <span className="text-[10.5px] font-bold text-[#C77F1A]">
                  {unpaidStudents.length} Students
                </span>
              </div>

              <div className="space-y-2">
                {unpaidStudents.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleStudentChange(s.id)}
                    className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      studentId === s.id
                        ? 'bg-[#FAF2F7] border-[#6B2D5C]'
                        : 'bg-[#FAF7F5] border-[#F0ECE9] hover:bg-neutral-100'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">{s.name}</p>
                      <p className="text-[10.5px] text-[#6B6B6B]">{s.enrolledClass}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#C77F1A] block">
                        ₹{s.dueAmount}
                      </span>
                      <span className="text-[10px] text-[#6B2D5C] font-semibold">Select</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Payments Stream */}
            <div className="bg-white rounded-3xl p-5 border border-[#F0ECE9] shadow-xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F0ECE9]">
                <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  Recent Studio Receipts
                </h3>
                <span className="text-[10.5px] text-[#9A9490]">Live sync</span>
              </div>

              <div className="space-y-2.5">
                {payments.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#1A1A1A]">{p.studentName}</p>
                      <p className="text-[10.5px] text-[#6B6B6B]">
                        {p.date} · {p.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-[#1A1A1A]">
                        ₹{p.amount.toLocaleString('en-IN')}
                      </p>
                      <span className="text-[10px] font-bold text-[#2E9E6B]">{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
