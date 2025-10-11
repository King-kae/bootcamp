"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import succcessIcon from "@/public/failed-mKdmNxrLlk.png";
import Image from "next/image";

interface FailedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FailedModal({ isOpen, onClose }: FailedModalProps) {
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
            className="bg-white/90 py-6 px-8 rounded-2xl shadow-2xl flex flex-col items-center w-[90%] max-w-md"
          >
            <Image src={succcessIcon} width={85} height={64} alt="Success" />
            <h2 className="text-2xl font-bold text-[#001F3E]">
              Payment Failed!
            </h2>
            <p className="mt-2 text-gray-700">
              Something went wrong and we couldn't process your payment. 
              <br />Please check your payment details and try again.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full hover:bg-white hover:text-[#00B044] border-2 border-[#00B044] text-white bg-[#00B044] px-4 py-2 rounded-lg shadow-md transition"
              onClick={onClose}
            >
              Try again
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
