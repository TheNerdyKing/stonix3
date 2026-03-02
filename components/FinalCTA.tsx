"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Flame, TrendingUp, Zap, Calendar, Clock, User, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { text: "Unlimited campaign experiments", icon: Flame },
  { text: "Real-time performance tracking", icon: TrendingUp },
  { text: "Weekly strategy calls", icon: Zap },
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set([containerRef.current, contentRef.current?.children || [], deviceRef.current], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          containerRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );

        const elements = contentRef.current?.querySelectorAll(".cta-element");
        if (elements) {
          gsap.fromTo(
            elements,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
              },
            }
          );
        }

        gsap.fromTo(
          deviceRef.current,
          { x: 50, opacity: 0, rotateY: -15, transformOrigin: "left center" },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set([containerRef.current], { opacity: 1, y: 0, scale: 1 });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] py-24 px-4 md:px-8 overflow-hidden flex items-center"
    >
      {/* Deep Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-orange-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto w-full bg-[#0A0A0A] rounded-[3.5rem] border border-white/5 overflow-hidden relative shadow-3xl"
      >
        {/* Subtle top edge highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-[500px] bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 p-10 md:p-20 items-center">

          {/* LEFT SIDE TEXT */}
          <div ref={contentRef} className="flex flex-col">
            <div className="cta-element inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-500 text-xs font-bold tracking-widest uppercase mb-8 w-fit">
              <Zap className="w-3 h-3" /> Start Scaling
            </div>

            <h2 className="cta-element text-5xl md:text-7xl font-black text-white mb-8 leading-[1] tracking-tighter">
              Ready to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                dominate?
              </span>
            </h2>

            <ul className="space-y-6 mb-12">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <li key={index} className="cta-element flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all duration-300 shadow-lg">
                      <Icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <span className="text-white/60 text-xl font-light">{benefit.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="cta-element">
              <button className="flex items-center gap-3 px-8 py-5 bg-orange-500 hover:bg-orange-400 text-black rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:-translate-y-1">
                Book Your Strategy Call
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE DETAILED MOCK UI */}
          <div ref={deviceRef} className="relative flex justify-center lg:justify-end perspective-2000">

            {/* The Booking Widget Mock */}
            <div className="relative w-full max-w-[440px] bg-[#111] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden group transform hover:rotate-y-5 transition-transform duration-700">

              {/* Animated Aura inside frame */}
              <div className="absolute inset-x-0 -top-40 h-80 bg-orange-500/20 blur-3xl rounded-full opacity-50 pointer-events-none" />

              {/* Mac Header */}
              <div className="absolute top-0 inset-x-0 h-14 border-b border-white/5 flex items-center px-6 gap-2 bg-white/[0.02] z-20 backdrop-blur-md">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="ml-auto text-[10px] text-white/30 uppercase tracking-widest font-mono">
                  Schedule_Strategy_Session
                </div>
              </div>

              {/* Calendar / Form Content */}
              <div className="relative z-10 pt-20 pb-8 px-8 flex flex-col gap-6">

                {/* User Info Mock */}
                <div className="flex items-center gap-4 pb-6 border-b border-white/5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <User className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Strategy Call</h4>
                    <p className="text-white/40 text-sm">45 Min • Zoom Video</p>
                  </div>
                </div>

                {/* Inputs Mock */}
                <div className="space-y-4">
                  <div className="h-14 w-full bg-[#1A1A1A] rounded-2xl border border-white/5 px-5 flex items-center group-hover:border-orange-500/30 transition-colors">
                    <span className="text-white/20 text-sm">Corporate Email...</span>
                  </div>
                  <div className="h-14 w-full bg-[#1A1A1A] rounded-2xl border border-white/5 px-5 flex items-center group-hover:border-orange-500/30 transition-colors">
                    <span className="text-white/20 text-sm">Website URL...</span>
                  </div>
                </div>

                {/* Date/Time Mock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-orange-500/5 rounded-2xl border border-orange-500/20 p-4 flex flex-col justify-center items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <span className="text-white font-bold text-sm">Tomorrow</span>
                  </div>
                  <div className="h-24 bg-white/[0.02] rounded-2xl border border-white/5 p-4 flex flex-col justify-center items-center gap-2">
                    <Clock className="w-5 h-5 text-white/40" />
                    <span className="text-white/40 font-bold text-sm">10:00 AM</span>
                  </div>
                </div>

                <div className="mt-4 h-14 w-full bg-orange-500 hover:bg-orange-400 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.2)] flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-black font-bold">Confirm Booking</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
