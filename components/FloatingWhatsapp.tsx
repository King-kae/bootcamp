"use client";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FloatingWhatsapp() {
  return (
    <motion.a
      href="https://wa.me/2349077774983" // replace with your WhatsApp link
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 font-medium"
    >
      <span className="relative bg-[#25D366] text-white w-52 text-sm font-medium px-4 py-2 rounded-lg shadow-md after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-2 after:w-0 after:h-0 after:border-t-8 after:border-b-8 after:border-l-8 after:border-t-transparent after:border-b-transparent after:border-l-[#25D366]">
        Chat with one of our advisors on WhatsApp
      </span>

      <div className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#1EBE57]">
        <FaWhatsapp className="text-2xl" />
      </div>
    </motion.a>
  );
}
