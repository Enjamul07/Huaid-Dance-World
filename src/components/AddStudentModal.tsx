import React, { useState } from 'react';
import { X } from 'lucide-react';
import { StudentChild, AgeGroup, DanceClass } from '../types';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newStudent: StudentChild) => void;
  classes: DanceClass[];
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onSave, classes }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('7');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [category, setCategory] = useState<AgeGroup>('Kids');
  const [classId, setClassId] = useState(classes[0]?.id || 'cls-1');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('+91 ');
  const [dueAmount, setDueAmount] = useState('2000');
  const [avatarColor, setAvatarColor] = useState<'plum' | 'gold' | 'blue' | 'green'>('plum');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedClass = classes.find((c) => c.id === classId) || classes[0];
    const initialDue = parseInt(dueAmount, 10) || 0;

    const newStudent: StudentChild = {
      id: `stu-${Date.now()}`,
      name: name.trim(),
      age: parseInt(age, 10) || 7,
      gender,
      category,
      enrolledClass: selectedClass ? selectedClass.name : 'General',
      classId: selectedClass ? selectedClass.id : 'cls-1',
      guardianName: guardianName.trim() || 'Parent/Self',
      guardianPhone: guardianPhone.trim() || '+91 98765 43210',
      feeStatus: initialDue > 0 ? 'due' : 'paid',
      dueAmount: initialDue,
      avatarColor,
      notes: 'Newly enrolled student.',
    };

    onSave(newStudent);
    onClose();
  };

  const colors: ('plum' | 'gold' | 'blue' | 'green')[] = ['plum', 'gold', 'blue', 'green'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF7F5] rounded-3xl w-full max-w-sm max-h-[90vh] overflow-y-auto border border-[#F0ECE9] shadow-2xl p-5 text-[#1A1A1A]">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE9]">
          <h3 className="text-lg font-bold tracking-tight">Add New Student</h3>
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
              Student Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Diya Mehta"
              className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#6B2D5C]/30 focus:border-[#6B2D5C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3 py-2 text-xs font-medium focus:border-[#6B2D5C]"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3 py-2 text-xs font-medium focus:border-[#6B2D5C]"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
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
              Enrolled Class Batch
            </label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2.5 text-xs font-medium focus:border-[#6B2D5C]"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.days} · {cls.time})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
              Parent / Guardian Name
            </label>
            <input
              type="text"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              placeholder="e.g. Sunita Sharma"
              className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2 text-xs font-medium focus:border-[#6B2D5C]"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={guardianPhone}
              onChange={(e) => setGuardianPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2 text-xs font-medium focus:border-[#6B2D5C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Initial Due (₹)
              </label>
              <input
                type="number"
                value={dueAmount}
                onChange={(e) => setDueAmount(e.target.value)}
                placeholder="2000"
                className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3 py-2 text-xs font-medium focus:border-[#6B2D5C]"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Badge Color
              </label>
              <div className="flex gap-1.5 pt-1">
                {colors.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setAvatarColor(c)}
                    className={`w-6 h-6 rounded-full border-2 transition ${
                      c === 'plum'
                        ? 'bg-[#6B2D5C]'
                        : c === 'gold'
                        ? 'bg-[#E8B04B]'
                        : c === 'blue'
                        ? 'bg-[#3B6FA8]'
                        : 'bg-[#2E9E6B]'
                    } ${avatarColor === c ? 'border-black scale-110' : 'border-transparent'}`}
                  />
                ))}
              </div>
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
              Register Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
