"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillDiscord } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { getAllOptions, getAllDates } from "@/libs/apiCalls";
import { WeekCard } from "@/components/Benefit";
import { HeaderNav } from "@/components/HeaderNav";
import Image from "next/image";
import logo from "@/public/VERTICAL BRANDMARK GREEN 2.png";
import smalllogo from "@/public/la-logo.png";
import hero from "@/public/Hero-Image.png";
import hero2 from "@/public/Image-2.png";
import user from "@/public/users-relation-svgrepo-com 1 (1).png";
import schedule from "@/public/schedule-left-svgrepo-com 1 (1).png";
import cerficate from "@/public/certificates-champion-education-learning-medal-school-svgrepo-com 1 (1).png";
import stockmarket from "@/public/stock-market.png";
import { useRouter } from "next/navigation";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import chart from "@/public/319shots_so 1.png";
import chart1 from "@/public/742shots_so 1.png";
import cloud from "@/public/cloud-computing-polygonal-wireframe-technology-concept 1.png";

export const CONFIG = {
  cohortDates: "September, 2025",
  location: "Lagos, Nigeria",
  paystackPublicKey: "pk_test_9405bb5ba60bbb0fc4f0b84ceb61b351829ed698", // TODO: replace with your real key
  crmEndpoint: "/api/leads", // TODO: point to your CRM endpoint
  pricing: {
    basic: 150_000, // NGN (virtual only)
    premium: 200_000, // NGN (includes Day 3 physical)
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }, // use a valid string for ease
  },
};

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

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const benefits = [
  {
    title: "Expert Mentorship",
    desc: "Learn directly from quants and algo developers.",
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Hands-On Projects",
    desc: "Work on real trading automation assignments.",
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Community Access",
    desc: "Join a network of aspiring algo traders and builders.",
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Career-Ready Portfolio",
    desc: "Graduate with deployable strategies and proof of skill.",
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
  },
];

const sessions = [
  {
    month: "October 2025",
    date: "Saturday, October 4, 2025",
  },
  {
    month: "November 2025",
    date: "Saturday, November 8, 2025",
  },
  {
    month: "December 2025",
    date: "Saturday, December 6, 2025",
  },
];

export const THEME = {
  hexPrimary: "#00BFA5", // teal (brand accent)
  btnPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white", // Tailwind class for now
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};
const options = await getAllOptions();
const dates = await getAllDates();
console.log("dates", dates);

