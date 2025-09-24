"use client";
import React from "react";

import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import { Camera, Calendar, SquareUserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  Clock,
  GraduationCap,
  Cpu,
  LineChart,
  ShieldCheck,
  Users,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getAllOptions, getAllDates } from "@/libs/apiCalls";
import { DayCard } from "@/components/DayCard";
import { Benefit } from "@/components/Benefit";
import { Feature } from "@/components/Feature";
import { HeaderNav } from "@/components/HeaderNav";
import ReservationForm from "@/components/ReservationForm";
import Image from "next/image";
import logo from "@/public/Full-logo.png";
import type { Option } from "@/libs/apiCalls";

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

export const THEME = {
  hexPrimary: "#00BFA5", // teal (brand accent)
  btnPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white", // Tailwind class for now
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};
const options = await getAllOptions();
const dates = await getAllDates();
console.log("dates", dates);

export default function BootcampPage() {
  return (
    <div
      className="min-h-screen bg-white text-slate-900"
      style={{ ["--brand" as any]: THEME.hexPrimary } as React.CSSProperties}
    >
      <HeaderNav />

      {/* HERO */}
      <section
        id="top"
        className="py-20 bg-gradient-to-b from-slate-50 to-white border-b border-b-gray-300"
      >
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            Algorithmic Trading Systems Architecture: From Design to Execution
          </motion.h1>
          <p className="mt-3 text-slate-600 text-sm" aria-live="polite">
            {`${dates[0]?.month}`}
          </p>
          {/* <p className="text-slate-600 text-sm">
          </p> */}
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Turn your trading ideas into live, automated systems. In just three
            weeks, gain hands-on experience in strategy design, backtesting,
            risk management, and deployment—guided every step by industry
            experts.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="bg-[#CCA435] hover:bg-[#E5E5E5] hover:text-[#CCA435] text-white h-12 rounded-xl px-6"
              onClick={() =>
                document
                  .getElementById("cohort")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Reserve my spot"
            >
              Reserve My Spot
            </button>
          </div>
          {/* <div
            className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-600"
            role="list"
          >
            <span className="inline-flex items-center gap-2" role="listitem">
              <MonitorSmartphone className="size-4" aria-hidden /> Day 1–2:
              Virtual
            </span>
            <span className="inline-flex items-center gap-2" role="listitem">
              <MapPin className="size-4" aria-hidden /> Day 3: Physical
              (Premium)
            </span>
          </div> */}
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center">What You’ll Gain</h2>
          <p className="mt-2 text-center text-slate-600">
            Outcomes focused on real‑world skills you can deploy immediately.
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <Feature
              icon={<Cpu className="size-6" aria-hidden />}
              title="Systematic Strategy Design"
              desc="Learn frameworks for building robust, rules‑based trading systems."
            />
            <Feature
              icon={<LineChart className="size-6" aria-hidden />}
              title="Quant Tools & Pine Script"
              desc="Build and test strategies confidently on TradingView."
            />
            <Feature
              icon={<Clock className="size-6" aria-hidden />}
              title="Backtesting"
              desc="Validate with historical & live data to assess reliability and robustness."
            />
            <Feature
              icon={<ShieldCheck className="size-6" aria-hidden />}
              title="Risk Management"
              desc="Embed risk controls and guardrails from day one."
            />
            <Feature
              icon={<CalendarDays className="size-6" aria-hidden />}
              title="Performance"
              desc="Measure edge with clear metrics, attribution, and optimization loops."
            />
            <Feature
              icon={<Rocket className="size-6" aria-hidden />}
              title="Cloud Deployment"
              desc="Deploy 24/7 bots with monitoring and failover on cloud infrastructure."
            />
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center">
            Why Join the Bootcamp?
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Benefit
              icon={<GraduationCap className="size-6" aria-hidden />}
              title="Expert Mentorship"
              desc="Learn directly from quants and algo developers."
            />
            <Benefit
              icon={<Cpu className="size-6" aria-hidden />}
              title="Hands‑On Projects"
              desc="Work on real trading automation assignments."
            />
            <Benefit
              icon={<Users className="size-6" aria-hidden />}
              title="Community Access"
              desc="Join a network of aspiring algo traders and builders."
            />
            <Benefit
              icon={<LineChart className="size-6" aria-hidden />}
              title="Career‑Ready Portfolio"
              desc="Graduate with deployable strategies and proof of skill."
            />
          </div>
        </div>
      </section>

      {/* PROGRAM TIMELINE */}
      <section id="timeline" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center">Program Timeline</h2>
          <p className="mt-2 text-center text-slate-600">
            From market fundamentals to live execution, this three-week bootcamp
            transforms trading ideas into real, automated systems.
          </p>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            <DayCard
              day="Week 1"
              mode=""
              title="Foundations of Global Financial Markets"
              objective="Understand market structures, participants, and career opportunities in trading."
              highlights={[
                "Evolution of Trading Systems",
                "Welcome to the Financial Markets",
                "Key Market Players and Operators",
                "Career Pathways in Today’s Quant Trading Industry",
              ]}
            />
            <DayCard
              day="Week 2"
              mode=""
              title="Designing and Coding Trading Strategies"
              objective="Learn to design strategies, define edges, and code in Pine Script."
              highlights={[
                "Basic Strategy Design Framework",
                "Developing a Strategy with a Trading Edge",
                "Pine Script Programming Language",
                "Live Coding – Multi-Timeframe Trading Indicator",
              ]}
            />
            <DayCard
              day="Week 3"
              mode=""
              title="Backtesting, Optimization, and Live Deployment"
              objective="Test strategies, refine them, and deploy live with confidence."
              highlights={[
                "Fundamentals of Strategy Backtesting",
                "Strategy Optimization Framework",
                "Live Coding – Backtesting Trading Strategy",
                "Live Deployment with PineConnector",
              ]}
            />
          </div>
        </div>
      </section>

      {/* COHORT DETAILS */}
      <section id="cohort" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold text-center">Cohort Details</h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3 text-slate-700">
                  <Calendar color="gold" size={20} />
                  <CardTitle>Schedule</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-slate-600 text-sm space-y-2">
                <p>
                  <span className="font-medium text-slate-800">Duration:</span>{" "}
                  <em>3 weeks</em>
                </p>
                <div>
                  <span className="font-medium text-slate-800">
                    Learning Flow:
                  </span>
                  <ul>
                    <li className="ml-4 list-disc">
                      <span className="font-medium text-slate-800">
                        Weekdays:
                      </span>
                      Self-paced learning on LMS (videos, exercises, coding
                      labs).
                    </li>
                    <li className="ml-4 list-disc">
                      <span className="font-medium text-slate-800">
                        Weekends:
                      </span>
                      Live revision workshops, Q&A, and peer discussions.
                    </li>
                  </ul>
                </div>
                <p>
                  <span className="font-medium text-slate-800">
                    Delivery Mode:
                  </span>{" "}
                  Virtual
                </p>
                <p>
                  <span className="font-medium text-slate-800">
                    Commitment:
                  </span>{" "}
                  6-8 hours per week
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3 text-slate-700">
                  <SquareUserRound color="blue" size={20} />
                  <CardTitle>Who This Is For</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-slate-600 text-sm space-y-3">
                <ul>
                  <li className="ml-4 list-disc">
                    Aspiring <b>quant traders & system developers</b>
                  </li>
                  <li className="ml-4 list-disc">
                    <b>Retail traders</b> ready to trade systematically
                  </li>
                  <li className="ml-4 list-disc">
                    <b>Finance professionals</b> moving into algo trading
                  </li>
                  <li className="ml-4 list-disc">
                    <b>Students & enthusiasts</b> exploring fintech and trading
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          {/* Lead form */}
          <ReservationForm options={options} />
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h3 className="text-3xl font-bold">
            Seats are limited—secure yours today.
          </h3>
          <p className="mt-2 text-slate-600">
            Experience expert mentorship, hands‑on projects, and real deployment
            in one intensive bootcamp.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4" aria-hidden />{" "}
              <span>Mentorship Included</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4" aria-hidden />{" "}
              <span>Hands‑On Labs</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4" aria-hidden />{" "}
              <span>Community</span>
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-t-gray-400 py-10">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="font-extrabold text-lg">
              <Image
                src={logo}
                alt="Leading Alpha Logo"
                width={60}
                height={60}
              />
            </div>
            <p className="mt-2 text-slate-600">
              Systematic trading education & automation—built for real‑world
              deployment.
            </p>
          </div>
          <div>
            <div className="font-semibold">Program</div>
            <ul className="mt-2 space-y-1 text-slate-600">
              <li>
                <a href="#overview" className="hover:text-slate-800">
                  Overview
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-slate-800">
                  Timeline
                </a>
              </li>
              <li>
                <a href="#cohort" className="hover:text-slate-800">
                  Cohort Details
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Resources</div>
            <ul className="mt-2 space-y-1 text-slate-600">
              {/* <li>FAQ</li>
              <li>Policies</li> */}
              <li>
                <a
                  href="https://wa.me/2348012345678?text=Hi%2C%20I%27m%20interested%20in%20the%20bootcamp%20👋"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#001F3E] transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Connect</div>
            <ul className="mt-2 space-y-1 text-slate-600">
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>YouTube</li>
              <li>Discord</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Leading Alpha Technologies LTD. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}
