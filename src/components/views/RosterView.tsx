import React, { useState } from 'react';
import {
  ArrowLeft,
  UserPlus,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  Calendar,
  Sparkles,
  Users,
  CheckCheck,
  AlertCircle,
  Home,
  BarChart3,
  Settings,
} from 'lucide-react';
import { ScreenId, DanceClass, StudentChild, AttendanceStatus } from '../../types';

interface RosterViewProps {
  onNavigate: (screen: ScreenId) => void;
  selectedClassId: string;
  classes: DanceClass[];
  students: StudentChild[];
  showToast: (msg: string) => void;
  onOpenAddWalkin: () => void;
}

export const RosterView: React.FC<RosterViewProps> = ({
  onNavigate,
  selectedClassId,
  classes,
  students,
  showToast,
  onOpenAddWalkin,
}) => {
  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  // Filter students enrolled or matching this class
  const classStudents = students.filter(
    (s) =>
      s.classId === currentClass.id ||
      s.enrolledClass.toLowerCase().includes(currentClass.name.toLowerCase().split(' ')[0])
  );

  const displayStudents = classStudents.length > 0 ? classStudents : students.slice(0, 5);

  // Local attendance state
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({
    'stu-1': 'present',
    'stu-2': null,
    'stu-4': 'present',
    'stu-5': null,
  });

  const [statusFilter, setStatusFilter] = useState<'All' | 'present' | 'absent' | 'makeup' | 'unmarked'>('All');

  const toggleStatus = (studentId: string, status: 'present' | 'absent' | 'makeup') => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status,
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, AttendanceStatus> = {};
    displayStudents.forEach((s) => {
      updated[s.id] = 'present';
    });
    setAttendance((prev) => ({ ...prev, ...updated }));
    showToast('Marked all students as Present');
  };

  const handleClearAll = () => {
    const updated: Record<string, AttendanceStatus> = {};
    displayStudents.forEach((s) => {
      updated[s.id] = null;
    });
    setAttendance((prev) => ({ ...prev, ...updated }));
    showToast('Cleared roll call for this session');
  };

  const presentCount = displayStudents.filter((s) => attendance[s.id] === 'present').length;
  const absentCount = displayStudents.filter((s) => attendance[s.id] === 'absent').length;
  const makeupCount = displayStudents.filter((s) => attendance[s.id] === 'makeup').length;
  const markedCount = displayStudents.filter((s) => attendance[s.id] !== null && attendance[s.id] !== undefined).length;
  const attendancePct = displayStudents.length > 0 ? Math.round((presentCount / displayStudents.length) * 100) : 0;

  const filteredStudents = displayStudents.filter((s) => {
    const st = attendance[s.id] || null;
    if (statusFilter === 'All') return true;
    if (statusFilter === 'unmarked') return st === null;
    return st === statusFilter;
  });

  const handleCompleteSession = () => {
    showToast(`Session saved: ${presentCount} Present, ${absentCount} Absent, ${makeupCount} Makeup`);
    setTimeout(() => {
      onNavigate('classes');
    }, 450);
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

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Header & Class Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('classes')}
              className="w-10 h-10 rounded-2xl bg-white border border-[#F0ECE9] flex items-center justify-center text-[#1A1A1A] shadow-xs hover:bg-neutral-50 transition shrink-0"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentClass.icon}</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
                  {currentClass.name}
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF2F7] text-[#6B2D5C] border border-[#6B2D5C]/20">
                  {currentClass.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mt-0.5">
                <span>Tue, 18 Sep 2026</span>
                <span>·</span>
                <span>{currentClass.time}</span>
                <span>·</span>
                <span>Instructor: {currentClass.instructor}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAddWalkin}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#F0ECE9] text-[#1A1A1A] hover:bg-[#FAF7F5] text-xs font-bold transition shadow-xs active:scale-98"
            >
              <UserPlus size={14} className="text-[#6B2D5C]" />
              <span>Add Walk-in</span>
            </button>

            <button
              onClick={handleCompleteSession}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition shadow-xs active:scale-98"
            >
              <CheckCheck size={15} />
              <span>Save &amp; Finish</span>
            </button>
          </div>
        </div>

        {/* Attendance Summary Dashboard Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Present
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-[#2E9E6B]">{presentCount}</span>
              <span className="text-xs font-bold text-[#2E9E6B]">({attendancePct}%)</span>
            </div>
            <span className="text-[10.5px] text-[#9A9490] mt-0.5 block">Attending today</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Absent
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-[#D9534F]">{absentCount}</span>
            </div>
            <span className="text-[10.5px] text-[#9A9490] mt-0.5 block">Marked absent</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Makeup Pass
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-[#3B6FA8]">{makeupCount}</span>
            </div>
            <span className="text-[10.5px] text-[#9A9490] mt-0.5 block">Rescheduled session</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Total Roll Call
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-[#1A1A1A]">
                {markedCount} / {displayStudents.length}
              </span>
            </div>
            <span className="text-[10.5px] text-[#9A9490] mt-0.5 block">
              {displayStudents.length - markedCount} unmarked remaining
            </span>
          </div>
        </div>

        {/* Quick Batch Tools & Filter Tabs */}
        <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'All', label: `All (${displayStudents.length})` },
                { id: 'present', label: `Present (${presentCount})` },
                { id: 'absent', label: `Absent (${absentCount})` },
                { id: 'makeup', label: `Makeup (${makeupCount})` },
                { id: 'unmarked', label: `Unmarked (${displayStudents.length - markedCount})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  statusFilter === tab.id
                    ? 'bg-[#6B2D5C] text-white shadow-xs'
                    : 'bg-[#FAF7F5] text-[#6B6B6B] hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Bulk Marking Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllPresent}
              className="px-3 py-1.5 rounded-xl bg-[#E7F5EE] hover:bg-[#D5EFE3] text-[#2E9E6B] text-xs font-bold transition"
            >
              Mark All Present
            </button>
            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 rounded-xl bg-[#FAF7F5] hover:bg-[#F0ECE9] text-[#6B6B6B] text-xs font-bold transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Student Roster Cards List */}
        <div className="space-y-3">
          {filteredStudents.map((stu) => {
            const status = attendance[stu.id] || null;

            return (
              <div
                key={stu.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F0ECE9] shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Student Info */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getAvatarGradient(
                      stu.avatarColor
                    )} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}
                  >
                    {stu.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A] tracking-tight">
                        {stu.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-[#6B6B6B]">
                        {stu.age} yrs · {stu.gender}
                      </span>
                      {stu.dueAmount > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FDF3E2] text-[#C77F1A] border border-[#E8B04B]/30">
                          <AlertCircle size={10} />
                          <span>Due ₹{stu.dueAmount}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">
                      Guardian: {stu.guardianName} ({stu.guardianPhone})
                    </p>
                    {stu.notes && (
                      <p className="text-[11px] text-[#9A9490] mt-0.5 italic truncate max-w-md">
                        &ldquo;{stu.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* 3 Interactive Attendance Buttons */}
                <div className="flex items-center gap-2 shrink-0 justify-end">
                  {/* Present Button */}
                  <button
                    onClick={() => toggleStatus(stu.id, 'present')}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 ${
                      status === 'present'
                        ? 'bg-[#2E9E6B] text-white ring-2 ring-[#2E9E6B]/20'
                        : 'bg-[#FAF7F5] text-[#6B6B6B] hover:bg-[#E7F5EE] hover:text-[#2E9E6B] border border-[#F0ECE9]'
                    }`}
                  >
                    <CheckCircle2 size={15} />
                    <span>Present</span>
                  </button>

                  {/* Absent Button */}
                  <button
                    onClick={() => toggleStatus(stu.id, 'absent')}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 ${
                      status === 'absent'
                        ? 'bg-[#D9534F] text-white ring-2 ring-[#D9534F]/20'
                        : 'bg-[#FAF7F5] text-[#6B6B6B] hover:bg-[#FDECEB] hover:text-[#D9534F] border border-[#F0ECE9]'
                    }`}
                  >
                    <XCircle size={15} />
                    <span>Absent</span>
                  </button>

                  {/* Makeup Button */}
                  <button
                    onClick={() => toggleStatus(stu.id, 'makeup')}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 ${
                      status === 'makeup'
                        ? 'bg-[#3B6FA8] text-white ring-2 ring-[#3B6FA8]/20'
                        : 'bg-[#FAF7F5] text-[#6B6B6B] hover:bg-[#EAF1F9] hover:text-[#3B6FA8] border border-[#F0ECE9]'
                    }`}
                  >
                    <RotateCcw size={15} />
                    <span>Makeup</span>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredStudents.length === 0 && (
            <div className="bg-white rounded-3xl p-8 border border-[#F0ECE9] text-center text-xs text-[#9A9490]">
              No students match the status filter &quot;{statusFilter}&quot;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
