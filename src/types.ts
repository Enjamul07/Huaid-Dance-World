export type UserRole = 'owner' | 'student';

export type ScreenId =
  | 'login'
  | 'otp'
  | 'dashboard'
  | 'classes'
  | 'roster'
  | 'students'
  | 'student'
  | 'payment'
  | 'reports'
  | 'settings'
  | 'home'
  | 'schedule'
  | 'class'
  | 'bookings'
  | 'dues'
  | 'alerts';

export type AgeGroup = 'Kids' | 'Teens' | 'Adult';

export interface DanceClass {
  id: string;
  name: string;
  category: AgeGroup;
  level: string;
  days: string;
  time: string;
  durationMinutes: number;
  totalSeats: number;
  enrolledCount: number;
  monthlyFee: number;
  dropInFee: number;
  instructor: string;
  icon: string;
  active: boolean;
}

export type AttendanceStatus = 'present' | 'absent' | 'makeup' | null;

export interface AttendanceRecord {
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
}

export interface StudentChild {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  category: AgeGroup;
  enrolledClass: string;
  classId: string;
  guardianName: string;
  guardianPhone: string;
  feeStatus: 'paid' | 'due';
  dueAmount: number;
  avatarColor: 'plum' | 'gold' | 'blue' | 'green';
  notes?: string;
}

export interface Booking {
  id: string;
  classId: string;
  className: string;
  studentName: string;
  childId: string;
  dateTime: string;
  timeStr: string;
  dateStr: string;
  status: 'booked' | 'waitlist' | 'completed' | 'cancelled';
  waitlistPos?: number;
  fee: number;
  attendanceResult?: 'present' | 'absent' | 'makeup';
}

export type PaymentMethod = 'Cash' | 'UPI' | 'Bank';
export type PaymentStatus = 'Paid' | 'Partial' | 'Pending';

export interface PaymentRecord {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  method: PaymentMethod;
  status?: PaymentStatus;
  note?: string;
  notes?: string;
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  target: 'All students' | 'Kids' | 'Teens' | 'Adult';
  date: string;
  read: boolean;
  type: 'announcement' | 'reminder' | 'payment' | 'booking';
  tag?: string;
}

export interface StudioSettings {
  studioName: string;
  ownerName: string;
  ownerPhone: string;
  upiId: string;
  cancellationWindowHours: number;
  reminderBeforeHours: number;
  pushNotifications: boolean;
  paymentClaimAlerts: boolean;
}
