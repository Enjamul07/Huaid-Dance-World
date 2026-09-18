import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  UserCheck,
  CreditCard,
  Phone,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Home,
  Calendar,
  BarChart3,
  Settings,
} from 'lucide-react';
import { ScreenId, StudentChild, AgeGroup } from '../../types';

interface StudentsViewProps {
  onNavigate: (screen: ScreenId) => void;
  students: StudentChild[];
  onOpenAddStudent: () => void;
  onSelectStudent: (studentId: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  onNavigate,
  students,
  onOpenAddStudent,
  onSelectStudent,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | AgeGroup | 'With dues'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.guardianPhone.includes(search) ||
      s.guardianName.toLowerCase().includes(search.toLowerCase()) ||
      s.enrolledClass.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'All') return true;
    if (filter === 'With dues') return s.feeStatus === 'due' || s.dueAmount > 0;
    return s.category === filter;
  });

  const unpaidStudents = students.filter((s) => s.dueAmount > 0);
  const totalDues = unpaidStudents.reduce((sum, s) => sum + s.dueAmount, 0);

  const handleStudentClick = (id: string) => {
    onSelectStudent(id);
    onNavigate('student');
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
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              Student Directory
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5">
              Active student enrollments, guardian contacts, class batches and fee ledgers.
            </p>
          </div>
          <button
            onClick={onOpenAddStudent}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition shadow-xs active:scale-98 shrink-0"
          >
            <Plus size={16} />
            <span>Register New Student</span>
          </button>
        </div>

        {/* Directory Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Total Students
            </span>
            <span className="text-2xl font-extrabold text-[#1A1A1A] mt-1 block">
              {students.length}
            </span>
            <span className="text-[11px] text-[#2E9E6B] font-semibold mt-0.5 block">
              100% active dancers
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Fee Compliant
            </span>
            <span className="text-2xl font-extrabold text-[#2E9E6B] mt-1 block">
              {students.length - unpaidStudents.length} Paid
            </span>
            <span className="text-[11px] text-[#6B6B6B] font-semibold mt-0.5 block">
              Up to date for September
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Accounts With Dues
            </span>
            <span className="text-2xl font-extrabold text-[#C77F1A] mt-1 block">
              {unpaidStudents.length} Students
            </span>
            <span className="text-[11px] text-[#C77F1A] font-semibold mt-0.5 block">
              ₹{totalDues.toLocaleString('en-IN')} pending
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs">
            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
              Avg Attendance
            </span>
            <span className="text-2xl font-extrabold text-[#6B2D5C] mt-1 block">91.4%</span>
            <span className="text-[11px] text-[#2E9E6B] font-semibold mt-0.5 block">
              Studio average
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#F0ECE9] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['All', 'Kids', 'Teens', 'Adult', 'With dues'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#6B2D5C] text-white shadow-xs'
                    : 'bg-[#FAF7F5] text-[#6B6B6B] hover:text-[#1A1A1A]'
                }`}
              >
                {cat === 'With dues' ? `With Dues (${unpaidStudents.length})` : cat}
              </button>
            ))}
          </div>

          {/* Search Input & View Switch */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-72">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9490]"
              />
              <input
                type="text"
                placeholder="Search name, phone or class..."
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

        {/* Students Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStudents.map((stu) => {
              const hasDue = stu.feeStatus === 'due' || stu.dueAmount > 0;

              return (
                <div
                  key={stu.id}
                  className="bg-white rounded-3xl p-5 border border-[#F0ECE9] shadow-xs hover:shadow-md hover:border-[#6B2D5C]/30 transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Header: Avatar, Name, Category */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getAvatarGradient(
                            stu.avatarColor
                          )} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs group-hover:scale-105 transition`}
                        >
                          {stu.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight truncate">
                            {stu.name}
                          </h3>
                          <span className="text-[11px] font-semibold text-[#6B6B6B] block">
                            {stu.category} · {stu.age} yrs · {stu.gender}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shrink-0 ${
                          hasDue
                            ? 'bg-[#FDF3E2] text-[#C77F1A] border border-[#E8B04B]/30'
                            : 'bg-[#E7F5EE] text-[#2E9E6B] border border-[#2E9E6B]/20'
                        }`}
                      >
                        {hasDue ? `Due ₹${stu.dueAmount}` : 'Paid'}
                      </span>
                    </div>

                    {/* Class & Guardian Details */}
                    <div className="space-y-2 py-3 border-y border-[#F0ECE9] text-xs text-[#6B6B6B]">
                      <div className="flex items-center gap-2">
                        <GraduationCap size={14} className="text-[#6B2D5C]" />
                        <span className="font-semibold text-[#1A1A1A]">{stu.enrolledClass}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-[#9A9490]" />
                        <span>
                          {stu.guardianName} ({stu.guardianPhone})
                        </span>
                      </div>
                      {stu.notes && (
                        <p className="text-[11px] text-[#9A9490] italic line-clamp-1 pt-0.5">
                          &ldquo;{stu.notes}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-4 pt-3 border-t border-[#F0ECE9] flex items-center gap-2">
                    <button
                      onClick={() => handleStudentClick(stu.id)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#FAF7F5] hover:bg-[#FAF2F7] text-[#1A1A1A] hover:text-[#6B2D5C] text-xs font-bold transition flex items-center justify-center gap-1.5 border border-[#F0ECE9]"
                    >
                      <UserCheck size={14} className="text-[#6B2D5C]" />
                      <span>View Dossier</span>
                    </button>

                    {hasDue ? (
                      <button
                        onClick={() => {
                          onSelectStudent(stu.id);
                          onNavigate('payment');
                        }}
                        className="py-2 px-3.5 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition shadow-xs active:scale-95"
                      >
                        Record Fee
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStudentClick(stu.id)}
                        className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F0ECE9] text-[#6B6B6B] transition border border-[#F0ECE9]"
                      >
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-3xl border border-[#F0ECE9] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F5] text-[#6B6B6B] uppercase font-bold text-[10px] tracking-wider border-b border-[#F0ECE9]">
                  <tr>
                    <th className="px-5 py-3.5">Student Name</th>
                    <th className="px-4 py-3.5">Category &amp; Age</th>
                    <th className="px-4 py-3.5">Enrolled Class</th>
                    <th className="px-4 py-3.5">Guardian &amp; Phone</th>
                    <th className="px-4 py-3.5">Fee Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE9]">
                  {filteredStudents.map((stu) => {
                    const hasDue = stu.feeStatus === 'due' || stu.dueAmount > 0;

                    return (
                      <tr key={stu.id} className="hover:bg-[#FAF7F5]/50 transition">
                        <td className="px-5 py-3.5 font-bold text-[#1A1A1A]">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${getAvatarGradient(
                                stu.avatarColor
                              )} text-white flex items-center justify-center font-bold text-xs shrink-0`}
                            >
                              {stu.name[0]}
                            </div>
                            <span>{stu.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-[#6B6B6B]">
                          {stu.category} · {stu.age} yrs
                        </td>
                        <td className="px-4 py-3.5 font-medium text-[#1A1A1A]">
                          {stu.enrolledClass}
                        </td>
                        <td className="px-4 py-3.5 text-[#6B6B6B]">
                          <div>{stu.guardianName}</div>
                          <span className="text-[10.5px] text-[#9A9490]">{stu.guardianPhone}</span>
                        </td>
                        <td className="px-4 py-3.5 font-bold">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              hasDue ? 'bg-[#FDF3E2] text-[#C77F1A]' : 'bg-[#E7F5EE] text-[#2E9E6B]'
                            }`}
                          >
                            {hasDue ? `Due ₹${stu.dueAmount}` : 'Paid'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleStudentClick(stu.id)}
                            className="px-3 py-1.5 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white font-bold text-xs transition"
                          >
                            View Profile
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
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
        >
          <Calendar size={18} className="mb-0.5" />
          <span>Classes</span>
        </button>
        <button
          onClick={() => onNavigate('students')}
          className="flex flex-col items-center text-[#6B2D5C] font-semibold text-[10px]"
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
