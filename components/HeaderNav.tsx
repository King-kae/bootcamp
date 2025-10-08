"use client";

import { useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "@/public/VERTICAL BRANDMARK GREEN 2.png";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = useSmoothScroll(-80);

  // const scrollToSection = (id: string) => {
  //   const element = document.querySelector(id);
  //   if (element) {
  //     const yOffset = -80; // offset for sticky header height
  //     const targetY =
  //       element.getBoundingClientRect().top + window.scrollY + yOffset;

  //     animate(window.scrollY, targetY, {
  //       duration: 0.8,
  //       ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier ease
  //       onUpdate: (latest) => window.scrollTo(0, latest),
  //     });
  //   }
  // };

 return (
    <>
      <header
        className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-b-gray-300"
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" aria-label="Leading Alpha Home">
            <Image src={logo} alt="Leading Alpha Logo" width={60} height={60} />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm" aria-label="Main">
            <button
              onClick={() => scrollToSection("#overview")}
              className="hover:text-slate-700"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection("#timeline")}
              className="hover:text-slate-700"
            >
              Timeline
            </button>
            <button
              onClick={() => scrollToSection("#cohort")}
              className="hover:text-slate-700"
            >
              Cohort
            </button>
            <a
              href="/reservation"
              className="hover:bg-white border-[#212121] border-2 hover:text-[#212121] text-white bg-[#212121] px-4 py-2 rounded-lg"
            >
              Reserve your spot
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
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
                <Image src={logo} alt="Leading Alpha Logo" width={50} height={50} />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6 items-end text-sm">
                <button
                  onClick={() => {
                    scrollToSection("#overview");
                    setIsOpen(false);
                  }}
                  className="hover:text-slate-700"
                >
                  Overview
                </button>
                <button
                  onClick={() => {
                    scrollToSection("#timeline");
                    setIsOpen(false);
                  }}
                  className="hover:text-slate-700"
                >
                  Timeline
                </button>
                <button
                  onClick={() => {
                    scrollToSection("#cohort");
                    setIsOpen(false);
                  }}
                  className="hover:text-slate-700"
                >
                  Cohort
                </button>
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
