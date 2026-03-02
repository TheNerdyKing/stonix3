"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Check, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "$2,500",
    period: "/month",
    description: "Perfect for startups testing paid acquisition",
    features: [
      "2 ad platforms",
      "$10K monthly ad spend",
      "Weekly reporting",
      "Basic creative support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$5,000",
    period: "/month",
    description: "For brands ready to scale profitably",
    features: [
      "4 ad platforms",
      "$50K monthly ad spend",
      "Real-time dashboard",
      "Full creative suite",
      "A/B testing & CRO",
      "Dedicated strategist",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    price: "$10,000",
    period: "/month",
    description: "Enterprise growth with full-funnel coverage",
    features: [
      "Unlimited platforms",
      "$200K+ monthly ad spend",
      "Custom integrations",
      "In-house creative team",
      "Advanced attribution",
      "24/7 support",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".pricing-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative min-h-screen bg-[#050505] py-24 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Unlock all <span className="text-orange-500">benefits</span>
        </h2>
        <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
          Transparent pricing that scales with your growth. No hidden fees, just results.
        </p>
      </div>

      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8 relative z-10"
      >
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`pricing-card relative rounded-[3rem] p-10 border transition-all duration-500 ${plan.highlighted
                ? "bg-[#0A0A0A] border-orange-500/30 shadow-[0_30px_60px_rgba(249,115,22,0.1)] scale-105 z-20"
                : "bg-white/[0.02] border-white/5 hover:border-white/10"
              } ${hoveredIndex === index ? "-translate-y-3" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-orange-500 rounded-full flex items-center gap-2 shadow-lg">
                <Sparkles className="w-4 h-4 text-black" />
                <span className="text-black text-xs font-bold uppercase tracking-widest">Most Popular</span>
              </div>
            )}

            <h3 className="text-white/50 text-sm font-bold uppercase tracking-widest mb-6">{plan.name}</h3>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-white text-5xl font-bold tabular-nums">{plan.price}</span>
              <span className="text-white/30 text-sm font-medium">{plan.period}</span>
            </div>

            <p className="text-white/40 text-sm mb-10 min-h-[40px] leading-relaxed italic">"{plan.description}"</p>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 border border-orange-500/20">
                    <Check className="w-3 h-3 text-orange-500" />
                  </div>
                  <span className="text-white/70 text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-5 rounded-full font-bold transition-all duration-300 relative overflow-hidden group ${plan.highlighted
                  ? "bg-orange-500 text-black hover:bg-orange-400 shadow-xl"
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                }`}
            >
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
