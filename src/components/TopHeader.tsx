import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  CheckCheck,
  User,
  LogOut,
  Settings,
  Sparkles,
  Smartphone,
  Monitor,
  ArrowRightLeft,
  RotateCcw,
  Check,
  Calendar,
  Users as UsersIcon,
  CreditCard,
  ChevronDown,
} from 'lucide-react';
import { ScreenId, UserRole, Announcement, DanceClass, StudentChild } from '../types';

interface TopHeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  userRole: UserRole;
  onToggleRole: () => void;
  displayMode: 'phone' | 'full';
  onToggleDisplayMode: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
  onOpenMobileSidebar: () => void;
  announcements: Announcement[];
  onMarkAllAlertsRead: () => void;
  classes: DanceClass[];
  students: StudentChild[];
  onResetData: () => void;
  onSelectStudent: (id: string) => void;
  onSelectClass: (id: string) => void;
}

const SCREEN_TITLES: Record<ScreenId, { title: string; subtitle: string; category: string }> = {
  login: { title: 'Sign In', subtitle: 'Access Huaid Dance World Portal', category: 'Authentication' },
  otp: { title: 'Verify OTP', subtitle: 'Secure Phone Verification', category: 'Authentication' },
  dashboard: { title: 'Studio Dashboard', subtitle: 'Overview, schedules, and daily metrics', category: 'Studio Management' },
  classes: { title: 'Classes & Batches', subtitle: 'Manage dance curriculum and capacity', category: 'Studio Management' },
  roster: { title: 'Daily Attendance Roster', subtitle: 'Live class roll-call & check-in', category: 'Studio Management' },
  students: { title: 'Student Directory', subtitle: 'Enrollments, guardian contacts & fee status', category: 'Studio Management' },
  student: { title: 'Student Profile', subtitle: 'Personal dossier, ledger & attendance history', category: 'Studio Management' },
  payment: { title: 'Record Payment', subtitle: 'Issue receipts and update fee ledger', category: 'Studio Management' },
  reports: { title: 'Analytics & Reports', subtitle: 'Studio revenue, attendance rates & dues', category: 'Studio Management' },
  settings: { title: 'Studio Settings', subtitle: 'Business profile, UPI handle & studio policies', category: 'Studio Management' },
  home: { title: 'Student Portal', subtitle: 'Upcoming classes, reminders & announcements', category: 'Student / Parent' },
  schedule: { title: 'Class Timetable', subtitle: 'Browse available sessions and book a slot', category: 'Student / Parent' },
  class: { title: 'Class Information & Booking', subtitle: 'Curriculum details, venue and enrollment', category: 'Student / Parent' },
  bookings: { title: 'My Bookings', subtitle: 'Confirmed sessions and waitlist status', category: 'Student / Parent' },
  dues: { title: 'Dues & UPI Settlement', subtitle: 'Instant UPI QR and fee breakdown', category: 'Student / Parent' },
  alerts: { title: 'Notifications & Alerts', subtitle: 'Announcements, schedule alerts and billing notices', category: 'Student / Parent' },
};

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onToggleRole,
  displayMode,
  onToggleDisplayMode,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
  onOpenMobileSidebar,
  announcements,
  onMarkAllAlertsRead,
  classes,
  students,
  onResetData,
  onSelectStudent,
  onSelectClass,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadAlerts = announcements.filter((a) => !a.read);
  const screenInfo = SCREEN_TITLES[currentScreen] || {
    title: 'Huaid Dance World',
    subtitle: 'Dance Studio Management Suite',
    category: 'Application',
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search results
  const filteredStudents = searchQuery.trim()
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.enrolledClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.guardianName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredClasses = searchQuery.trim()
    ? classes.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-[#F0ECE9] px-3 sm:px-6 flex items-center justify-between shadow-xs select-none">
      {/* Left: Mobile Drawer Trigger, Desktop Collapse, Breadcrumb & Title */}
      <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation menu"
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[#1A1A1A] hover:bg-[#FAF7F5] border border-[#F0ECE9] transition"
        >
          <Menu size={18} />
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleSidebarCollapse}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden lg:flex w-9 h-9 rounded-xl items-center justify-center text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#FAF7F5] border border-[#F0ECE9] transition"
        >
          {isSidebarCollapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>

        {/* Breadcrumb and Header Title */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-[#9A9490] font-medium hidden sm:flex">
            <span>Huaid Dance World</span>
            <span>/</span>
            <span className="text-[#6B2D5C] font-semibold">{screenInfo.category}</span>
          </div>
          <h1 className="text-sm sm:text-base font-bold text-[#1A1A1A] tracking-tight truncate flex items-center gap-2">
            <span>{screenInfo.title}</span>
            {userRole === 'owner' ? (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF2F7] text-[#6B2D5C] border border-[#6B2D5C]/20">
                <Sparkles size={10} /> Owner Admin
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FDF6EA] text-[#C77F1A] border border-[#E8B04B]/30">
                Student & Parent
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Right Actions: Global Search, Role Switch, Display Mode, Notifications & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Global Search Bar */}
        <div ref={searchRef} className="relative">
          <button
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#FAF7F5] hover:bg-[#F2EDE9] border border-[#F0ECE9] text-xs text-[#6B6B6B] transition"
          >
            <Search size={14} className="text-[#9A9490]" />
            <span className="hidden md:inline font-medium">Quick find…</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9.5px] font-bold text-[#9A9490] bg-white border border-[#E5E0DC] rounded-md shadow-xs">
              ⌘K
            </kbd>
          </button>

          {/* Quick Find Popover */}
          {isSearchOpen && (
            <div className="absolute right-0 top-11 w-72 sm:w-88 bg-white rounded-2xl border border-[#F0ECE9] shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="relative mb-2.5">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9490]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search students, classes, parents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-[#FAF7F5] border border-[#F0ECE9] rounded-xl text-xs text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
                />
              </div>

              {searchQuery.trim() === '' ? (
                <div className="py-2 text-[11px] text-[#9A9490] space-y-2">
                  <p className="font-semibold uppercase tracking-wider text-[10px] text-[#6B6B6B] px-1">
                    Quick Navigation
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => {
                        onNavigate('roster');
                        setIsSearchOpen(false);
                      }}
                      className="text-left px-2 py-1.5 rounded-lg hover:bg-[#FAF7F5] text-xs font-medium text-[#1A1A1A] flex items-center gap-1.5"
                    >
                      <Calendar size={13} className="text-[#6B2D5C]" /> Mark Roster
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('students');
                        setIsSearchOpen(false);
                      }}
                      className="text-left px-2 py-1.5 rounded-lg hover:bg-[#FAF7F5] text-xs font-medium text-[#1A1A1A] flex items-center gap-1.5"
                    >
                      <UsersIcon size={13} className="text-[#6B2D5C]" /> All Students
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('payment');
                        setIsSearchOpen(false);
                      }}
                      className="text-left px-2 py-1.5 rounded-lg hover:bg-[#FAF7F5] text-xs font-medium text-[#1A1A1A] flex items-center gap-1.5"
                    >
                      <CreditCard size={13} className="text-[#6B2D5C]" /> Record Fees
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('schedule');
                        setIsSearchOpen(false);
                      }}
                      className="text-left px-2 py-1.5 rounded-lg hover:bg-[#FAF7F5] text-xs font-medium text-[#1A1A1A] flex items-center gap-1.5"
                    >
                      <Sparkles size={13} className="text-[#6B2D5C]" /> Class Timetable
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-2 no-scrollbar">
                  {filteredStudents.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A9490] px-1">
                        Students
                      </span>
                      <div className="space-y-1 mt-1">
                        {filteredStudents.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => {
                              onSelectStudent(s.id);
                              onNavigate('student');
                              setIsSearchOpen(false);
                            }}
                            className="p-2 rounded-xl hover:bg-[#FAF7F5] cursor-pointer flex items-center justify-between text-xs"
                          >
                            <div>
                              <p className="font-semibold text-[#1A1A1A]">{s.name}</p>
                              <p className="text-[10.5px] text-[#6B6B6B]">
                                {s.enrolledClass} · Guardian: {s.guardianName}
                              </p>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                s.dueAmount > 0
                                  ? 'bg-[#FDF3E2] text-[#C77F1A]'
                                  : 'bg-[#E7F5EE] text-[#2E9E6B]'
                              }`}
                            >
                              {s.dueAmount > 0 ? `Due ₹${s.dueAmount}` : 'Paid'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredClasses.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A9490] px-1">
                        Classes
                      </span>
                      <div className="space-y-1 mt-1">
                        {filteredClasses.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => {
                              onSelectClass(c.id);
                              onNavigate('classes');
                              setIsSearchOpen(false);
                            }}
                            className="p-2 rounded-xl hover:bg-[#FAF7F5] cursor-pointer flex items-center justify-between text-xs"
                          >
                            <div>
                              <p className="font-semibold text-[#1A1A1A]">
                                {c.icon} {c.name}
                              </p>
                              <p className="text-[10.5px] text-[#6B6B6B]">
                                {c.days} · {c.time}
                              </p>
                            </div>
                            <span className="text-[10.5px] text-[#6B2D5C] font-semibold">
                              {c.enrolledCount}/{c.totalSeats} seats
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredStudents.length === 0 && filteredClasses.length === 0 && (
                    <div className="py-6 text-center text-xs text-[#9A9490]">
                      No matching student or class found for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* View Mode Switcher (SaaS Canvas vs Mobile Simulator) */}
        <button
          onClick={onToggleDisplayMode}
          title={displayMode === 'full' ? 'Switch to Phone Simulator' : 'Switch to Full SaaS Canvas'}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FAF7F5] hover:bg-[#F2EDE9] border border-[#F0ECE9] text-xs font-semibold text-[#1A1A1A] transition"
        >
          {displayMode === 'full' ? (
            <>
              <Smartphone size={14} className="text-[#6B2D5C]" />
              <span className="hidden md:inline text-[11px]">Phone View</span>
            </>
          ) : (
            <>
              <Monitor size={14} className="text-[#6B2D5C]" />
              <span className="hidden md:inline text-[11px]">Full SaaS</span>
            </>
          )}
        </button>

        {/* Role Toggle Pill */}
        <button
          onClick={onToggleRole}
          title="Switch role between Owner and Student"
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-[#FAF2F7] hover:bg-[#F3E5EE] border border-[#6B2D5C]/20 text-[#6B2D5C] text-xs font-bold transition active:scale-98"
        >
          <ArrowRightLeft size={13} />
          <span className="hidden lg:inline">
            Role: {userRole === 'owner' ? 'Studio Owner' : 'Student'}
          </span>
          <span className="lg:hidden text-[11px] uppercase">
            {userRole === 'owner' ? 'Owner' : 'Student'}
          </span>
        </button>

        {/* Notifications Icon with Unread Badge & Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
            aria-label="Notifications"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#1A1A1A] hover:bg-[#FAF7F5] border border-[#F0ECE9] relative transition"
          >
            <Bell size={16} />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#D9534F] border-2 border-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {isNotificationsOpen && (
            <div className="absolute right-0 top-11 w-80 sm:w-96 bg-white rounded-2xl border border-[#F0ECE9] shadow-xl p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0ECE9]">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-[#1A1A1A]">Notifications</h3>
                  {unreadAlerts.length > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#6B2D5C] text-white">
                      {unreadAlerts.length} new
                    </span>
                  )}
                </div>
                {unreadAlerts.length > 0 && (
                  <button
                    onClick={() => {
                      onMarkAllAlertsRead();
                    }}
                    className="text-[11px] text-[#6B2D5C] hover:underline font-semibold flex items-center gap-1"
                  >
                    <CheckCheck size={12} /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 no-scrollbar">
                {announcements.slice(0, 5).map((ann) => (
                  <div
                    key={ann.id}
                    onClick={() => {
                      onNavigate('alerts');
                      setIsNotificationsOpen(false);
                    }}
                    className={`p-2.5 rounded-xl cursor-pointer transition flex gap-2.5 ${
                      ann.read ? 'hover:bg-[#FAF7F5] text-[#6B6B6B]' : 'bg-[#FAF2F7]/50 text-[#1A1A1A]'
                    }`}
                  >
                    <span className="text-base shrink-0 mt-0.5">
                      {ann.type === 'reminder'
                        ? '⏰'
                        : ann.type === 'payment'
                        ? '💳'
                        : ann.type === 'booking'
                        ? '🩰'
                        : '📣'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs truncate ${ann.read ? 'font-medium' : 'font-bold'}`}>
                          {ann.title}
                        </p>
                        {!ann.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6B2D5C] shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#6B6B6B] line-clamp-2 mt-0.5 leading-snug">
                        {ann.body}
                      </p>
                      <span className="text-[10px] text-[#9A9490] mt-1 block">{ann.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2.5 mt-2 border-t border-[#F0ECE9] text-center">
                <button
                  onClick={() => {
                    onNavigate('alerts');
                    setIsNotificationsOpen(false);
                  }}
                  className="text-xs text-[#6B2D5C] font-bold hover:underline"
                >
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile / Account Menu */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl hover:bg-[#FAF7F5] border border-transparent hover:border-[#F0ECE9] transition"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6B2D5C] to-[#8B4A78] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {userRole === 'owner' ? 'PS' : 'SS'}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-[#1A1A1A] leading-tight">
                {userRole === 'owner' ? 'Priya Sen' : 'Sunita Sharma'}
              </p>
              <p className="text-[10.5px] text-[#6B6B6B] leading-tight">
                {userRole === 'owner' ? 'Studio Owner' : 'Parent Account'}
              </p>
            </div>
            <ChevronDown size={14} className="text-[#9A9490] hidden md:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 top-11 w-56 bg-white rounded-2xl border border-[#F0ECE9] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-2 border-b border-[#F0ECE9] mb-1">
                <p className="text-xs font-bold text-[#1A1A1A]">
                  {userRole === 'owner' ? 'Priya Sen' : 'Sunita Sharma'}
                </p>
                <p className="text-[11px] text-[#6B6B6B]">
                  {userRole === 'owner' ? 'huaiddanceworld@dance.in' : '+91 98765 43210'}
                </p>
              </div>

              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    if (userRole === 'owner') onNavigate('settings');
                    else onNavigate('home');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FAF7F5] text-xs font-medium text-[#1A1A1A] flex items-center gap-2"
                >
                  <User size={14} className="text-[#6B2D5C]" />
                  <span>My Profile & Details</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('settings');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FAF7F5] text-xs font-medium text-[#1A1A1A] flex items-center gap-2"
                >
                  <Settings size={14} className="text-[#6B2D5C]" />
                  <span>Studio Settings</span>
                </button>

                <button
                  onClick={() => {
                    onToggleRole();
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FAF7F5] text-xs font-medium text-[#1A1A1A] flex items-center gap-2"
                >
                  <ArrowRightLeft size={14} className="text-[#E8B04B]" />
                  <span>
                    Switch to {userRole === 'owner' ? 'Student Portal' : 'Owner Admin'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    onResetData();
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FAF7F5] text-xs font-medium text-[#6B6B6B] flex items-center gap-2"
                >
                  <RotateCcw size={14} className="text-[#9A9490]" />
                  <span>Reset Demo Data</span>
                </button>

                <div className="h-px bg-[#F0ECE9] my-1" />

                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FDECEB] text-xs font-semibold text-[#D9534F] flex items-center gap-2"
                >
                  <LogOut size={14} />
                  <span>Sign Out / Lock</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
