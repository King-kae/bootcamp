"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "@/public/VERTICAL BRANDMARK GREEN 2.png";

export function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-b-gray-300"
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#top" aria-label="Leading Alpha Home">
            <Image src={logo} alt="Leading Alpha Logo" width={60} height={60} />
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm"
            aria-label="Main"
          >
            <a href="#overview" className="hover:text-slate-700">
              Overview
            </a>
            <a href="#timeline" className="hover:text-slate-700">
              Timeline
            </a>
            <a href="#cohort" className="hover:text-slate-700">
              Cohort
            </a>
            <a
              href="/reservation"
              className="hover:bg-white border-[#212121] border-2 hover:text-[#212121] text-white bg-[#212121] px-4 py-2 rounded-lg"
            >
              Reserve your spot
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden  p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Drawer */}
      </header>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-64 bg-white shadow-lg z-50 flex flex-col p-6"
            >
              <div className="flex justify-between flex-col-reverse gap-4 items-end mb-4">
                <Image
                  src={logo}
                  alt="Leading Alpha Logo"
                  width={50}
                  height={50}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6 items-end text-sm">
                <a
                  href="#overview"
                  className="hover:text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  Overview
                </a>
                <a
                  href="#timeline"
                  className="hover:text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  Timeline
                </a>
                <a
                  href="#cohort"
                  className="hover:text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  Cohort
                </a>
                <a
                  href="/reservation"
                  onClick={() => setIsOpen(false)}
                  className="border-[#212121] border-2 hover:bg-white hover:text-[#212121] px-4 py-2 rounded-lg text-center font-medium bg-[#212121] text-white transition"
                >
                  Reserve your spot
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
