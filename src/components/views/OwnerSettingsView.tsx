import React, { useState } from 'react';
import {
  Home,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Building2,
  QrCode,
  Bell,
  ShieldCheck,
  Smartphone,
  LogOut,
  Save,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRightLeft,
  Lock,
} from 'lucide-react';
import { ScreenId, StudioSettings, UserRole } from '../../types';

interface OwnerSettingsViewProps {
  onNavigate: (screen: ScreenId) => void;
  settings: StudioSettings;
  onUpdateSettings: (newSettings: StudioSettings) => void;
  onSwitchRole: (role: UserRole) => void;
  showToast: (msg: string) => void;
}

export const OwnerSettingsView: React.FC<OwnerSettingsViewProps> = ({
  onNavigate,
  settings,
  onUpdateSettings,
  onSwitchRole,
  showToast,
}) => {
  const [studioName, setStudioName] = useState(settings.studioName);
  const [upiId, setUpiId] = useState(settings.upiId);
  const [cancellationHours, setCancellationHours] = useState(settings.cancellationWindowHours);
  const [reminderHours, setReminderHours] = useState(settings.reminderBeforeHours);
  const [pushNotif, setPushNotif] = useState(settings.pushNotifications);
  const [claimsAlert, setClaimsAlert] = useState(settings.paymentClaimAlerts);
  const [dpdpConsent, setDpdpConsent] = useState(true);

  const handleSave = () => {
    onUpdateSettings({
      ...settings,
      studioName,
      upiId,
      cancellationWindowHours: cancellationHours,
      reminderBeforeHours: reminderHours,
      pushNotifications: pushNotif,
      paymentClaimAlerts: claimsAlert,
    });
    showToast('Studio settings successfully saved and synced');
  };

  const handleSwitchToStudent = () => {
    onSwitchRole('student');
    onNavigate('home');
    showToast('Switched to Student/Parent Portal');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              Studio Configuration &amp; Settings
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5">
              Customize studio profile, UPI payment handle, booking rules and DPDP compliance.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white text-xs font-bold transition shadow-xs active:scale-98 shrink-0"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Studio Profile */}
          <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#F0ECE9]">
              <div className="w-8 h-8 rounded-xl bg-[#FAF2F7] text-[#6B2D5C] flex items-center justify-center">
                <Building2 size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">Studio Profile</h3>
                <p className="text-[11px] text-[#6B6B6B]">Business details visible to students</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Studio Name
                </label>
                <input
                  type="text"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  className="w-full bg-[#FAF7F5] border border-[#F0ECE9] rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Studio Owner &amp; Lead Instructor
                </label>
                <input
                  type="text"
                  disabled
                  value="Priya Sen (Solo Owner &amp; Choreographer)"
                  className="w-full bg-[#FAF7F5]/60 border border-[#F0ECE9] rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#6B6B6B] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Studio Location
                </label>
                <input
                  type="text"
                  defaultValue="Koramangala 4th Block, Bengaluru, Karnataka"
                  className="w-full bg-[#FAF7F5] border border-[#F0ECE9] rounded-2xl px-4 py-2.5 text-xs text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* UPI & Payment Settings */}
          <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#F0ECE9]">
              <div className="w-8 h-8 rounded-xl bg-[#FAF2F7] text-[#6B2D5C] flex items-center justify-center">
                <QrCode size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">Payment &amp; UPI Setup</h3>
                <p className="text-[11px] text-[#6B6B6B]">Direct zero-commission Indian UPI</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Studio UPI VPA Address
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. huaiddance@oksbi"
                  className="w-full bg-[#FAF7F5] border border-[#F0ECE9] rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
                />
                <p className="text-[10.5px] text-[#9A9490] mt-1">
                  Used by parents for instant QR scanning and UPI app intent triggers.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#1A1A1A] block">Currency &amp; Gateway</span>
                  <span className="text-[10.5px] text-[#6B6B6B]">INR (₹) · Direct UPI / Cash</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#E7F5EE] text-[#2E9E6B] font-bold text-[10px]">
                  Zero Fees
                </span>
              </div>
            </div>
          </div>

          {/* Booking & Scheduling Rules */}
          <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#F0ECE9]">
              <div className="w-8 h-8 rounded-xl bg-[#FAF2F7] text-[#6B2D5C] flex items-center justify-center">
                <Clock size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">Booking &amp; Cancellation Rules</h3>
                <p className="text-[11px] text-[#6B6B6B]">Control drop-ins and reschedule windows</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Free Cancellation Window
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 4, 8, 24].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setCancellationHours(h)}
                      className={`py-2 rounded-xl text-xs font-bold transition border ${
                        cancellationHours === h
                          ? 'bg-[#6B2D5C] text-white border-[#6B2D5C]'
                          : 'bg-[#FAF7F5] text-[#6B6B6B] border-[#F0ECE9] hover:bg-[#F0ECE9]'
                      }`}
                    >
                      {h} hrs
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Automated Class Push Reminder
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 6, 24].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setReminderHours(h)}
                      className={`py-2 rounded-xl text-xs font-bold transition border ${
                        reminderHours === h
                          ? 'bg-[#6B2D5C] text-white border-[#6B2D5C]'
                          : 'bg-[#FAF7F5] text-[#6B6B6B] border-[#F0ECE9] hover:bg-[#F0ECE9]'
                      }`}
                    >
                      {h} hrs
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* India DPDP Act 2023 & Privacy */}
          <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#F0ECE9]">
              <div className="w-8 h-8 rounded-xl bg-[#FAF2F7] text-[#6B2D5C] flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">India DPDP Act 2023 Compliance</h3>
                <p className="text-[11px] text-[#6B6B6B]">Child privacy &amp; verified parental consent</p>
              </div>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => setDpdpConsent(!dpdpConsent)}
                className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] flex items-center justify-between cursor-pointer hover:bg-neutral-100 transition"
              >
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Guardian Consent Log</p>
                  <p className="text-[11px] text-[#6B6B6B]">Mandatory for dancers under 18 years</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    dpdpConsent ? 'bg-[#E7F5EE] text-[#2E9E6B]' : 'bg-[#F1EFED] text-[#6B6B6B]'
                  }`}
                >
                  {dpdpConsent ? 'Active & Compliant' : 'Disabled'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#1A1A1A]">Cloud Region:</span>
                  <span className="font-bold text-[#6B2D5C]">asia-south1 (Mumbai)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#6B6B6B]">
                  <span>Data encryption:</span>
                  <span>AES-256 at rest</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Persona Switch & Logout Section */}
        <div className="bg-white rounded-3xl p-6 border border-[#F0ECE9] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#1A1A1A]">Studio Persona &amp; Sign Out</h4>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Switch between the Studio Owner dashboard and the Parent/Student mobile interface.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSwitchToStudent}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#6B2D5C]/30 text-[#6B2D5C] hover:bg-[#FAF2F7] text-xs font-bold transition shadow-xs"
            >
              <ArrowRightLeft size={14} />
              <span>Switch to Student App</span>
            </button>

            <button
              onClick={() => {
                onNavigate('login');
                showToast('Signed out of Studio Owner account');
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#F0ECE9] hover:bg-[#FDECEB] text-[#D9534F] text-xs font-bold transition shadow-xs"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
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
          className="flex flex-col items-center text-[#6B6B6B] hover:text-[#6B2D5C] font-medium text-[10px]"
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
          className="flex flex-col items-center text-[#6B2D5C] font-semibold text-[10px]"
        >
          <Settings size={18} className="mb-0.5" />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
};
