"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { ArrowRight, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(chipsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(headlineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(subtextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(buttonsRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center justify-center bg-background text-surface overflow-hidden pt-20 pb-16">
      {/* Subtle Background Gradient */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none" />

      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">

        {/* Trust Chips */}
        <div ref={chipsRef} className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {["ROI-focused", "Transparent reporting", "Fast experiments"].map((chip) => (
            <div key={chip} className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-medium backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              {chip}
            </div>
          ))}
        </div>

        <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight mb-6">
          Performance. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#4F84F0] to-accent">
            Not Just Marketing.
          </span>
        </h1>

        <p ref={subtextRef} className="text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed mb-10">
          We engineer full-funnel growth systems designed specifically for scalable ROI. We handle the mechanics, so you can focus on building your empire.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg w-full sm:w-auto transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
            <span>Book a Call</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full font-bold text-lg w-full sm:w-auto transition-colors hover:bg-white/10 hover:border-white/20">
            See Work
          </button>
        </div>
      </div>
    </section>
  );
}
