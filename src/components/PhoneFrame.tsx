import React, { useState, useEffect } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  displayMode: 'phone' | 'full';
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, displayMode }) => {
  const [timeStr, setTimeStr] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      hours = hours % 12 || 12;
      const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setTimeStr(`${hours}:${mm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (displayMode === 'full') {
    return (
      <div className="w-full h-full flex-1 flex flex-col overflow-hidden bg-[#FAF7F5] relative">
        {children}
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-full flex items-center justify-center p-4 overflow-y-auto no-scrollbar bg-[radial-gradient(1000px_600px_at_50%_0%,#241c30_0%,#0f0d12_65%)]">
      <div className="relative w-[375px] h-[760px] bg-[#0b0b0d] rounded-[48px] p-2.5 shadow-[0_0_0_2px_#2c2c33,0_40px_90px_rgba(0,0,0,0.75)] shrink-0 select-none my-auto">
        {/* Notch */}
        <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0b0b0d] rounded-2xl z-40" />

        {/* Screen */}
        <div className="w-full h-full bg-[#FAF7F5] rounded-[38px] overflow-hidden flex flex-col text-[#1A1A1A] relative shadow-inner">
          {/* Status bar */}
          <div className="h-8 shrink-0 flex items-center justify-between px-6 text-xs font-bold text-[#1A1A1A] bg-[#FAF7F5] z-30">
            <span className="text-[11.5px] font-bold">{timeStr}</span>
            <div className="flex items-center gap-1.5 text-[10.5px]">
              <span className="tracking-wider">▮▮▮</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col relative">{children}</div>
        </div>
      </div>
    </div>
  );
};
