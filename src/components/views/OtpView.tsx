import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ScreenId, UserRole } from '../../types';

interface OtpViewProps {
  onNavigate: (screen: ScreenId) => void;
  userRole: UserRole;
  showToast: (msg: string) => void;
}

export const OtpView: React.FC<OtpViewProps> = ({ onNavigate, userRole, showToast }) => {
  const [digits, setDigits] = useState(['4', '8', '2', '9', '1', '0']);
  const [timer, setTimer] = useState(24);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    showToast('Verified successfully! Welcome to Huaid Dance World.');
    if (userRole === 'owner') {
      onNavigate('dashboard');
    } else {
      onNavigate('home');
    }
  };

  const handleResend = () => {
    setTimer(30);
    showToast('New OTP sent via SMS to your registered number');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-[#FAF7F5] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#F0ECE9] shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('login')}
            className="w-10 h-10 rounded-2xl bg-[#FAF7F5] border border-[#F0ECE9] flex items-center justify-center text-[#1A1A1A] hover:bg-neutral-100 transition shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
              Verify One-Time Password
            </h2>
            <p className="text-xs text-[#6B6B6B]">
              Enter the 6-digit code sent to your phone
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FAF2F7] border border-[#6B2D5C]/15 text-xs text-[#6B2D5C] flex items-center justify-between">
          <span>Target Role: <b>{userRole === 'owner' ? 'Studio Owner' : 'Parent / Student'}</b></span>
          <span className="font-mono font-bold">+91 98765 43210</span>
        </div>

        {/* 6 Digit Inputs */}
        <div className="flex justify-between gap-1.5 sm:gap-2">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              className="w-11 sm:w-13 h-14 bg-[#FAF7F5] border border-[#F0ECE9] rounded-2xl text-center text-lg sm:text-xl font-bold text-[#1A1A1A] outline-hidden focus:border-[#6B2D5C] focus:bg-white transition"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#6B2D5C] hover:bg-[#8B4A78] text-white font-bold text-xs tracking-tight transition shadow-sm cursor-pointer active:scale-98 flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={16} />
          <span>Verify &amp; Enter Studio</span>
        </button>

        <div className="text-center text-xs text-[#6B6B6B]">
          {timer > 0 ? (
            <span>Resend code in 0:{timer < 10 ? `0${timer}` : timer}</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-[#6B2D5C] font-bold hover:underline"
            >
              Resend code now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
