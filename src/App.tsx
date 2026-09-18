import React, { useState, useEffect } from 'react';
import {
  ScreenId,
  UserRole,
  DanceClass,
  StudentChild,
  Booking,
  PaymentRecord,
  PaymentMethod,
  Announcement,
  StudioSettings,
} from './types';
import {
  INITIAL_CLASSES,
  INITIAL_STUDENTS,
  INITIAL_BOOKINGS,
  INITIAL_PAYMENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SETTINGS,
} from './mockData';
import { SidebarNav } from './components/SidebarNav';
import { TopHeader } from './components/TopHeader';
import { PhoneFrame } from './components/PhoneFrame';
import { Toast } from './components/Toast';
import { CreateClassModal } from './components/CreateClassModal';
import { AddStudentModal } from './components/AddStudentModal';
import { SendAnnouncementModal } from './components/SendAnnouncementModal';
import { AddWalkinModal } from './components/AddWalkinModal';

// Views
import { LoginView } from './components/views/LoginView';
import { OtpView } from './components/views/OtpView';
import { OwnerDashboardView } from './components/views/OwnerDashboardView';
import { ClassesView } from './components/views/ClassesView';
import { RosterView } from './components/views/RosterView';
import { StudentsView } from './components/views/StudentsView';
import { StudentDetailView } from './components/views/StudentDetailView';
import { RecordPaymentView } from './components/views/RecordPaymentView';
import { ReportsView } from './components/views/ReportsView';
import { OwnerSettingsView } from './components/views/OwnerSettingsView';
import { StudentHomeView } from './components/views/StudentHomeView';
import { ScheduleView } from './components/views/ScheduleView';
import { ClassDetailView } from './components/views/ClassDetailView';
import { BookingsView } from './components/views/BookingsView';
import { DuesView } from './components/views/DuesView';
import { AlertsView } from './components/views/AlertsView';

