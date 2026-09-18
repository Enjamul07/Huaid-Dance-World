import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DanceClass, AgeGroup } from '../types';

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newClass: DanceClass) => void;
}

export const CreateClassModal: React.FC<CreateClassModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AgeGroup>('Kids');
  const [level, setLevel] = useState('Beginner');
  const [days, setDays] = useState('Mon · Wed · Fri');
  const [time, setTime] = useState('5:00 – 6:00 PM');
  const [seats, setSeats] = useState('12');
  const [monthlyFee, setMonthlyFee] = useState('2000');
  const [dropInFee, setDropInFee] = useState('800');
  const [instructor, setInstructor] = useState('Priya Sen');
  const [icon, setIcon] = useState('🩰');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newClass: DanceClass = {
      id: `cls-${Date.now()}`,
      name: name.trim(),
      category,
      level: `${level} (${category})`,
      days,
      time,
      durationMinutes: 60,
      totalSeats: parseInt(seats, 10) || 12,
      enrolledCount: 0,
      monthlyFee: parseInt(monthlyFee, 10) || 2000,
      dropInFee: parseInt(dropInFee, 10) || 800,
      instructor,
      icon: icon || '🩰',
      active: true,
    };

    onSave(newClass);
    onClose();
  };

  const icons = ['🩰', '🧢', '✨', '🪘', '💃', '🎭'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF7F5] rounded-3xl w-full max-w-sm max-h-[90vh] overflow-y-auto border border-[#F0ECE9] shadow-2xl p-5 text-[#1A1A1A]">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE9]">
          <h3 className="text-lg font-bold tracking-tight">Create New Class</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-500 hover:text-black shadow-xs transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
              Class Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Contemporary Jazz"
              className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#6B2D5C]/30 focus:border-[#6B2D5C]"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
              Category
            </label>
            <div className="flex bg-[#F1EFED] rounded-xl p-1 gap-1">
              {(['Kids', 'Teens', 'Adult'] as AgeGroup[]).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                    category === cat ? 'bg-white text-[#6B2D5C] shadow-xs' : 'text-neutral-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
              Icon
            </label>
            <div className="flex gap-2">
              {icons.map((ic) => (
                <button
                  type="button"
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition ${
                    icon === ic ? 'border-[#6B2D5C] bg-[#6B2D5C]/10 scale-105' : 'border-[#F0ECE9] bg-white'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Schedule Days
              </label>
              <input
                type="text"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="Mon · Wed"
                className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3 py-2 text-xs font-medium focus:border-[#6B2D5C]"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Timing
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="6:00 – 7:00 PM"
                className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3 py-2 text-xs font-medium focus:border-[#6B2D5C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Total Seats
              </label>
              <input
                type="number"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3 py-2 text-xs font-medium focus:border-[#6B2D5C]"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Monthly (₹)
              </label>
              <input
                type="number"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3 py-2 text-xs font-medium focus:border-[#6B2D5C]"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Drop-in (₹)
              </label>
              <input
                type="number"
                value={dropInFee}
                onChange={(e) => setDropInFee(e.target.value)}
                className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3 py-2 text-xs font-medium focus:border-[#6B2D5C]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
              Instructor
            </label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2 text-xs font-medium focus:border-[#6B2D5C]"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#F0ECE9] bg-white text-neutral-700 font-semibold text-xs hover:bg-neutral-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#6B2D5C] text-white font-bold text-xs hover:bg-[#8B4A78] shadow-sm transition"
            >
              Create Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
