"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: "Growth Catalyst",
    price: "$2,500/",
    desc: "For businesses looking to establish a strong performance foundation.",
    features: ["Dedicated Account Manager", "Google Ads OR Meta Ads", "Bi-weekly Reporting", "1 Ad Creative Refresh / Month", "Basic Landing Page Optimization", "Slack Support"],
  },
  {
    name: "Scale Omnichannel",
    price: "$5,000/",
    desc: "Our most popular package. Aggressive scale across multiple networks.",
    features: ["Senior Media Buyer", "Google Ads AND Meta Ads", "Weekly Strategy Calls", "4 Ad Creative Refreshes / Month", "A/B Testing Funnel Edits", "Priority Slack Channel", "Retention Strategy (Email/SMS)"],
    popular: true,
  },
  {
    name: "Enterprise Domination",
    price: "Custom",
    desc: "Full-stack marketing department replacement for enterprise scale.",
    features: ["Fractional CMO Strategy", "Omnichannel Media Buying", "Daily KPI Tracking", "Unlimited Creative Production", "Custom Tracking Architecture", "Bespoke Automation Workflows", "Dedicated 24/7 Slack Channel"],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-32 bg-background relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4">Investment</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">Transparent Pricing Packages.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center lg:px-12">
          {packages.map((pkg, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 ${pkg.popular
                  ? "bg-primary/5 border-primary shadow-[0_0_30px_rgba(37,99,235,0.2)] md:scale-105 z-10"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}

              <h4 className="text-xl font-bold text-white mb-2">{pkg.name}</h4>
              <p className="text-muted text-sm mb-6 pb-6 border-b border-white/10">{pkg.desc}</p>

              <div className="mb-8">
                <span className="text-4xl md:text-5xl font-black text-white">{pkg.price}</span>
                {pkg.price !== "Custom" && <span className="text-muted text-lg tracking-tight ml-1">mo</span>}
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${pkg.popular ? "text-accent" : "text-white/40"}`} />
                    <span className="text-sm text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full font-bold text-sm transition-colors ${pkg.popular
                    ? "bg-primary hover:bg-blue-600 text-white shadow-lg"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
              >
                Request Proposal
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
