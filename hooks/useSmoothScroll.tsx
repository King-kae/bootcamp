"use client";

import { animate } from "framer-motion";

export function useSmoothScroll(offset: number = -80) {
  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const targetY = element.getBoundingClientRect().top + window.scrollY + offset;

    animate(window.scrollY, targetY, {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier easing
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  };

  return scrollToSection;
}
