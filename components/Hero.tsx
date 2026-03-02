"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Sparkles, TrendingUp, Search, Zap, Palette, ArrowRight, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const heroPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const glowRingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set([navRef.current, headlineRef.current, subtextRef.current, deviceRef.current], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1.5, // Smoother scrub
            pinSpacing: true,
          },
        });

        scrollTl.to(navRef.current, { opacity: 0, y: -50, ease: "power2.inOut" }, 0);
        scrollTl.to(heroPanelRef.current, { scale: 0.95, y: "-10%", borderRadius: "4rem", ease: "power2.inOut" }, 0);

        // Deep 3D tilt as you scroll away
        scrollTl.to(deviceRef.current, {
          scale: 1.2,
          y: "-15%",
          rotationX: 25,
          rotationY: -10,
          transformPerspective: 1000,
          ease: "power2.inOut",
          boxShadow: "0 60px 100px -20px rgba(249,115,22,0.4)"
        }, 0);

        scrollTl.to(glowRingsRef.current, { opacity: 1, scale: 1.5, y: -100 }, 0);
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set([navRef.current, headlineRef.current, subtextRef.current, deviceRef.current], { opacity: 1, y: 0, scale: 1 });
      });

      // Entry animations
      const entryTl = gsap.timeline();
      entryTl.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
      entryTl.fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.5");
      entryTl.fromTo(subtextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.7");
      entryTl.fromTo(buttonsRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.5");
      entryTl.fromTo(deviceRef.current, { y: 60, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" }, "-=0.6");

      // Floating animations for mock UI cards
      const floatingCards = gsap.utils.toArray(".mock-float-card");
      floatingCards.forEach((card, i) => {
        gsap.to(card as Element, {
          y: i % 2 === 0 ? -12 : 12,
          rotation: i % 2 === 0 ? 2 : -2,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Simple parallax on mouse move for desktop
      const moveDevice = (e: MouseEvent) => {
        if (window.innerWidth < 768) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(deviceRef.current, {
          x: xPos,
          y: yPos,
          rotationY: xPos / 2,
          rotationX: -yPos / 2,
          duration: 1.5,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", moveDevice);
      return () => {
        window.removeEventListener("mousemove", moveDevice);
        mm.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] overflow-hidden"
    >
      <div ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-auto">
        <nav className="flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 border border-white/20 hover:scale-105 transition-transform cursor-pointer">
              <span className="text-black text-sm font-black tracking-tighter">LG</span>
            </div>
            <span className="text-white font-bold tracking-tight hidden sm:block">LumaGrowth</span>
          </div>
          <div className="hidden md:flex items-center gap-8 px-4">
            <a href="#services" className="text-white/60 hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer">Services</a>
            <a href="#work" className="text-white/60 hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer">Work</a>
            <a href="#contact" className="text-white/60 hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer">Contact</a>
          </div>
          <button className="w-10 h-10 rounded-full bg-orange-500/10 hover:bg-orange-500/20 flex items-center justify-center border border-orange-500/30 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.15)] cursor-pointer">
            <Sparkles className="w-4 h-4 text-orange-500" />
          </button>
        </nav>
      </div>

      <div
        ref={heroPanelRef}
        className="relative mx-4 md:mx-8 md:mt-10 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-[#0A0A0A]"
        style={{
          minHeight: "calc(100vh - 4rem)",
        }}
      >

        {/* Deep ambient back glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[50vh] bg-gradient-to-b from-transparent via-orange-500/5 to-transparent blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 pt-32 pb-20">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Next-Gen Performance
          </div>

          <h1
            ref={headlineRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white text-center max-w-6xl leading-[0.9] tracking-tighter mb-8"
          >
            Scale at the speed <br className="hidden md:block" />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 pb-2">
              of creativity.
              {/* Underline swoosh */}
              <svg className="absolute w-full h-8 -bottom-4 left-0 text-orange-500/50 pointer-events-none hidden md:block" viewBox="0 0 300 24" preserveAspectRatio="none">
                <path d="M2,20 Q150,0 298,20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p
            ref={subtextRef}
            className="mt-2 text-xl md:text-2xl text-white/50 text-center max-w-2xl font-light tracking-wide leading-relaxed"
          >
            Stop guessing. Start scaling. Dominate your market with campaigns that actually convert.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 w-full sm:w-auto relative z-20">
            <button className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-orange-500 text-black rounded-full font-bold text-lg w-full sm:w-auto overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
              <span className="relative z-10">Start Scaling</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            <button className="flex items-center justify-center gap-3 px-10 py-5 bg-white/[0.03] backdrop-blur-md text-white border border-white/10 rounded-full font-bold text-lg w-full sm:w-auto transition-colors hover:bg-white/[0.08] hover:border-white/20">
              View Results
            </button>
          </div>

          <div ref={deviceRef} className="relative mt-24 md:mt-32 w-full max-w-5xl mx-auto perspective-2000 pointer-events-none">

            {/* Massive Aura behind Dashboard */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-orange-500/0 blur-[100px] rounded-[100px] scale-110 -z-10" />

            {/* The Main Mock App Window */}
            <div className="relative w-full aspect-[16/10] md:aspect-[21/9] bg-[#0A0A0A] rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">

              {/* Glass Header */}
              <div className="absolute top-0 inset-x-0 h-14 md:h-16 border-b border-white/5 flex items-center px-6 md:px-8 gap-4 bg-white/[0.02] backdrop-blur-xl z-20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>

                {/* Mock Search Bar */}
                <div className="mx-auto w-1/3 max-w-[300px] h-8 rounded-full bg-white/5 flex items-center px-4 border border-white/5">
                  <div className="w-full h-1.5 bg-white/10 rounded-full" />
                </div>

                <div className="px-5 py-2 bg-orange-500/10 rounded-full border border-orange-500/20 text-[10px] md:text-xs text-orange-500 font-bold tracking-widest uppercase flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  Live Sync
                </div>
              </div>

              {/* Main Dashboard Grid */}
              <div className="absolute inset-0 pt-16 md:pt-20 px-6 md:px-10 pb-8 flex flex-col md:flex-row gap-6 md:gap-8 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-repeat bg-opacity-5">

                {/* Left Sidebar Mock */}
                <div className="hidden md:flex w-64 flex-col gap-4 relative z-10 border-r border-white/5 pr-8">
                  <div className="h-4 w-20 bg-white/20 rounded-full mb-8" />
                  <div className="h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center px-4 gap-3">
                    <div className="w-6 h-6 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-orange-500" />
                    </div>
                    <div className="h-2 w-20 bg-orange-500/50 rounded-full" />
                  </div>
                  <div className="h-12 rounded-2xl bg-white/5 flex items-center px-4 gap-3">
                    <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
                      <Target className="w-3 h-3 text-white/40" />
                    </div>
                    <div className="h-2 w-24 bg-white/20 rounded-full" />
                  </div>
                  <div className="h-12 rounded-2xl bg-white/5 flex items-center px-4 gap-3">
                    <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
                      <Palette className="w-3 h-3 text-white/40" />
                    </div>
                    <div className="h-2 w-16 bg-white/20 rounded-full" />
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col gap-6 md:gap-8 min-w-0">
                  <div className="flex justify-between items-end">
                    <div className="space-y-3">
                      <div className="h-3 w-16 bg-orange-500/50 rounded-full" />
                      <div className="h-10 w-48 bg-white/20 rounded-xl" />
                    </div>
                    <div className="hidden md:flex gap-2">
                      <div className="h-10 w-10 rounded-xl bg-white/5" />
                      <div className="h-10 w-10 rounded-xl bg-white/5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Floating Stat Card 1 */}
                    <div className="mock-float-card h-32 md:h-40 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-white/10 p-5 md:p-6 shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-orange-500/30 transition-colors" />
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 border border-orange-500/30">
                        <Zap className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="h-8 md:h-10 w-24 md:w-32 bg-white/20 rounded-xl mb-3" />
                      <div className="h-2 w-16 bg-white/10 rounded-full" />
                    </div>

                    {/* Floating Stat Card 2 */}
                    <div className="mock-float-card h-32 md:h-40 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-white/10 p-5 md:p-6 shadow-2xl relative overflow-hidden group" style={{ animationDelay: "1s" }}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-colors" />
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
                        <Search className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="h-8 md:h-10 w-20 md:w-28 bg-white/20 rounded-xl mb-3" />
                      <div className="h-2 w-20 bg-white/10 rounded-full" />
                    </div>

                    {/* Large Chart Area Mock */}
                    <div className="mock-float-card col-span-2 md:col-span-1 h-32 md:h-40 rounded-3xl bg-[#111] border border-white/5 p-5 md:p-6 shadow-xl flex flex-col justify-end" style={{ animationDelay: "2s" }}>
                      <div className="flex items-end gap-2 w-full h-[60%] opacity-80 mt-auto">
                        <div className="flex-1 bg-white/10 rounded-t-md h-[40%]" />
                        <div className="flex-1 bg-white/10 rounded-t-md h-[50%]" />
                        <div className="flex-1 bg-white/20 rounded-t-md h-[80%]" />
                        <div className="flex-1 bg-orange-500/50 rounded-t-md h-[95%]" />
                        <div className="flex-1 bg-orange-500 rounded-t-md h-[100%] drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={glowRingsRef}
        className="absolute inset-x-0 bottom-0 flex items-center justify-center pointer-events-none opacity-0 h-1/2 -z-10"
      >
        <div className="w-full h-full bg-orange-600/20 blur-[200px] translate-y-1/2" />
      </div>
    </section>
  );
}