export default function App() {
  // Navigation & Role State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('owner');
  const [displayMode, setDisplayMode] = useState<'phone' | 'full'>('full');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Entities with local persistence
  const [classes, setClasses] = useState<DanceClass[]>(() => {
    const saved = localStorage.getItem('nritya_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [students, setStudents] = useState<StudentChild[]>(() => {
    const saved = localStorage.getItem('nritya_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('nritya_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('nritya_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('nritya_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [settings, setSettings] = useState<StudioSettings>(() => {
    const saved = localStorage.getItem('nritya_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.studioName === 'Nritya Studio') {
          parsed.studioName = 'Huaid Dance World';
        }
        return parsed;
      } catch (e) {
        // use default
      }
    }
    return INITIAL_SETTINGS;
  });

  // Selection state
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'cls-1');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 'stu-1');
  const [selectedClassForBooking, setSelectedClassForBooking] = useState<DanceClass | null>(classes[0] || null);
  const [paymentStudentId, setPaymentStudentId] = useState<string>(students[0]?.id || 'stu-1');

  // Modal visibility
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isSendAnnouncementOpen, setIsSendAnnouncementOpen] = useState(false);
  const [isAddWalkinOpen, setIsAddWalkinOpen] = useState(false);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('nritya_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('nritya_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('nritya_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('nritya_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('nritya_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('nritya_settings', JSON.stringify(settings));
  }, [settings]);

  // Toast utility
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // Handlers for state updates
  const handleCreateClass = (newClass: DanceClass) => {
    setClasses((prev) => [newClass, ...prev]);
    showToast(`Class "${newClass.name}" created successfully`);
  };

  const handleAddStudent = (newStudent: StudentChild) => {
    setStudents((prev) => [newStudent, ...prev]);
    // increment enrollment in the corresponding class
    setClasses((prev) =>
      prev.map((c) =>
        c.name === newStudent.enrolledClass
          ? { ...c, enrolledCount: c.enrolledCount + 1 }
          : c
      )
    );
    showToast(`Student "${newStudent.name}" enrolled`);
  };

  const handleSavePayment = (
    studentId: string,
    amount: number,
    method: 'Cash' | 'UPI' | 'Bank' | 'cash' | 'upi' | 'bank',
    notes?: string
  ) => {
    const student = students.find((s) => s.id === studentId);
    const normalizedMethod: PaymentMethod =
      method.toUpperCase() === 'UPI'
        ? 'UPI'
        : method.toLowerCase() === 'bank'
        ? 'Bank'
        : 'Cash';

    const newRecord: PaymentRecord = {
      id: `pay-${Date.now()}`,
      studentId,
      studentName: student ? student.name : 'Student',
      amount,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      method: normalizedMethod,
      notes,
    };

    setPayments((prev) => [newRecord, ...prev]);

    // Update student due amount
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              dueAmount: Math.max(0, s.dueAmount - amount),
              paymentStatus: s.dueAmount - amount <= 0 ? 'paid' : 'due',
            }
          : s
      )
    );

    showToast(
      `Payment of ₹${amount.toLocaleString('en-IN')} recorded for ${student?.name || 'student'}`
    );
  };

  const handleSendAnnouncement = (ann: Announcement) => {
    setAnnouncements((prev) => [ann, ...prev]);
    showToast('Announcement broadcasted to students');
  };

  const handleAddWalkin = (name: string, age: number, feePaid: boolean) => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id === selectedClassId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c
      )
    );
    showToast(`Walk-in added: ${name} (${age} yrs)`);
  };

  const handleConfirmBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
    setClasses((prev) =>
      prev.map((c) =>
        c.id === booking.classId
          ? { ...c, enrolledCount: Math.min(c.totalSeats, c.enrolledCount + 1) }
          : c
      )
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    const bk = bookings.find((b) => b.id === bookingId);
    if (bk) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      setClasses((prev) =>
        prev.map((c) =>
          c.id === bk.classId ? { ...c, enrolledCount: Math.max(0, c.enrolledCount - 1) } : c
        )
      );
      showToast('Booking cancelled');
    }
  };

  const handleJoinWaitlist = (cls: DanceClass) => {
    const newBk: Booking = {
      id: `bk-${Date.now()}`,
      classId: cls.id,
      className: cls.name,
      studentName: 'Ananya Sharma',
      childId: 'stu-1',
      dateTime: '2026-09-18T19:00:00',
      timeStr: cls.time,
      dateStr: 'Today · Tue 18 Sep',
      status: 'waitlist',
      waitlistPos: 3,
      fee: cls.dropInFee,
    };
    setBookings((prev) => [newBk, ...prev]);
    showToast('Added to waitlist · position 3');
  };

  const handleMarkAllAlertsRead = () => {
    setAnnouncements((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const handleResetData = () => {
    setClasses(INITIAL_CLASSES);
    setStudents(INITIAL_STUDENTS);
    setBookings(INITIAL_BOOKINGS);
    setPayments(INITIAL_PAYMENTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setSettings(INITIAL_SETTINGS);
    localStorage.clear();
    showToast('Demo data reset to initial prototype state');
  };

  const totalDues = students
    .filter((s) => s.guardianName.includes('Sunita') || s.id === 'stu-1' || s.id === 'stu-2')
    .reduce((acc, curr) => acc + curr.dueAmount, 0);

  const studentChildren = students.filter(
    (s) => s.guardianName.includes('Sunita') || s.id === 'stu-1' || s.id === 'stu-2'
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAF7F5] text-[#1A1A1A]">
      {/* Sidebar Navigation */}
      <SidebarNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        userRole={userRole}
        onToggleRole={() => setUserRole((r) => (r === 'owner' ? 'student' : 'owner'))}
        displayMode={displayMode}
        onToggleDisplayMode={() => setDisplayMode((m) => (m === 'phone' ? 'full' : 'phone'))}
        onResetData={handleResetData}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
        announcements={announcements}
        students={students}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 h-full overflow-hidden flex flex-col min-w-0 bg-[#FAF7F5]">
        {/* Top Header Bar */}
        <TopHeader
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          userRole={userRole}
          onToggleRole={() => setUserRole((r) => (r === 'owner' ? 'student' : 'owner'))}
          displayMode={displayMode}
          onToggleDisplayMode={() => setDisplayMode((m) => (m === 'phone' ? 'full' : 'phone'))}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebarCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          onOpenMobileSidebar={() => setIsMobileDrawerOpen(true)}
          announcements={announcements}
          onMarkAllAlertsRead={handleMarkAllAlertsRead}
          classes={classes}
          students={students}
          onResetData={handleResetData}
          onSelectStudent={(id) => {
            setSelectedStudentId(id);
            setCurrentScreen('student');
          }}
          onSelectClass={(id) => {
            setSelectedClassId(id);
            setCurrentScreen('roster');
          }}
        />

        {/* View Workspace */}
        <main className="flex-1 h-[calc(100vh-4rem)] overflow-hidden flex flex-col relative bg-[#FAF7F5]">
          <PhoneFrame displayMode={displayMode}>
            {/* 1 · Login */}
            {currentScreen === 'login' && (
              <LoginView
                onNavigate={setCurrentScreen}
                userRole={userRole}
                onSetRole={setUserRole}
              />
            )}

            {/* 2 · OTP */}
            {currentScreen === 'otp' && (
              <OtpView
                onNavigate={setCurrentScreen}
                userRole={userRole}
                showToast={showToast}
              />
            )}

            {/* 3 · Owner Dashboard */}
            {currentScreen === 'dashboard' && (
              <OwnerDashboardView
                onNavigate={setCurrentScreen}
                classes={classes}
                students={students}
                payments={payments}
                onOpenCreateClass={() => setIsCreateClassOpen(true)}
                onOpenAddStudent={() => setIsAddStudentOpen(true)}
                onOpenAnnouncement={() => setIsSendAnnouncementOpen(true)}
                onSelectClassForRoster={setSelectedClassId}
              />
            )}

            {/* 4 · Classes */}
            {currentScreen === 'classes' && (
              <ClassesView
                onNavigate={setCurrentScreen}
                classes={classes}
                onOpenCreateClass={() => setIsCreateClassOpen(true)}
                onSelectClassForRoster={setSelectedClassId}
              />
            )}

            {/* 5 · Roster */}
            {currentScreen === 'roster' && (
              <RosterView
                onNavigate={setCurrentScreen}
                selectedClassId={selectedClassId}
                classes={classes}
                students={students}
                showToast={showToast}
                onOpenAddWalkin={() => setIsAddWalkinOpen(true)}
              />
            )}

            {/* 6 · Students */}
            {currentScreen === 'students' && (
              <StudentsView
                onNavigate={setCurrentScreen}
                students={students}
                onOpenAddStudent={() => setIsAddStudentOpen(true)}
                onSelectStudent={setSelectedStudentId}
              />
            )}

            {/* 7 · Student Detail */}
            {currentScreen === 'student' && (
              <StudentDetailView
                onNavigate={setCurrentScreen}
                selectedStudentId={selectedStudentId}
                students={students}
                payments={payments}
                showToast={showToast}
                onSetPaymentStudent={setPaymentStudentId}
              />
            )}

            {/* 8 · Record Payment */}
            {currentScreen === 'payment' && (
              <RecordPaymentView
                onNavigate={setCurrentScreen}
                students={students}
                selectedStudentId={paymentStudentId}
                onSavePayment={handleSavePayment}
                showToast={showToast}
              />
            )}

            {/* 9 · Reports */}
            {currentScreen === 'reports' && (
              <ReportsView
                onNavigate={setCurrentScreen}
                students={students}
                payments={payments}
                classes={classes}
              />
            )}

            {/* 10 · Settings */}
            {currentScreen === 'settings' && (
              <OwnerSettingsView
                onNavigate={setCurrentScreen}
                settings={settings}
                onUpdateSettings={setSettings}
                onSwitchRole={setUserRole}
                showToast={showToast}
              />
            )}

            {/* 11 · Student Home */}
            {currentScreen === 'home' && (
              <StudentHomeView
                onNavigate={setCurrentScreen}
                bookings={bookings}
                announcements={announcements}
                onCancelBooking={handleCancelBooking}
                totalDues={totalDues}
              />
            )}

            {/* 12 · Schedule */}
            {currentScreen === 'schedule' && (
              <ScheduleView
                onNavigate={setCurrentScreen}
                classes={classes}
                onSelectClassForBooking={(cls) => setSelectedClassForBooking(cls)}
                onJoinWaitlist={handleJoinWaitlist}
              />
            )}

            {/* 13 · Class Detail */}
            {currentScreen === 'class' && (
              <ClassDetailView
                onNavigate={setCurrentScreen}
                selectedClass={selectedClassForBooking}
                childrenList={studentChildren}
                onConfirmBooking={handleConfirmBooking}
                showToast={showToast}
              />
            )}

            {/* 14 · My Bookings */}
            {currentScreen === 'bookings' && (
              <BookingsView
                onNavigate={setCurrentScreen}
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
                showToast={showToast}
              />
            )}

            {/* 15 · Dues */}
            {currentScreen === 'dues' && (
              <DuesView
                onNavigate={setCurrentScreen}
                students={studentChildren}
                upiId={settings.upiId}
                payments={payments}
                showToast={showToast}
              />
            )}

            {/* 16 · Notifications */}
            {currentScreen === 'alerts' && (
              <AlertsView
                onNavigate={setCurrentScreen}
                announcements={announcements}
                onMarkAllAsRead={handleMarkAllAlertsRead}
                showToast={showToast}
              />
            )}
          </PhoneFrame>
        </main>
      </div>

      {/* Global Modals */}
      <CreateClassModal
        isOpen={isCreateClassOpen}
        onClose={() => setIsCreateClassOpen(false)}
        onSave={handleCreateClass}
      />

      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onSave={handleAddStudent}
        classes={classes}
      />

      <SendAnnouncementModal
        isOpen={isSendAnnouncementOpen}
        onClose={() => setIsSendAnnouncementOpen(false)}
        onSend={handleSendAnnouncement}
      />

      <AddWalkinModal
        isOpen={isAddWalkinOpen}
        onClose={() => setIsAddWalkinOpen(false)}
        onAdd={handleAddWalkin}
        existingStudents={students}
      />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} />
    </div>
  );
}
