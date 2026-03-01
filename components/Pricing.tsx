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
      className="relative min-h-screen bg-dark-bg py-24 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Unlock all benefits
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Transparent pricing that scales with your growth. No hidden fees, no surprises.
        </p>
      </div>

      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8"
      >
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`pricing-card relative rounded-[2.5rem] p-8 border transition-all duration-300 ${
              plan.highlighted
                ? "bg-dark-card border-pastel-purple/50 shadow-[0_0_40px_rgba(179,71,217,0.15)] scale-105"
                : "bg-dark-card/50 border-dark-border hover:border-white/20"
            } ${hoveredIndex === index ? "-translate-y-2" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-pastel-purple rounded-full flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Most Popular</span>
              </div>
            )}

            <h3 className="text-white text-xl font-semibold mb-2">{plan.name}</h3>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-white text-5xl font-bold">{plan.price}</span>
              <span className="text-white/50">{plan.period}</span>
            </div>

            <p className="text-white/60 text-sm mb-8">{plan.description}</p>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-pastel-purple/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-pastel-purple" />
                  </div>
                  <span className="text-white/80 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-4 rounded-full font-medium transition-all duration-300 relative overflow-hidden group ${
                plan.highlighted
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-1 h-1 bg-pastel-purple rounded-full animate-ping"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "1.5s",
                    }}
                  />
                ))}
              </span>
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
