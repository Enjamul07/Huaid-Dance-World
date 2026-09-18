import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { StudentChild } from '../types';

interface AddWalkinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, age: number, feePaid: boolean) => void;
  existingStudents: StudentChild[];
}

export const AddWalkinModal: React.FC<AddWalkinModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  existingStudents,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('new');
  const [walkinName, setWalkinName] = useState('');
  const [walkinAge, setWalkinAge] = useState('7');
  const [feePaid, setFeePaid] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudentId !== 'new') {
      const stu = existingStudents.find((s) => s.id === selectedStudentId);
      if (stu) {
        onAdd(stu.name, stu.age, feePaid);
        onClose();
        return;
      }
    }

    if (!walkinName.trim()) return;
    onAdd(walkinName.trim(), parseInt(walkinAge, 10) || 7, feePaid);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF7F5] rounded-3xl w-full max-w-sm border border-[#F0ECE9] shadow-2xl p-5 text-[#1A1A1A]">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE9]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#6B2D5C]/10 text-[#6B2D5C] flex items-center justify-center">
              <UserPlus size={15} />
            </div>
            <h3 className="text-base font-bold tracking-tight">Add Walk-in to Roster</h3>
          </div>
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
              Select or Enter
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2.5 text-xs font-medium focus:border-[#6B2D5C]"
            >
              <option value="new">+ Enter New Walk-in Student</option>
              {existingStudents.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.age} yrs - {s.category})
                </option>
              ))}
            </select>
          </div>

          {selectedStudentId === 'new' && (
            <>
              <div>
                <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  required
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  placeholder="e.g. Maya Rao"
                  className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2.5 text-sm font-medium focus:border-[#6B2D5C]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={walkinAge}
                  onChange={(e) => setWalkinAge(e.target.value)}
                  className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2 text-xs font-medium focus:border-[#6B2D5C]"
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
              Drop-in Fee (₹800)
            </label>
            <div className="flex bg-[#F1EFED] rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => setFeePaid(true)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                  feePaid ? 'bg-white text-[#2E9E6B] shadow-xs' : 'text-neutral-500'
                }`}
              >
                Paid Now
              </button>
              <button
                type="button"
                onClick={() => setFeePaid(false)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                  !feePaid ? 'bg-white text-[#C77F1A] shadow-xs' : 'text-neutral-500'
                }`}
              >
                Collect Later
              </button>
            </div>
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
              Add to Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
