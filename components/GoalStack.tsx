"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Target, TrendingUp, Users, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const goals = [
  { text: "Generate leads", icon: Users },
  { text: "Track ROI", icon: Target },
  { text: "Improve conversion", icon: TrendingUp },
  { text: "Stay scalable", icon: Zap },
];

export default function GoalStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const lines = linesRef.current?.querySelectorAll(".goal-line");
      if (!lines) return;

      lines.forEach((line, index) => {
        gsap.fromTo(
          line,
          { opacity: 0.2, color: "#666" },
          {
            opacity: 1,
            color: "#fff",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${index * 20}% center`,
              end: `${(index + 1) * 20}% center`,
              scrub: true,
            },
          }
        );
      });

      lines.forEach((line, index) => {
        if (index > 0) {
          gsap.to(line, {
            opacity: 0.2,
            color: "#666",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${(index + 1) * 20}% center`,
              end: `${(index + 2) * 20}% center`,
              scrub: true,
            },
          });
        }
      });

      const badges = badgesRef.current?.querySelectorAll(".floating-badge");
      badges?.forEach((badge, i) => {
        gsap.to(badge, {
          y: "+=15",
          x: "+=10",
          rotation: i % 2 === 0 ? 5 : -5,
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
      className="relative min-h-[200vh] bg-dark-bg py-32"
    >
      <div ref={badgesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-badge absolute top-[10%] left-[15%] px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-2">
          <Target className="w-4 h-4 text-pastel-purple" />
          <span className="text-white text-sm">+147% ROI</span>
        </div>
        <div className="floating-badge absolute top-[25%] right-[20%] px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-pastel-green" />
          <span className="text-white text-sm">3.2x ROAS</span>
        </div>
        <div className="floating-badge absolute top-[45%] left-[10%] px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-2">
          <Users className="w-4 h-4 text-pastel-blue" />
          <span className="text-white text-sm">50K+ Leads</span>
        </div>
        <div className="floating-badge absolute top-[60%] right-[15%] px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-2">
          <Zap className="w-4 h-4 text-pastel-yellow" />
          <span className="text-white text-sm">2x Growth</span>
        </div>
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div ref={linesRef} className="flex flex-col items-center gap-4 md:gap-8">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <div
                key={index}
                className="goal-line flex items-center gap-4 md:gap-6 opacity-20 transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Icon className="w-5 h-5 md:w-7 md:h-7 text-pastel-purple" />
                </div>
                <span className="text-3xl md:text-6xl lg:text-7xl font-bold text-center">
                  {goal.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
