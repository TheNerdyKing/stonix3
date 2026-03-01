"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Sparkles, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const heroPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const floatingCard1Ref = useRef<HTMLDivElement>(null);
  const floatingCard2Ref = useRef<HTMLDivElement>(null);
  const glowRingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const entryTl = gsap.timeline({ delay: 0.5 });

      entryTl.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      entryTl.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      );

      entryTl.fromTo(
        subtextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      entryTl.fromTo(
        buttonsRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );

      entryTl.fromTo(
        deviceRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

      entryTl.fromTo(
        floatingCard1Ref.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.5"
      );

      entryTl.fromTo(
        floatingCard2Ref.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      scrollTl.to(navRef.current, {
        opacity: 0,
        y: -20,
        ease: "power2.in",
      }, 0);

      scrollTl.to([headlineRef.current, subtextRef.current], {
        opacity: 0.3,
        ease: "power2.in",
      }, 0);

      scrollTl.to(heroPanelRef.current, {
        y: "-30%",
        ease: "power2.inOut",
      }, 0);

      scrollTl.to(deviceRef.current, {
        scale: 1.1,
        y: "-10%",
        ease: "power2.inOut",
      }, 0.2);

      scrollTl.fromTo(
        glowRingsRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, ease: "power2.out" },
        0.3
      );

      scrollTl.to([floatingCard1Ref.current, floatingCard2Ref.current], {
        opacity: 0,
        ease: "power2.in",
      }, 0.1);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-dark-bg overflow-hidden"
    >
      <div
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 opacity-0"
      >
        <nav className="flex items-center gap-8 px-6 py-3 bg-black/80 backdrop-blur-xl rounded-full border border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pastel-blue to-pastel-lavender rounded-lg flex items-center justify-center">
              <span className="text-black text-sm font-bold">LG</span>
            </div>
            <span className="text-white font-semibold">LumaGrowth</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-white/70 hover:text-white text-sm transition-colors">
              Services
            </a>
            <a href="#work" className="text-white/70 hover:text-white text-sm transition-colors">
              Work
            </a>
            <a href="#pricing" className="text-white/70 hover:text-white text-sm transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-white/70 hover:text-white text-sm transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Sparkles className="w-4 h-4 text-white" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <TrendingUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </nav>
      </div>

      <div
        ref={heroPanelRef}
        className="relative mx-4 md:mx-8 mt-24 rounded-[3rem] overflow-hidden gpu-accelerate"
        style={{
          background: "linear-gradient(135deg, #A8C5FF 0%, #D4B8FF 100%)",
          minHeight: "calc(100vh - 8rem)",
        }}
      >
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400/30 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/30 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6 py-20">
          <h1
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-black text-center max-w-4xl leading-tight opacity-0"
          >
            Launch campaigns that actually convert
          </h1>

          <p
            ref={subtextRef}
            className="mt-6 text-lg md:text-xl text-black/70 text-center max-w-2xl opacity-0"
          >
            Performance marketing + creative + CRO. We help brands scale profitably.
          </p>

          <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4 mt-10">
            <button className="px-8 py-4 bg-black text-white rounded-full font-medium flex items-center gap-2 hover:bg-black/80 transition-colors">
              Book a Strategy Call
            </button>
            <button className="px-8 py-4 bg-white/50 backdrop-blur-sm text-black rounded-full font-medium flex items-center gap-2 hover:bg-white/70 transition-colors border border-black/10">
              See Case Studies
            </button>
          </div>

          <div ref={deviceRef} className="relative mt-16 opacity-0">
            <div className="relative w-[300px] md:w-[400px] h-[500px] md:h-[600px] bg-black rounded-[2.5rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/50 text-sm">Total Revenue</p>
                    <p className="text-white text-2xl font-bold">$124,592</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>+24.5%</span>
                  </div>
                </div>

                <div className="h-32 bg-gradient-to-r from-pastel-purple/20 to-pastel-blue/20 rounded-2xl mb-6 flex items-end p-4">
                  <div className="flex items-end gap-2 w-full h-full">
                    {[40, 60, 45, 80, 55, 90, 70, 85, 65, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-pastel-purple to-pastel-blue rounded-t-sm"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-white/50 text-xs">ROAS</p>
                    <p className="text-white text-xl font-bold">4.2x</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-white/50 text-xs">CPA</p>
                    <p className="text-white text-xl font-bold">$18.50</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-white/50 text-xs">CTR</p>
                    <p className="text-white text-xl font-bold">3.8%</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-white/50 text-xs">Conversions</p>
                    <p className="text-white text-xl font-bold">1,247</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={floatingCard1Ref}
              className="absolute -right-16 top-20 w-32 bg-black rounded-2xl p-3 shadow-xl border border-white/10 opacity-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white text-xs font-medium">Leads</span>
              </div>
              <p className="text-white text-lg font-bold">+156%</p>
            </div>

            <div
              ref={floatingCard2Ref}
              className="absolute -left-12 bottom-32 w-28 bg-black rounded-2xl p-3 shadow-xl border border-white/10 opacity-0"
            >
              <p className="text-white/50 text-xs">Active Ads</p>
              <p className="text-white text-lg font-bold">42</p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={glowRingsRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
        style={{ top: "30%" }}
      >
        <div className="relative w-[600px] h-[600px]">
          <div className="absolute inset-0 border border-purple-500/20 rounded-full" />
          <div className="absolute inset-8 border border-blue-500/20 rounded-full" />
          <div className="absolute inset-16 border border-teal-500/20 rounded-full" />
          <div className="absolute inset-24 border border-purple-500/10 rounded-full" />
        </div>
      </div>

      <div className="absolute right-1/4 top-1/2 w-2 h-2 bg-pastel-purple rounded-full shadow-[0_0_20px_rgba(179,71,217,0.8)] animate-pulse-glow" />
    </section>
  );
}
