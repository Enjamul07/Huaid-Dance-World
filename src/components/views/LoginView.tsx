import React, { useState } from 'react';
import { ScreenId, UserRole } from '../../types';
import { Sparkles, ShieldCheck, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

interface LoginViewProps {
  onNavigate: (screen: ScreenId) => void;
  userRole: UserRole;
  onSetRole: (role: UserRole) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate, userRole, onSetRole }) => {
  const [phone, setPhone] = useState('98765 43210');

  const handleSendOtp = () => {
    onNavigate('otp');
  };

  const handleSelectPreset = (role: UserRole, num: string) => {
    onSetRole(role);
    setPhone(num);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#F0ECE9] shadow-md space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#6B2D5C] to-[#8B4A78] text-white flex items-center justify-center text-3xl mx-auto shadow-md shadow-[#6B2D5C]/20 mb-3">
            🩰
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
            Huaid Dance World
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
            Dance studio operations &amp; parent booking portal
          </p>
        </div>

        {/* Role Switcher */}
        <div>
          <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
            Select Workspace Role
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSelectPreset('owner', '98765 43210')}
              className={`p-3 rounded-2xl border text-left transition ${
                userRole === 'owner'
                  ? 'bg-[#FAF2F7] border-[#6B2D5C] ring-2 ring-[#6B2D5C]/20'
                  : 'bg-[#FAF7F5] border-[#F0ECE9] hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base">👩‍💼</span>
                {userRole === 'owner' && <CheckCircle2 size={14} className="text-[#6B2D5C]" />}
              </div>
              <p className="text-xs font-bold text-[#1A1A1A]">Studio Owner</p>
              <p className="text-[10.5px] text-[#6B6B6B]">Priya Sen (Admin)</p>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPreset('student', '98111 22334')}
              className={`p-3 rounded-2xl border text-left transition ${
                userRole === 'student'
                  ? 'bg-[#FAF2F7] border-[#6B2D5C] ring-2 ring-[#6B2D5C]/20'
                  : 'bg-[#FAF7F5] border-[#F0ECE9] hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base">👨‍👩‍👧</span>
                {userRole === 'student' && <CheckCircle2 size={14} className="text-[#6B2D5C]" />}
              </div>
              <p className="text-xs font-bold text-[#1A1A1A]">Parent / Student</p>
              <p className="text-[10.5px] text-[#6B6B6B]">Sunita (Ananya)</p>
            </button>
          </div>
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
            Mobile Number (India)
          </label>
          <div className="flex items-center">
            <span className="py-3 px-3.5 bg-[#FAF7F5] border border-r-0 border-[#F0ECE9] rounded-l-2xl text-xs font-bold text-[#6B6B6B]">
              🇮🇳 +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#FAF7F5] border border-[#F0ECE9] rounded-r-2xl py-3 px-3.5 text-xs font-semibold text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSendOtp}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white font-bold text-xs tracking-tight transition shadow-sm cursor-pointer active:scale-98 flex items-center justify-center gap-2"
        >
          <span>Continue with SMS OTP</span>
          <ArrowRight size={14} />
        </button>

        {/* Footer info */}
        <div className="pt-2 text-center text-[11px] text-[#9A9490] space-y-1">
          <p className="flex items-center justify-center gap-1">
            <ShieldCheck size={12} className="text-[#2E9E6B]" />
            <span>DPDP Act 2023 Compliant · Hosted in asia-south1</span>
          </p>
          <p>Standard carrier SMS charges may apply.</p>
        </div>
      </div>
    </div>
  );
};
