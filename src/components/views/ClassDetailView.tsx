import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Timer,
  CheckCircle2,
  Users,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ScreenId, DanceClass, StudentChild, Booking } from '../../types';

interface ClassDetailViewProps {
  onNavigate: (screen: ScreenId) => void;
  selectedClass: DanceClass | null;
  childrenList: StudentChild[];
  onConfirmBooking: (booking: Booking) => void;
  showToast: (msg: string) => void;
}

export const ClassDetailView: React.FC<ClassDetailViewProps> = ({
  onNavigate,
  selectedClass,
  childrenList,
  onConfirmBooking,
  showToast,
}) => {
  const cls = selectedClass || {
    id: 'cls-1',
    name: 'Ballet Kids',
    category: 'Kids',
    level: 'Ages 6–9 · Beginner',
    days: 'Mon · Wed · Fri',
    time: '6:00 PM – 7:00 PM',
    durationMinutes: 60,
    totalSeats: 12,
    enrolledCount: 8,
    monthlyFee: 2000,
    dropInFee: 800,
    instructor: 'Priya Sen',
    icon: '🩰',
    active: true,
  };

  const [selectedChildId, setSelectedChildId] = useState(
    childrenList[0]?.id || 'stu-1'
  );

  const selectedChild =
    childrenList.find((c) => c.id === selectedChildId) || childrenList[0];

  const handleBooking = () => {
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      classId: cls.id,
      className: cls.name,
      studentName: selectedChild ? selectedChild.name : 'Ananya Sharma',
      childId: selectedChild ? selectedChild.id : 'stu-1',
      dateTime: '2026-09-18T18:00:00',
      timeStr: cls.time,
      dateStr: 'Today · Tue 18 Sep',
      status: 'booked',
      fee: cls.dropInFee,
    };

    onConfirmBooking(newBooking);
    showToast('Class reservation confirmed! Reminder scheduled.');
    onNavigate('bookings');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('schedule')}
            className="w-10 h-10 rounded-2xl bg-white border border-[#F0ECE9] flex items-center justify-center text-[#1A1A1A] shadow-xs hover:bg-neutral-50 transition shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              Class Reservation
            </h2>
            <p className="text-xs text-[#6B6B6B]">Select attending dancer and confirm booking</p>
          </div>
        </div>

        {/* Class Banner Hero */}
        <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF2F7] border border-[#F0ECE9] flex items-center justify-center text-3xl shrink-0">
              {cls.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight">{cls.name}</h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF2F7] text-[#6B2D5C]">
                  {cls.category}
                </span>
              </div>
              <p className="text-xs text-[#6B6B6B] mt-1 font-medium">{cls.level}</p>
              <div className="flex items-center gap-4 text-xs text-[#6B6B6B] mt-2 flex-wrap font-medium">
                <span className="flex items-center gap-1 text-[#1A1A1A]">
                  <Clock size={13} className="text-[#6B2D5C]" />
                  {cls.time}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Timer size={13} className="text-[#9A9490]" />
                  {cls.durationMinutes} mins
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Users size={13} className="text-[#9A9490]" />
                  Lead: {cls.instructor}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Select Student / Child */}
        <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
            Who is attending this session?
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {childrenList.slice(0, 2).map((child) => {
              const isSelected = selectedChildId === child.id;
              return (
                <div
                  key={child.id}
                  onClick={() => setSelectedChildId(child.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#FAF2F7] border-[#6B2D5C] ring-2 ring-[#6B2D5C]/20 shadow-xs'
                      : 'bg-[#FAF7F5] border-[#F0ECE9] hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B2D5C] to-[#8B4A78] text-white flex items-center justify-center font-bold text-xs">
                      {child.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">{child.name}</p>
                      <p className="text-[11px] text-[#6B6B6B]">{child.age} yrs · Enrolled</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected
                        ? 'border-[#6B2D5C] bg-[#6B2D5C] text-white'
                        : 'border-neutral-300'
                    }`}
                  >
                    {isSelected && <CheckCircle2 size={12} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment & Studio Terms */}
        <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-4">
          <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
            Fee &amp; Payment Details
          </h4>

          <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-[#1A1A1A]">₹{cls.dropInFee}</p>
              <p className="text-xs text-[#6B6B6B]">Drop-in fee (payable at studio via UPI QR or cash)</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#EAF1F9] text-[#3B6FA8] text-xs font-bold">
              Pay at Studio
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
            <ShieldCheck size={16} className="text-[#2E9E6B] shrink-0" />
            <span>Free cancellation up to 4 hours before the session starts.</span>
          </div>

          <button
            onClick={handleBooking}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white font-bold text-xs tracking-tight transition active:scale-98 shadow-sm flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            <span>Confirm Class Booking</span>
          </button>
        </div>
      </div>
    </div>
  );
};
