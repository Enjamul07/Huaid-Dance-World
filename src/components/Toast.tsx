import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 15, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 10, x: '-50%' }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 bottom-20 z-50 px-4 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-xl shadow-xl whitespace-nowrap pointer-events-none max-w-[85%] truncate border border-neutral-700/50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
