import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { Announcement } from '../types';

interface SendAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (announcement: Announcement) => void;
}

export const SendAnnouncementModal: React.FC<SendAnnouncementModalProps> = ({
  isOpen,
  onClose,
  onSend,
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [target, setTarget] = useState<'All students' | 'Kids' | 'Teens' | 'Adult'>('All students');
  const [type, setType] = useState<'announcement' | 'reminder' | 'payment'>('announcement');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      target,
      date: 'Just now',
      read: false,
      type,
      tag: type === 'reminder' ? 'Reminder' : type === 'payment' ? 'Fee Alert' : 'Announcement',
    };

    onSend(newAnn);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF7F5] rounded-3xl w-full max-w-sm max-h-[90vh] overflow-y-auto border border-[#F0ECE9] shadow-2xl p-5 text-[#1A1A1A]">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE9]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E8B04B]/20 text-[#C77F1A] flex items-center justify-center">
              <Bell size={15} />
            </div>
            <h3 className="text-base font-bold tracking-tight">Broadcast Message</h3>
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
              Title / Subject
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Recital practice starts next week"
              className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2.5 text-sm font-medium focus:border-[#6B2D5C]"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
              Target Audience
            </label>
            <div className="flex bg-[#F1EFED] rounded-xl p-1 gap-1">
              {(['All students', 'Kids', 'Teens', 'Adult'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTarget(t)}
                  className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition ${
                    target === t ? 'bg-white text-[#6B2D5C] shadow-xs' : 'text-neutral-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
              Message Category
            </label>
            <div className="flex bg-[#F1EFED] rounded-xl p-1 gap-1">
              {(['announcement', 'reminder', 'payment'] as const).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setType(cat)}
                  className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg capitalize transition ${
                    type === cat ? 'bg-white text-[#6B2D5C] shadow-xs' : 'text-neutral-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-500 uppercase tracking-wider mb-1">
              Message Body
            </label>
            <textarea
              rows={3}
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write message for parents and students..."
              className="w-full bg-white border border-[#F0ECE9] rounded-xl px-3.5 py-2.5 text-xs font-normal focus:border-[#6B2D5C]"
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
              Broadcast Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
