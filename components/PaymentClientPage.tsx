"use client";

import React from "react";
import { HeaderNav } from "@/components/HeaderNav";
import ReservationForm from "@/components/ReservationForm";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillDiscord } from "react-icons/ai";
import stockmarket from "@/public/stock-market.png";
import logo from "@/public/VERTICAL BRANDMARK GREEN 2.png";
import { FaArrowLeft } from "react-icons/fa";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function PaymentClientPage({ options }: { options: any }) {
  const router = useRouter();
  const scrollToSection = useSmoothScroll(-80);

  const handleClick = (id: string) => {
    if (window.location.pathname === "/") {
      // Already on home page → just scroll
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home, then scroll after it loads
      router.push(`/#${id}`);

      // Wait for route to change and scroll after render
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500); // small delay to allow render
    }
  };

  const links = ["Overview", "Cohort", "Timeline", "Save a spot", "Contact"];

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i?: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i ? i * 0.2 : 0,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1], // ✅ proper cubic-bezier easing
      },
    }),
  };

  const THEME = {
    hexPrimary: "#00BFA5",
    btnPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white",
  };

  return (
    <div
      className="min-h-screen bg-white text-slate-900"
      style={{ ["--brand" as any]: THEME.hexPrimary } as React.CSSProperties}
    >
      <HeaderNav />
      <div className="min-h-screen bg-[#F7F6F2] flex flex-col items-center py-12 px-4">
        <div className="flex flex-col items-center max-w-2xl w-full space-y-2">
          <button
            className="flex items-center border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 hover:underline"
            onClick={() => router.push("/")}
          >
            <FaArrowLeft className="mr-4" />
            Go back to home
          </button>
          <h3 className="text-2xl text-[#363636] font-semibold text-center">
            Secure Your Place in the Next Cohort
          </h3>
          <p className="mt-1 text-slate-600 text-center text-sm">
            Fill the form below and we’ll reach out within one business day with
            next steps.
          </p>
        </div>
        <ReservationForm options={options} />
      </div>
      <Image
        src={stockmarket}
        alt="Stock Market"
        width={0}
        height={0}
        className="w-full object-cover"
      />
      <motion.footer
        className="bg-white mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={variants} className="px-8 md:px-32 mx-auto py-10">
          <div className="flex flex-col md:justify-between md:items-start gap-8">
            {/* Top Row */}
            <div className="flex md:flex-row flex-col justify-between w-full gap-4 border-b pb-4 border-gray-300">
              <div className="flex flex-col gap-4">
                <Image
                  src={logo}
                  alt="Leading Alpha Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <p className="text-gray-700 text-sm">
                  Systematic trading education & automation, built for
                  real-world deployment.
                </p>
              </div>
              <nav className="flex gap-6 text-sm text-gray-700 flex-wrap justify-start">
                {links.map((link, i) => {
                  if (link === "Save a spot") {
                    return (
                      <motion.a
                        key={i}
                        href="#"
                        variants={variants}
                        className="hover:text-black"
                      >
                        {link}
                      </motion.a>
                    );
                  }
                  if (link === "Contact") {
                    return (
                      <motion.a
                        key={i}
                        href="mailto:info@leadingalpha.co"
                        variants={variants}
                        className="hover:text-black"
                      >
                        {link}
                      </motion.a>
                    );
                  }
                  return (
                    <motion.button
                      key={i}
                      onClick={() => router.push("/")}
                      variants={variants}
                      className="hover:text-black bg-transparent border-none self-start cursor-pointer"
                    >
                      {link}
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Row */}
            <div className="flex md:flex-row md:items-end gap-6 w-full md:justify-between flex-col">
              <p className="text-xs text-gray-500 mt-2">© 2025 Leading Alpha</p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Connect</span>
                <a
                  href="https://www.linkedin.com/in/leading-alpha-technologies-leading-alpha-87ab09386"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5 hover:text-black" />
                </a>
                <a
                  target="_blank"
                  href="https://x.com/leadingalpha_"
                  aria-label="X"
                >
                  <FaXTwitter className="w-5 h-5 hover:text-black" />
                </a>
                <a
                  target="_blank"
                  href="https://youtube.com/@leadingalpha"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-5 h-5 hover:text-black" />
                </a>
                <a href="https://discord.gg/CFVDGuywWX" aria-label="Discord">
                  <AiFillDiscord className="w-5 h-5 hover:text-black" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.footer>{" "}
    </div>
  );
}
