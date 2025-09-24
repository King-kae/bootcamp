import logo from "@/public/Full-logo.png"
import logo2 from "@/public/LA.jpg"
import Image from "next/image";

export function HeaderNav() {
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
          <Image src={logo} alt="Leading Alpha Logo" width={60} height={60} />
          {/* Leading <span className="text-slate-700">Alpha</span> */}
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
