"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Sheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="absolute bottom-0 left-0 right-0 z-50 max-h-[80%] overflow-hidden rounded-t-[28px] bg-[#16191c] ring-1 ring-white/10"
          >
            <div className="relative">
              <div className="mx-auto mt-3 mb-1 h-1 w-9 rounded-full bg-white/15" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-white/70"
              >
                <X size={14} strokeWidth={2.4} />
              </button>
              <div className="overflow-y-auto no-scrollbar pb-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
