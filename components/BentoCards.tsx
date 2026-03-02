"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { TrendingUp, Target, Zap, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BentoCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [leftCardRef.current, rightCardRef.current],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const floatingElements = sectionRef.current?.querySelectorAll(".float-element");
      floatingElements?.forEach((el, i) => {
        gsap.to(el, {
          y: "+=10",
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] py-24 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
        <div
          ref={leftCardRef}
          className="relative bg-[#0A0A0A] rounded-[2.5rem] p-8 md:p-10 border border-white/5 overflow-hidden min-h-[500px] flex flex-col justify-between card-hover shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px]" />

          <div className="relative z-10 space-y-4">
            <div className="float-element bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-white/40 text-sm">Best Campaign</span>
              </div>
              <p className="text-white text-2xl font-bold">$80K Revenue</p>
              <div className="flex gap-1 mt-2">
                <div className="w-6 h-1.5 bg-orange-500 rounded-full" />
                <div className="w-6 h-1.5 bg-orange-500/50 rounded-full" />
                <div className="w-6 h-1.5 bg-white/10 rounded-full" />
              </div>
            </div>

            <div className="float-element bg-white/5 rounded-2xl p-4 border border-white/10 ml-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/40 text-sm">Max ROAS</span>
                <TrendingUp className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-white text-3xl font-bold">4.8x</p>
            </div>

            <div className="float-element bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/40 text-sm">Performance</span>
                <span className="text-orange-400 text-sm">+24%</span>
              </div>
              <div className="h-16 flex items-end gap-1">
                {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-sm"
                    style={{ height: `${h}%`, opacity: 0.6 + (i * 0.04) }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Keep your best <br /> results visible
            </h3>
          </div>
        </div>

        <div
          ref={rightCardRef}
          className="relative bg-[#0A0A0A] rounded-[2.5rem] p-8 md:p-10 border border-white/5 overflow-hidden min-h-[500px] flex flex-col justify-between card-hover shadow-2xl"
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/5 rounded-full blur-[80px]" />

          <div className="relative z-10 flex-1 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="float-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg border border-white/10">
                  <div className="text-center">
                    <p className="text-black text-4xl font-black italic tracking-tighter">4.8x</p>
                    <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest">ROAS</p>
                  </div>
                </div>
              </div>

              <div className="float-element absolute top-0 right-0 w-16 h-16">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-black" />
                </div>
              </div>

              <div className="float-element absolute bottom-4 left-0 w-14 h-14">
                <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                  <Award className="w-5 h-5 text-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Hit milestones <br /> with clarity
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
