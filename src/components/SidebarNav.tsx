import React from 'react';
import {
  ScreenId,
  UserRole,
  Announcement,
  StudentChild,
} from '../types';
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardCheck,
  Users,
  UserCheck,
  CreditCard,
  BarChart3,
  Settings,
  Home,
  Calendar,
  Sparkles,
  Ticket,
  ReceiptIndianRupee,
  Bell,
  LogIn,
  ShieldCheck,
  LogOut,
  Smartphone,
  Monitor,
  RotateCcw,
  ArrowRightLeft,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  userRole: UserRole;
  onToggleRole: () => void;
  displayMode: 'phone' | 'full';
  onToggleDisplayMode: () => void;
  onResetData: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
  announcements?: Announcement[];
  students?: StudentChild[];
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onToggleRole,
  displayMode,
  onToggleDisplayMode,
  onResetData,
  isCollapsed = false,
  onToggleCollapse,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer,
  announcements = [],
  students = [],
}) => {
  const unreadCount = announcements.filter((a) => !a.read).length;
  const unpaidCount = students.filter((s) => s.dueAmount > 0).length;

  const navSections = [
    {
      title: 'Studio Management',
      subtitle: 'Owner Suite',
      badge: 'Admin',
      screens: [
        {
          id: 'dashboard' as ScreenId,
          label: 'Dashboard',
          screenNum: '3',
          icon: LayoutDashboard,
          badgeText: undefined,
        },
        {
          id: 'classes' as ScreenId,
          label: 'Classes & Batches',
          screenNum: '4',
          icon: CalendarDays,
          badgeText: undefined,
        },
        {
          id: 'roster' as ScreenId,
          label: 'Attendance Roster',
          screenNum: '5',
          icon: ClipboardCheck,
          badgeText: 'Live',
        },
        {
          id: 'students' as ScreenId,
          label: 'Students',
          screenNum: '6',
          icon: Users,
          badgeText: `${students.length}`,
        },
        {
          id: 'student' as ScreenId,
          label: 'Student Profile',
          screenNum: '7',
          icon: UserCheck,
          badgeText: undefined,
        },
        {
          id: 'payment' as ScreenId,
          label: 'Record Payment',
          screenNum: '8',
          icon: CreditCard,
          badgeText: unpaidCount > 0 ? `${unpaidCount} Due` : undefined,
          badgeColor: 'amber',
        },
        {
          id: 'reports' as ScreenId,
          label: 'Analytics & Reports',
          screenNum: '9',
          icon: BarChart3,
          badgeText: undefined,
        },
        {
          id: 'settings' as ScreenId,
          label: 'Studio Settings',
          screenNum: '10',
          icon: Settings,
          badgeText: undefined,
        },
      ],
    },
    {
      title: 'Student Portal',
      subtitle: 'Parent & Dancer Experience',
      badge: 'Portal',
      screens: [
        {
          id: 'home' as ScreenId,
          label: 'Student Home',
          screenNum: '11',
          icon: Home,
          badgeText: undefined,
        },
        {
          id: 'schedule' as ScreenId,
          label: 'Class Timetable',
          screenNum: '12',
          icon: Calendar,
          badgeText: undefined,
        },
        {
          id: 'class' as ScreenId,
          label: 'Class Detail',
          screenNum: '13',
          icon: Sparkles,
          badgeText: undefined,
        },
        {
          id: 'bookings' as ScreenId,
          label: 'My Bookings',
          screenNum: '14',
          icon: Ticket,
          badgeText: undefined,
        },
        {
          id: 'dues' as ScreenId,
          label: 'Dues & UPI Pay',
          screenNum: '15',
          icon: ReceiptIndianRupee,
          badgeText: '₹ Pay',
          badgeColor: 'gold',
        },
        {
          id: 'alerts' as ScreenId,
          label: 'Notifications',
          screenNum: '16',
          icon: Bell,
          badgeText: unreadCount > 0 ? `${unreadCount}` : undefined,
          badgeColor: 'plum',
        },
      ],
    },
    {
      title: 'Authentication & Access',
      subtitle: 'Sign in & verification',
      badge: 'Auth',
      screens: [
        {
          id: 'login' as ScreenId,
          label: '1 · Login Screen',
          screenNum: '1',
          icon: LogIn,
          badgeText: undefined,
        },
        {
          id: 'otp' as ScreenId,
          label: '2 · OTP Verification',
          screenNum: '2',
          icon: ShieldCheck,
          badgeText: undefined,
        },
      ],
    },
  ];

  const handleNavClick = (screenId: ScreenId) => {
    onNavigate(screenId);
    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  const sidebarContent = (
    <div
      className={`h-full flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#120F18] border-r border-[#241E2D] text-white transition-all duration-200 select-none ${
        isCollapsed ? 'w-20 p-3' : 'w-72 p-4'
      }`}
    >
      {/* Top Brand Header */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#241E2D]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6B2D5C] to-[#8B4A78] flex items-center justify-center text-xl shrink-0 shadow-md shadow-[#6B2D5C]/30 border border-white/10">
              🩰
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-sm font-bold tracking-tight text-white truncate">
                    Huaid Dance World
                  </h1>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-[#6B2D5C]/60 text-[#E8B04B] border border-[#E8B04B]/30">
                    Pro
                  </span>
                </div>
                <p className="text-[11px] text-[#8C839A] truncate font-medium">
                  Dance Studio Academy
                </p>
              </div>
            )}
          </div>

          {/* Close button inside mobile drawer */}
          {onCloseMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              aria-label="Close menu drawer"
              className="lg:hidden w-8 h-8 rounded-xl bg-[#1C1726] border border-[#2B2338] text-[#8C839A] hover:text-white flex items-center justify-center transition"
            >
              <X size={16} />
            </button>
          )}

          {/* Desktop collapse toggle */}
          {onToggleCollapse && !onCloseMobileDrawer && !isCollapsed && (
            <button
              onClick={onToggleCollapse}
              aria-label="Collapse sidebar"
              className="hidden lg:flex w-7 h-7 rounded-lg bg-[#1C1726] border border-[#2B2338] text-[#8C839A] hover:text-white items-center justify-center transition"
            >
              <ChevronLeft size={14} />
            </button>
          )}
        </div>

        {/* Quick controls: Role switch & Display Mode */}
        {!isCollapsed && (
          <div className="space-y-1.5 mb-4 p-2 rounded-2xl bg-[#181320] border border-[#261E31]">
            <div className="flex items-center justify-between text-[10.5px] text-[#8C839A] font-semibold px-1">
              <span>Active Persona</span>
              <button
                onClick={onToggleRole}
                className="text-[10px] uppercase font-bold text-[#E8B04B] hover:underline flex items-center gap-1"
              >
                <ArrowRightLeft size={10} /> Switch
              </button>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#201A2B] text-xs font-semibold text-white">
              <div
                className={`w-2 h-2 rounded-full ${
                  userRole === 'owner' ? 'bg-[#2E9E6B] animate-pulse' : 'bg-[#E8B04B]'
                }`}
              />
              <span className="truncate">
                {userRole === 'owner' ? 'Studio Owner (Admin)' : 'Parent / Student'}
              </span>
            </div>

            <button
              onClick={onToggleDisplayMode}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-[#1C1726] hover:bg-[#251E33] text-[11px] font-medium text-[#B6ACC7] transition"
            >
              <div className="flex items-center gap-1.5">
                {displayMode === 'phone' ? <Monitor size={13} /> : <Smartphone size={13} />}
                <span>View: {displayMode === 'phone' ? 'Phone Simulator' : 'SaaS Desktop'}</span>
              </div>
              <span className="text-[9.5px] uppercase font-bold text-[#6B2D5C] bg-white/10 px-1.5 py-0.5 rounded-md">
                Toggle
              </span>
            </button>
          </div>
        )}

        {/* Navigation Sections */}
        <div className="space-y-4">
          {navSections.map((section) => (
            <div key={section.title}>
              {!isCollapsed && (
                <div className="flex items-center justify-between px-2 mb-1.5">
                  <h2 className="text-[10px] font-bold uppercase tracking-wider text-[#756C83]">
                    {section.title}
                  </h2>
                  <span className="text-[9px] font-semibold text-[#8C839A] bg-[#1C1726] px-1.5 py-0.5 rounded-md border border-[#261E31]">
                    {section.badge}
                  </span>
                </div>
              )}

              <div className="space-y-1">
                {section.screens.map((screen) => {
                  const isActive = currentScreen === screen.id;
                  const Icon = screen.icon;

                  return (
                    <button
                      key={screen.id}
                      onClick={() => handleNavClick(screen.id)}
                      title={screen.label}
                      className={`w-full text-left rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between group ${
                        isCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2'
                      } ${
                        isActive
                          ? 'bg-gradient-to-r from-[#6B2D5C] to-[#8B4A78] text-white shadow-md shadow-[#6B2D5C]/25'
                          : 'text-[#B6ACC7] hover:bg-[#1C1726] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          size={16}
                          className={`shrink-0 transition ${
                            isActive
                              ? 'text-white'
                              : 'text-[#8C839A] group-hover:text-white group-hover:scale-110'
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="truncate">{screen.label}</span>
                        )}
                      </div>

                      {!isCollapsed && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {screen.badgeText && (
                            <span
                              className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-md ${
                                screen.badgeColor === 'amber'
                                  ? 'bg-[#FDF3E2]/20 text-[#E8B04B] border border-[#E8B04B]/30'
                                  : screen.badgeColor === 'gold'
                                  ? 'bg-[#E8B04B] text-[#120F18]'
                                  : screen.badgeColor === 'plum'
                                  ? 'bg-[#6B2D5C] text-white'
                                  : 'bg-white/15 text-white'
                              }`}
                            >
                              {screen.badgeText}
                            </span>
                          )}
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Area: Reset & Logout */}
      <div className="pt-3 mt-4 border-t border-[#241E2D]">
        {!isCollapsed && (
          <div className="p-2.5 rounded-xl bg-[#17131F] border border-[#261E31] text-[10.5px] text-[#8C839A] leading-relaxed mb-2.5">
            <span className="font-bold text-[#E8B04B]">Huaid Suite:</span> 16 interactive
            screens with local persistent state.
          </div>
        )}

        <div className="space-y-1">
          <button
            onClick={onResetData}
            title="Reset demo data to initial state"
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#1C1726] hover:bg-[#251E33] text-[#B6ACC7] hover:text-white text-xs font-semibold transition ${
              isCollapsed ? 'p-2' : ''
            }`}
          >
            <RotateCcw size={13} className="shrink-0" />
            {!isCollapsed && <span>Reset Demo Data</span>}
          </button>

          <button
            onClick={() => handleNavClick('login')}
            title="Sign out to Login"
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl hover:bg-[#2B141C] text-[#D9534F] text-xs font-semibold transition ${
              isCollapsed ? 'p-2' : ''
            }`}
          >
            <LogOut size={13} className="shrink-0" />
            {!isCollapsed && <span>Logout / Sign In</span>}
          </button>
        </div>

        {/* Expand button when collapsed on desktop */}
        {isCollapsed && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="w-full mt-2 py-1.5 rounded-lg bg-[#1C1726] text-[#8C839A] hover:text-white flex items-center justify-center transition"
          >
            <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block shrink-0 h-full select-none z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (with backdrop) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div
            onClick={onCloseMobileDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Drawer content */}
          <div className="relative z-50 h-full w-72 max-w-[85vw] shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