export default function BootcampPage() {
  const router = useRouter();
  return (
    <div
      className="min-h-screen bg-white text-slate-900 overflow-x-hidden"
      style={{ ["--brand" as any]: THEME.hexPrimary } as React.CSSProperties}
    >
      <HeaderNav />
      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 border rounded-full px-4 py-1 text-sm text-gray-700">
              <Image src={smalllogo} alt="Logo" width={16} height={16} />
              <span>Learn. Build. Grow</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Turn your trading <br /> ideas into live, <br /> automated systems
            </h1>

            <p className="text-gray-600 text-lg">
              In just three weeks, master{" "}
              <span className="font-semibold">
                Algorithmic Trading Systems Architecture
              </span>
              . From strategy design to execution. Gain hands-on experience in
              backtesting, risk management, and live deployment.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/reservation")}
                className="hover:bg-white hover:text-[#00B044] border-2 border-[#00B044] text-white bg-[#00B044] rounded-lg px-6 py-3 text-lg shadow-md"
              >
                Secure your seat today
              </motion.button>
              <motion.a
                href="https://wa.me/2349077774983" // replace with your WhatsApp link
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#212121] text-[#212121] bg-white rounded-lg px-6 py-3 text-lg shadow-md"
              >
                <FaWhatsapp className="inline-block mr-2" />
                Chat with our advisors
              </motion.a>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="">
              <Image
                src={hero}
                alt="Student with tablet"
                width={447}
                height={429}
                className="w-[447px] h-[429px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
      {/* OVERVIEW */}
      <section id="overview" className="py-20 md:px-32 px-6 bg-[#EBC2000D]">
        <div className="mx-auto">
          <h2 className="text-4xl text-center">What You’ll Gain</h2>
          <p className="mt-2 text-center text-slate-600">
            Outcomes focused on real‑world skills you can deploy immediately.
          </p>

          <section className="bg-[#fdfcf7] py-10">
            <div className=" mx-auto grid md:grid-cols-3 grid-cols-1 gap-4 rounded-lg overflow-hidden">
              {/* Left column big block */}
              <div className="bg-[#EBC20033] relative rounded-[1rem] p-6 col-span-1 flex flex-col justify-between border-r border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Systematic Strategy Design
                  </h3>
                  <p className="text-gray-700 text-base mt-2">
                    Learn frameworks for building robust, rules-based trading
                    systems
                  </p>
                </div>
                <Image
                  src={chart}
                  alt="Strategy Chart"
                  width={200}
                  height={150}
                  className="absolute bottom-0 right-0 rounded-md border w-[85%] h-[70%] object-contain border-gray-300"
                />
              </div>

              {/* Right grid (2 cols, multiple rows) */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Quant Tools */}
                <div className="p-6 border border-gray-200 bg-[#9097C01A] rounded-[1rem]">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quant Tools & Pine Script
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Build and test strategies confidently on TradingView.
                  </p>
                </div>

                {/* Cloud Deployment */}
                <div className="p-6 border flex gap-4 relative border-gray-200 bg-[#9097C01A] rounded-[1rem]">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cloud Deployment
                    </h3>
                    <p className="text-gray-700 mt-2">
                      Deploy 24/7 bots with monitoring and failover on cloud
                      infrastructure.
                    </p>
                  </div>
                  <Image
                    src={cloud}
                    alt="Cloud Deployment"
                    width={200}
                    height={100}
                    className="rounded-md h-32 border -mb-6 -mr-6 border-gray-300"
                  />
                </div>

                {/* Risk Management */}
                <div className="p-6 border border-gray-200 bg-[#9097C01A] rounded-[1rem]">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Risk Management
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Embed risk controls and guardrails from day one.
                  </p>
                </div>

                {/* Backtesting */}
                <div className="p-6 border border-gray-200 bg-[#9097C01A] rounded-[1rem]">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Backtesting
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Validate with historical & live data to assess reliability
                    and robustness.
                  </p>
                </div>

                {/* Performance */}
                <div className="p-6 border flex gap-4 border-gray-200 bg-[#9097C01A] rounded-[1rem] col-span-1 md:col-span-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Performance
                    </h3>
                    <p className="text-gray-700 mt-2">
                      Measure edge with clear metrics, attribution, and
                      optimization loops.
                    </p>
                  </div>
                  <Image
                    src={chart1}
                    alt="Performance Chart"
                    objectFit="cover"
                    height={150}
                    className="-mr-6 -mb-6 rounded-md border border-gray-300"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      {/* BENEFITS */}
      <section className="bg-[#EBC2000D] py-16 md:px-32 px-6">
        <div>
          <h2 className="text-4xl text-gray-900 mb-4">
            Why Join <span className="italic font-bold text-black">The Bootcamp</span>
          </h2>
          <p className="text-gray-700 text-lg mb-3">
            Gain practical, real-world trading experience in just three weeks,
            guided by experts who’ve built systems that work.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-end">
          {/* Left Side: Text & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="mt-6 space-y-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="w-full flex items-start space-x-3 border-b-1 border-[#CCA435] pb-4"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      {b.icon}
                      <h4 className="font-semibold text-gray-900">{b.title}</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/reservation")}
                className="hover:bg-white hover:text-[#00B044] border-2 border-[#00B044] text-white bg-[#00B044] rounded-lg px-6 py-3 text-lg shadow-md"
              >
                Secure your seat today
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-end md:justify-end justify-center"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-blue-100">
              <Image
                src={hero2}
                alt="Excited student with laptop"
                width={447}
                height={429}
                className="w-[447px] h-[429px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
      {/* PROGRAM TIMELINE */}
      <motion.section
        id="timeline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-6 pb-20"
      >
        <motion.div
          variants={variants}
          className="md:w-[87%] h-full bg-[#212121] flex flex-col items-center justify-center rounded-xl shadow p-8"
        >
          {/* Heading */}
          <motion.h1
            variants={variants}
            className="text-5xl font-light text-white text-center"
          >
            Programme Timeline
          </motion.h1>

          <motion.p
            variants={variants}
            className="text-center text-white mt-2 max-w-xl"
          >
            From market fundamentals to live execution, this three-week bootcamp
            transforms trading ideas into real, automated systems.
          </motion.p>

          {/* Week Cards */}
          <motion.div
            variants={listVariants}
            className="mt-8 space-y-6 md:w-1/2"
          >
            {[
              {
                week: "Week 1",
                title: "Foundations of Global Financial Markets",
                objective:
                  "Understand market structures, participants, and career opportunities in trading.",
                items: [
                  "Evolution of Trading Systems",
                  "Welcome to the Financial Markets",
                  "Key Market Players and Operators",
                  "Career Pathways in Today’s Quant Trading Industry",
                ],
                bg: "bg-[#9097C0]",
              },
              {
                week: "Week 2",
                title: "Designing and Coding Trading Strategies",
                objective:
                  "Learn to design strategies, define edges, and code in Pine Script.",
                items: [
                  "Basic Strategy Design Framework",
                  "Developing a Strategy with a Trading Edge",
                  "Pine Script Programming Language",
                  "Live Coding – Multi-Timeframe Trading Indicator",
                ],
                bg: "bg-[#E8D2AE]",
              },
              {
                week: "Week 3",
                title: "Backtesting, Optimization, and Live Deployment",
                objective:
                  "Test strategies, refine them, and deploy live with confidence",
                items: [
                  "Fundamentals of Strategy Backtesting",
                  "Strategy Optimization Framework",
                  "Live Coding - Backtesting Trading Strategy",
                  "Live Deployment with PineConnector",
                ],
                bg: "bg-[#F4F3EF]",
              },
            ].map((week, i) => (
              <motion.div key={i} variants={variants}>
                <WeekCard {...week} />
              </motion.div>
            ))}
          </motion.div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={variants}
            onClick={() => router.push("/reservation")}
            className="hover:bg-white hover:text-[#00B044] mt-8 border-2 border-[#00B044] text-white bg-[#00B044] rounded-lg px-6 py-3 text-lg shadow-md"
          >
            Secure your seat today
          </motion.button>
        </motion.div>
      </motion.section>{" "}
      {/* COHORT DETAILS */}
      {/* ===================== COHORT DETAILS ===================== */}
      <motion.section
        id="cohort"
        className="py-20 bg-slate-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={variants}
          className="mx-auto md:px-32 px-6 text-center md:text-left"
        >
          <h2 className="text-5xl font-extralight">Cohort Details</h2>
          <p className="text-gray-600">
            Your learning journey, structured for maximum impact
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid md:grid-cols-3 grid-cols-1 gap-6 md:px-32 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {[schedule, cerficate, user].map((img, i) => (
            <motion.div
              key={i}
              variants={variants}
              custom={i}
              className="rounded-2xl bg-[#9097C01A] shadow-sm p-6 text-left"
            >
              <Image
                src={img}
                alt="Icon"
                width={40}
                height={40}
                className="w-7 h-7 mb-4 text-blue-500"
              />
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                {i === 0
                  ? "Schedule"
                  : i === 1
                  ? "Learning Flow"
                  : "Who This Is For"}
              </h3>
              <p className="text-slate-600 text-sm">
                {i === 0 && "3 weeks • Virtual • 6-8 hrs/week commitment"}
                {i === 1 &&
                  "Weekdays: self-paced learning. Weekends: live revision & Q&A."}
                {i === 2 &&
                  "Ideal for traders, finance pros & students exploring systematic trading."}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      {/* ===================== NEXT 3 SESSIONS ===================== */}
      <motion.section
        className="bg-gray-50 pt-10 pb-20 px-6 md:px-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className=" mx-auto" variants={variants}>
          <h2 className="text-5xl text-gray-900">Next 3 Sessions</h2>
          <p className="text-gray-600 mt-1">
            Plan Ahead: Secure Your Spot in Our Upcoming Bootcamps
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="flex sm:flex-row flex-col sm:items-center items-start gap-8 sm:gap-0 justify-between mt-10 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <div className="absolute top-4 hidden sm:block left-0 right-0 h-[2px] bg-green-400 z-0" />

          {sessions.map((session, index) => (
            <motion.div
              key={index}
              variants={variants}
              className="relative w-full sm:w-auto z-10 flex flex-col items-start text-center"
            >
              <div className="absolute sm:hidden w-full -z-19 top-4 left-0 right-0 h-[2px] bg-green-400" />

              <div className="px-4 py-1 border-2 border-green-400 rounded-full bg-white font-medium text-gray-900 shadow-sm">
                {session.month}
              </div>
              <div className="mt-6 mb-4">
                <div className="flex items-center mb-4 sm:justify-center justify-start text-gray-600 text-sm">
                  <SlCalender className="h-4 w-4 mr-1" /> Start date
                </div>
                <p className="mt-1 font-semibold text-gray-900">
                  {session.date}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      {/* ===================== CTA ===================== */}
      <motion.section
        id="cta"
        className="py-20 bg-[#212121] text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={variants}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <h3 className="text-3xl font-bold">
            Seats are limited—secure yours today.
          </h3>
          <p className="mt-2 text-gray-200">
            Experience expert mentorship, hands-on projects, and real deployment
            in one intensive bootcamp.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/reservation")}
            className="hover:bg-white hover:text-[#00B044] mt-8 border-2 border-[#00B044] text-white bg-[#00B044] rounded-lg px-6 py-3 text-lg shadow-md"
          >
            Secure your seat today
          </motion.button>
        </motion.div>
      </motion.section>
      <Image
        src={stockmarket}
        alt="Stock Market"
        width={0}
        height={0}
        className="w-full object-cover"
      />
      {/* ===================== FOOTER ===================== */}
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
                {[
                  "Overview",
                  "Cohort",
                  "Timeline",
                  "Save a spot",
                  "Contact",
                ].map((link, i) => (
                  <motion.a
                    key={i}
                    href={link === "Save a spot" ? "/reservation" : `#${link.toLowerCase()}`}
                    variants={variants}
                    custom={i}
                    className="hover:text-black"
                  >
                    {link}
                  </motion.a>
                ))}
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
                <a href="#" aria-label="Discord">
                  <AiFillDiscord className="w-5 h-5 hover:text-black" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.footer>{" "}
      <FloatingWhatsapp />
    </div>
  );
}
