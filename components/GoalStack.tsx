"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Target, TrendingUp, Users, Zap, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const goals = [
  {
    text: "Generate Leads",
    icon: Users,
    metric: "50K+",
    sub: "Qualified leads captured",
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-cyan-500/20"
  },
  {
    text: "Track ROI",
    icon: Target,
    metric: "+147%",
    sub: "Average return on spend",
    color: "from-orange-400 to-orange-600",
    shadow: "shadow-orange-500/20"
  },
  {
    text: "Boost Conversion",
    icon: TrendingUp,
    metric: "3.2x",
    sub: "Increase in conversion rate",
    color: "from-emerald-400 to-emerald-600",
    shadow: "shadow-emerald-500/20"
  },
  {
    text: "Scale Instantly",
    icon: Zap,
    metric: "2x",
    sub: "Faster growth trajectory",
    color: "from-purple-400 to-purple-600",
    shadow: "shadow-purple-500/20"
  },
];

export default function GoalStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const rows = containerRef.current?.querySelectorAll(".goal-row");

      rows?.forEach((row) => {
        const textWrapper = row.querySelector(".text-wrapper");
        const metricCard = row.querySelector(".metric-card");
        const details = row.querySelector(".details");

        // Set initial states
        gsap.set(textWrapper, { opacity: 0.2, x: -40, scale: 0.95 });
        gsap.set(metricCard, { opacity: 0, x: 40, scale: 0.9 });
        gsap.set(details, { opacity: 0, height: 0, margin: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 60%", // When top of row hits 60% down the screen
            end: "bottom 40%", // When bottom of row hits 40% down the screen
            toggleActions: "play reverse play reverse",
          },
        });

        tl.to(textWrapper, { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" }, 0)
          .to(metricCard, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(1.2)" }, 0.1)
          .to(details, { opacity: 1, height: "auto", marginTop: "16px", duration: 0.4, ease: "power2.out" }, 0.2);

      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] overflow-hidden py-32 md:py-48"
    >
      {/* Background ambient light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-orange-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        <div className="mb-24 md:mb-32 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">performance.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/40 leading-relaxed font-light">
            Everything you need to stop guessing and start scaling. We align your entire funnel to hit core business metrics.
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col gap-12 md:gap-8">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <div
                key={index}
                className="goal-row group bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-6 md:p-8 hover:border-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                  {/* LEFT: Text & Icon */}
                  <div className="text-wrapper flex items-center gap-6 md:gap-8">
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${goal.shadow} bg-gradient-to-br ${goal.color}`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
                        {goal.text}
                      </span>
                      {/* Revealing subtitle detail */}
                      <div className="details overflow-hidden">
                        <div className="flex items-center gap-2 text-white/40 font-medium">
                          <ArrowRight className="w-4 h-4 text-orange-500" />
                          {goal.sub}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Metric Card */}
                  <div className="metric-card md:ml-auto">
                    <div className="bg-[#111] border border-white/5 rounded-2xl px-6 py-4 flex flex-col justify-center min-w-[160px]">
                      <span className="text-xs text-white/30 uppercase tracking-widest font-mono mb-1">Impact</span>
                      <span className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${goal.color}`}>
                        {goal.metric}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
