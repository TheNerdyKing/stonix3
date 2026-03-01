"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Flame, TrendingUp, Zap, Check } from "lucide-react";

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
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const contentElements = contentRef.current?.querySelectorAll(".cta-element");
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      gsap.fromTo(
        deviceRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-dark-bg py-24 px-4 md:px-8"
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto bg-dark-card rounded-[3rem] border border-dark-border overflow-hidden relative min-h-[600px]"
      >
        <div
          ref={ringRef}
          className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20"
        >
          <div className="absolute inset-0 border border-pastel-purple/30 rounded-full" />
          <div className="absolute inset-20 border border-pastel-blue/20 rounded-full" />
          <div className="absolute inset-40 border border-pastel-cyan/10 rounded-full" />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 p-8 md:p-16 items-center min-h-[600px]">
          <div ref={contentRef}>
            <h2 className="cta-element text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Get unlimited growth experiments
            </h2>

            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <li key={index} className="cta-element flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-pastel-purple/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-pastel-purple" />
                    </div>
                    <span className="text-white text-lg">{benefit.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="cta-element flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
                Book a Strategy Call
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors border border-white/20">
                See Case Studies
              </button>
            </div>
          </div>

          <div ref={deviceRef} className="relative flex justify-center">
            <div className="relative w-[280px] md:w-[320px] h-[500px] md:h-[560px] bg-black rounded-[2.5rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-pastel-purple to-pastel-blue rounded-lg" />
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="w-1 h-1 bg-white/30 rounded-full" />
                    <div className="w-1 h-1 bg-white/30 rounded-full" />
                  </div>
                </div>

                <div className="text-center mb-8">
                  <p className="text-white/50 text-sm mb-1">Total Growth</p>
                  <p className="text-white text-4xl font-bold">+247%</p>
                  <div className="flex items-center justify-center gap-1 text-pastel-green text-sm mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>vs last month</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-white/50 text-xs">ROAS</p>
                    <p className="text-white text-xl font-bold">5.1x</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-white/50 text-xs">CPA</p>
                    <p className="text-white text-xl font-bold">$12.40</p>
                  </div>
                </div>

                <div className="h-24 bg-white/5 rounded-xl p-3 flex items-end gap-1">
                  {[35, 50, 40, 65, 55, 80, 70, 85, 75, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-pastel-purple to-pastel-blue rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-around">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-pastel-purple" />
                  </div>
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white/30" />
                  </div>
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white/30" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 px-4 py-2 bg-pastel-purple rounded-full shadow-lg">
              <span className="text-white text-sm font-medium">New record!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
