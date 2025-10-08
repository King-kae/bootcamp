"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // prevent background scroll
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="bg-white/90 p-6 rounded-2xl shadow-2xl text-center w-[90%] max-w-md"
          >
            <h2 className="text-2xl font-bold text-[#001F3E]">
              Payment Successful!
            </h2>
            <p className="mt-2 text-gray-700">
              We’ll email you the next steps shortly.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 hover:bg-white border-[#212121] border-2 hover:text-[#212121] text-white bg-[#212121] px-4 py-2 rounded-lg shadow-md transition"
              onClick={onClose}
            >
              Go back home
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
