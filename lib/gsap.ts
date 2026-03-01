"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger);
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Custom hook for GSAP context
export function useGSAPContext() {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    registerGSAP();

    contextRef.current = gsap.context(() => {});

    return () => {
      contextRef.current?.revert();
    };
  }, []);

  return contextRef;
}

// Easing presets
export const easings = {
  smooth: "power2.out",
  smoother: "power3.out",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.5)",
  expo: "expo.out",
};

// Animation defaults
export const animationDefaults = {
  duration: 0.8,
  ease: easings.smooth,
};
