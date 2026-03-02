"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
  { label: "Setup" },
  { label: "Launch" },
  { label: "Optimize" },
  { label: "Scale" },
];

export default function ProgressRing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const outerRingRef = useRef<SVGCircleElement>(null);
  const glowCoreRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Safe checks
        if (!ringRef.current || !outerRingRef.current) return;

        const circumference = 2 * Math.PI * 140;
        const outerCircumference = 2 * Math.PI * 170;

        // Force initial states robustly via GSAP, protected from null targets
        gsap.set(ringRef.current, { strokeDasharray: circumference, strokeDashoffset: circumference });
        gsap.set(outerRingRef.current, { strokeDasharray: outerCircumference, strokeDashoffset: outerCircumference });

        const bgs = gsap.utils.toArray(".step-bg");
        const dots = gsap.utils.toArray(".step-dot");
        const checks = gsap.utils.toArray(".step-check");
        const lines = gsap.utils.toArray(".step-line");

        if (bgs.length) gsap.set(bgs, { opacity: 0 });
        if (dots.length) gsap.set(dots, { opacity: 1, scale: 1 });
        if (checks.length) gsap.set(checks, { opacity: 0, scale: 0 });
        if (lines.length) gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",    // Starts slightly before section is centered
            end: "bottom 80%",   // Ends when scrolling past it
            scrub: 1,            // Smooth 1-second delay scrub
          },
        });

        // Main scrub timeline filling paths
        tl.to(ringRef.current, { strokeDashoffset: circumference * 0.15, duration: 4, ease: "none" }, 0);
        tl.to(outerRingRef.current, { strokeDashoffset: outerCircumference * 0.3, duration: 4, ease: "none" }, 0);

        if (glowCoreRef.current) {
          tl.to(glowCoreRef.current, { scale: 1.2, opacity: 0.8, duration: 4, ease: "none" }, 0);
        }

        // Spin the outer ring infinitely, INDEPENDENT of scrub timeline
        gsap.to(outerRingRef.current, {
          rotation: "+=360",
          svgOrigin: "250 250", // Correctly rotate around SVG coordinate center
          repeat: -1,
          duration: 20,
          ease: "linear"
        });

        // Sequence the 4 dots over the same 4-second timeline
        const markers = gsap.utils.toArray<HTMLElement>(".step-wrapper");

        markers.forEach((marker, i) => {
          const bg = marker.querySelector(".step-bg");
          const dot = marker.querySelector(".step-dot");
          const check = marker.querySelector(".step-check");
          const line = marker.querySelector(".step-line");

          const startTime = i * 1; // 0s, 1s, 2s, 3s

          if (bg) tl.to(bg, { opacity: 1, duration: 0.2 }, startTime);
          if (dot) tl.to(dot, { opacity: 0, scale: 0, duration: 0.2 }, startTime);
          if (check) tl.to(check, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.5)" }, startTime);
          if (line) tl.to(line, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, startTime + 0.2);
        });
      });

      mm.add("(max-width: 767px)", () => {
        if (ringRef.current) gsap.set(ringRef.current, { strokeDashoffset: 140 * 2 * Math.PI * 0.15 });

        const bgs = gsap.utils.toArray(".step-bg");
        const dots = gsap.utils.toArray(".step-dot");
        const checks = gsap.utils.toArray(".step-check");
        const lines = gsap.utils.toArray(".step-line");

        if (bgs.length) gsap.set(bgs, { opacity: 1 });
        if (dots.length) gsap.set(dots, { opacity: 0, scale: 0 });
        if (checks.length) gsap.set(checks, { opacity: 1, scale: 1 });
        if (lines.length) gsap.set(lines, { scaleX: 1 });
      });

      // Entry card floating animation
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] py-24 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-[1000px] aspect-square rounded-full border border-white/5 absolute opacity-20" />
        <div className="w-full max-w-[1400px] aspect-square rounded-full border border-white/5 absolute opacity-10" />
      </div>

      <div
        ref={cardRef}
        className="relative w-full max-w-4xl mx-4 aspect-[4/3] md:aspect-[2/1] bg-[#0A0A0A] rounded-[3rem] border border-white/5 flex items-center justify-center overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

        {/* Core Glow */}
        <div
          ref={glowCoreRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-[60px] opacity-40 mix-blend-screen scale-75 pointer-events-none"
        />

        <svg
          className="absolute inset-0 w-full h-full p-8 md:p-12 pointer-events-none"
          viewBox="0 0 500 500"
        >
          <defs>
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Track Rings */}
          <circle cx="250" cy="250" r="170" fill="none" stroke="white" strokeOpacity="0.02" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="250" cy="250" r="140" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="24" />

          {/* Animated Outer Ring */}
          <circle
            ref={outerRingRef}
            cx="250"
            cy="250"
            r="170"
            fill="none"
            stroke="url(#primaryGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="10 20"
            transform="rotate(-90 250 250)"
            className="opacity-50"
          />

          {/* Animated Inner Ring */}
          <circle
            ref={ringRef}
            cx="250"
            cy="250"
            r="140"
            fill="none"
            stroke="url(#primaryGradient)"
            strokeWidth="24"
            strokeLinecap="round"
            transform="rotate(-90 250 250)"
            filter="url(#glow)"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-8 pointer-events-none">
          <h2 className="text-4xl md:text-5xl font-black text-white text-center tracking-tight mb-2">
            Scale <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Instantly.
            </span>
          </h2>
          <p className="text-white/40 font-mono text-sm tracking-widest uppercase mb-12">System Output: Max</p>

          <div className="flex items-center gap-2 md:gap-4 bg-black/40 p-2 md:p-3 rounded-2xl backdrop-blur-md border border-white/5 pointer-events-auto">
            {timelineSteps.map((_, idx) => (
              <div key={idx} className="step-wrapper flex items-center gap-2 md:gap-4">

                {/* Circle Node */}
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/5 bg-[#0F0F0F] overflow-hidden flex items-center justify-center z-10">
                  {/* Independent DOM nodes for robust GSAP selectors */}
                  <div className="step-bg absolute inset-0 bg-orange-500/20 border border-orange-500/50 rounded-full opacity-0" />
                  <div className="step-dot absolute w-2 h-2 rounded-full bg-white/30" />
                  <div className="step-check absolute inset-0 flex items-center justify-center opacity-0 scale-50">
                    <Check className="w-4 h-4 text-orange-500" />
                  </div>
                </div>

                {/* Connecting Line */}
                {idx < timelineSteps.length - 1 && (
                  <div className="relative h-px w-6 md:w-12 bg-white/5">
                    <div className="step-line border-t border-orange-500/60 absolute inset-0 drop-shadow-[0_0_8px_rgba(249,115,22,1)] origin-left scale-x-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
