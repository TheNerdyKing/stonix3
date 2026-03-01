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
      className="relative min-h-screen bg-dark-bg py-24 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
        <div
          ref={leftCardRef}
          className="relative bg-dark-card rounded-[2.5rem] p-8 md:p-10 border border-dark-border overflow-hidden min-h-[500px] flex flex-col justify-between card-hover"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-pastel-purple/10 rounded-full blur-[80px]" />

          <div className="relative z-10 space-y-4">
            <div className="float-element bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-pastel-purple/20 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-pastel-purple" />
                </div>
                <span className="text-white/70 text-sm">Best Campaign</span>
              </div>
              <p className="text-white text-2xl font-bold">$80K Revenue</p>
              <div className="flex gap-1 mt-2">
                <div className="w-6 h-1.5 bg-pastel-purple rounded-full" />
                <div className="w-6 h-1.5 bg-pastel-purple/50 rounded-full" />
                <div className="w-6 h-1.5 bg-white/10 rounded-full" />
              </div>
            </div>

            <div className="float-element bg-white/5 rounded-2xl p-4 border border-white/10 ml-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Max ROAS</span>
                <TrendingUp className="w-4 h-4 text-pastel-green" />
              </div>
              <p className="text-white text-3xl font-bold">4.2x</p>
            </div>

            <div className="float-element bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/70 text-sm">Performance</span>
                <span className="text-pastel-green text-sm">+24%</span>
              </div>
              <div className="h-16 flex items-end gap-1">
                {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-pastel-purple to-pastel-blue rounded-t-sm"
                    style={{ height: `${h}%`, opacity: 0.6 + (i * 0.04) }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Keep your best results visible
            </h3>
          </div>

          <div className="absolute bottom-20 right-10 w-3 h-3 bg-pastel-blue rounded-full animate-pulse" />
        </div>

        <div
          ref={rightCardRef}
          className="relative bg-dark-card rounded-[2.5rem] p-8 md:p-10 border border-dark-border overflow-hidden min-h-[500px] flex flex-col justify-between card-hover"
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pastel-blue/10 rounded-full blur-[80px]" />

          <div className="relative z-10 flex-1 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="float-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-pastel-blue to-pastel-purple flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <p className="text-white text-4xl font-bold">4.2x</p>
                    <p className="text-white/70 text-xs">ROAS</p>
                  </div>
                </div>
              </div>

              <div className="float-element absolute top-0 right-0 w-16 h-16">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-pastel-yellow to-pastel-pink flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-black" />
                </div>
              </div>

              <div className="float-element absolute bottom-4 left-0 w-14 h-14">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-pastel-cyan to-pastel-green flex items-center justify-center shadow-lg">
                  <Award className="w-5 h-5 text-black" />
                </div>
              </div>

              <div className="float-element absolute -top-2 left-1/4 px-3 py-1.5 bg-pastel-purple rounded-full shadow-lg">
                <span className="text-white text-xs font-medium">Top performer!</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Hit milestones with clarity
            </h3>
          </div>

          <div className="absolute top-10 left-10 w-2 h-2 bg-pastel-pink rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-pastel-cyan rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>
    </section>
  );
}
