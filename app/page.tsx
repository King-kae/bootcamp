"use client";
import React from "react";

import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
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
  ChevronRight,
  MonitorSmartphone,
  MapPin,
} from "lucide-react";

/**
 * CONFIGURATION & THEME
 * Update these values only—no code changes needed elsewhere
 */
export const CONFIG = {
  cohortDates: "September 18–20, 2025",
  location: "Lagos, Nigeria",
  paystackPublicKey: "pk_test_9405bb5ba60bbb0fc4f0b84ceb61b351829ed698", // TODO: replace with your real key
  crmEndpoint: "/api/leads", // TODO: point to your CRM endpoint
  pricing: {
    basic: 75_000, // NGN (virtual only)
    premium: 150_000, // NGN (includes Day 3 physical)
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
            {CONFIG.cohortDates}
          </p>
          <p className="text-slate-600 text-sm">
            Day 3 Venue: {CONFIG.location}
          </p>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Turn your trading ideas into live, automated systems. 
            In just three weeks, gain hands-on experience in strategy design, 
            backtesting, risk management, and deployment—guided every step by industry experts.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="bg-[#CCA435] hover:bg-[#E5E5E5] text-white h-12 rounded-xl px-6"            
              onClick={() =>
                document
                  .getElementById("cohort")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Reserve my spot"
            >
              Reserve My Spot
            </button>
            {/* <button
              className="h-12 rounded-xl px-6"
              aria-label="Download program outline"
            >
              Download Outline
            </button> */}
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
            From market fundamentals to live execution, 
            this three-week bootcamp transforms trading ideas into real, 
            automated systems.
          </p>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            <DayCard
              day="Day 1"
              mode=""
              title="Foundations"
              objective="Build your foundation in trading systems and quant finance."
              highlights={[
                "Evolution of Trading Systems",
                "Career Pathways",
                "Core Concepts",
                "Basic Strategies",
              ]}
            />
            <DayCard
              day="Day 2"
              mode=""
              title="Strategy Design & Testing"
              objective="Equip participants with quant tools and backtesting skills."
              highlights={[
                "Strategy Design Framework",
                "Intro to Quant Tools",
                "Live Demo",
                "Backtesting & Metrics",
                "Leading Alpha Strategy Showcase",
              ]}
            />
            <DayCard
              day="Day 3"
              mode=""
              title="Advanced Deployment & Networking"
              objective="Gain real‑world deployment skills with mentorship and peer networking."
              highlights={[
                "Panel Discussion",
                "Advanced Workshop",
                "Deploy Live Strategies",
                "Mentorship & Networking",
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
                <CardTitle>Dates & Format</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 text-sm space-y-2">
                <p>
                  <span className="font-medium text-slate-800">
                    Next Cohort:
                  </span>{" "}
                  <em>{CONFIG.cohortDates}</em>
                </p>
                <p>
                  <span className="font-medium text-slate-800">Format:</span> 2
                  Days Virtual + 1 Day Physical (Premium)
                </p>
                <p>
                  <span className="font-medium text-slate-800">Schedule:</span>{" "}
                  Evenings & Weekend‑friendly
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 text-sm space-y-3">
                <Step num="1" text="Register online" />
                <Step num="2" text="Complete the onboarding assessment" />
                <Step num="3" text="Confirm payment to secure your seat" />
                <div className="mt-2 text-xs text-slate-500">
                  Premium Day 3 happens in {CONFIG.location}. Limited seats.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead form */}
          <LeadForm />
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
          {/* <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className={`bg-[#CCA435] hover:bg-[#E5E5E5] text-white h-12 rounded-xl px-6`}
              onClick={() =>
                document
                  .getElementById("cohort")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Reserve My Spot
            </button>
            <button className="h-12 rounded-xl px-6">
              Speak to an Advisor
            </button>
          </div> */}
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
            <div className="font-extrabold text-lg">Leading Alpha</div>
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
              <li>Contact</li>
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

function HeaderNav() {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-b-gray-300"
      aria-label="Primary"
    >
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-extrabold tracking-tight text-xl"
          aria-label="Leading Alpha Home"
        >
          Leading <span className="text-slate-700">Alpha</span>
        </a>
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
          <a href="#cta" className="hover:text-slate-700">
            Reserve
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {/* <button className="hidden sm:inline-flex" aria-label="Sign in">
            Sign in
          </button>
          <button
            className={`${THEME.btnPrimary} rounded-xl px-4 py-2`}
            aria-label="Get started"
          >
            Get Started
          </button> */}
        </div>
      </div>
    </header>
  );
}

function LeadForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tier, setTier] = React.useState<"basic" | "premium">("premium");
  const [loading, setLoading] = React.useState(false);

  const amountNGN = CONFIG.pricing[tier];

  // Load Paystack inline script (client-side only)
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!(window as any).PaystackPop) {
      const s = document.createElement("script");
      s.src = "https://js.paystack.co/v1/inline.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, tier }),
    });

    const data = await res.json();
    console.log("Response:", data);
    // return
    try {
      // 1) Send lead to your CRM (fire-and-forget)
      fetch(CONFIG.crmEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          tier,
          amount: amountNGN,
          cohort: CONFIG.cohortDates,
          location: CONFIG.location,
        }),
      }).catch(() => {});

      // 2) Trigger Paystack Inline if key & script are present
      const paystack =
        (typeof window !== "undefined" && (window as any).PaystackPop) || null;
      if (paystack && CONFIG.paystackPublicKey) {
        const handler = paystack.setup({
          key: CONFIG.paystackPublicKey,
          email,
          amount: amountNGN * 100, // kobo
          currency: "NGN",
          ref: `LA-BC-${Date.now()}`,
          callback: function () {
            alert("Payment successful! We'll email next steps.");
            setName("");
            setEmail("");
            setTier("premium");
          },
          onClose: function () {
            console.log("Paystack modal closed");
          },
        });
        handler.openIframe();
      } else {
        alert(
          "Thanks! We'll contact you shortly to finalize your reservation."
        );
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-3xl border border-gray-200 p-6 text-center">
      <h3 className="text-xl font-semibold">Reserve your seat</h3>
      <p className="mt-1 text-slate-600 text-sm">
        We’ll reach out within one business day with next steps.
      </p>
      <form
        className="mt-4 grid gap-3"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          aria-label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="h-12 rounded-xl border border-gray-200 px-3"
          required
        />
        <input
          type="email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="h-12 rounded-xl border border-gray-200 px-3"
          required
        />
        <select
          aria-label="Select tier"
          value={tier}
          onChange={(e) => setTier(e.target.value as "basic" | "premium")}
          className="h-12 rounded-xl border border-gray-200 px-3"
        >
          <option value="premium">
            Premium (All 3 Days) — ₦{CONFIG.pricing.premium.toLocaleString()}
          </option>
          <option value="basic">
            Basic (Virtual Only) — ₦{CONFIG.pricing.basic.toLocaleString()}
          </option>
        </select>
        <button
          className={`bg-[#CCA435] hover:bg-[#E5E5E5] text-white h-12 rounded-xl`}
          type="submit"
          disabled={loading}
          aria-live="polite"
        >
          {loading ? "Processing…" : "Reserve & Pay"}
        </button>
      </form>
      <p className="mt-2 text-xs text-slate-500">
        By submitting, you agree to our Terms and acknowledge our Privacy
        Policy.
      </p>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-3 text-slate-700">
          <span className="inline-flex items-center justify-center size-9 rounded-xl bg-slate-100">
            {icon}
          </span>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-slate-600 text-sm">{desc}</CardContent>
    </Card>
  );
}

function Benefit({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-3 text-slate-700">
          <span className="inline-flex items-center justify-center size-9 rounded-xl bg-slate-100">
            {icon}
          </span>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-slate-600 text-sm">{desc}</CardContent>
    </Card>
  );
}

function DayCard({
  day,
  mode,
  title,
  objective,
  highlights,
}: {
  day: string;
  mode?: string;
  title: string;
  objective: string;
  highlights: string[];
}) {
  return (
    <Card className="rounded-3xl overflow-hidden">
      <CardHeader className="bg-slate-50/60">
        <div className="flex items-center justify-between">
          <div className="font-semibold">
            {day} · {title}
          </div>
          {/* <span className="text-xs rounded-full border px-3 py-1 bg-white">
            {mode}
          </span> */}
        </div>
      </CardHeader>
      <CardContent className="pt-6 text-slate-700 text-sm">
        <p className="mb-3">
          <span className="font-medium text-slate-900">Objective:</span>{" "}
          {objective}
        </p>
        <ul className="space-y-2">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <ChevronRight className="mt-0.5 size-4 text-slate-400" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Step({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center justify-center size-6 rounded-full border text-xs bg-white">
        {num}
      </span>
      <span>{text}</span>
    </div>
  );
}
