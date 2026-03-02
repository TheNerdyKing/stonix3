"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Search, Target, Palette, Settings } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ChooseChannel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".feature-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
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
      className="relative min-h-[60vh] bg-[#050505] py-32 overflow-hidden border-t border-white/5"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-3/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">
              Growth Infrastructure
            </p>
            <h2
              ref={headlineRef}
              className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]"
            >
              Precision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">marketing.</span>
            </h2>
          </div>
          <p className="text-white/30 text-lg md:text-xl font-light max-w-sm italic">
            Helping ambitious brands move faster and grow smarter.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Performance Ads",
              desc: "High-ROAS campaigns across Meta, Google, and TikTok.",
              icon: Target,
            },
            {
              title: "SEO Dynamics",
              desc: "Strategic content that captures intent and converts.",
              icon: Search,
            },
            {
              title: "Brand Impact",
              desc: "Creative assets designed for the next generation of scroll.",
              icon: Palette,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="feature-card group p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-orange-500/20 hover:bg-orange-500/[0.03] transition-all duration-700"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-orange-500/10 transition-all duration-700 border border-white/5">
                <item.icon className="w-6 h-6 text-white group-hover:text-orange-500 transition-colors" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-6 tracking-tight">{item.title}</h4>
              <p className="text-white/30 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
