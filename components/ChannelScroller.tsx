"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Target, Palette, Settings, TrendingUp, Zap, MousePointerClick } from "lucide-react";
import { prefersReducedMotion } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    key: "seo",
    title: "SEO & Content",
    desc: "Dominate search results with data-driven SEO strategies and content that ranks and converts.",
    color: "bg-orange-500/10",
    icon: <Search className="w-6 h-6 text-orange-500" />,
    url: "LUMAGROWTH.AI/SEO",
    MockUI: () => (
      <div className="flex-1 flex flex-col gap-4 md:gap-6 p-6 md:p-10 h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Organic Traffic", val: "+148%", icon: TrendingUp },
            { label: "Keywords Ranked", val: "1,204", icon: Search },
            { label: "Domain Rating", val: "78", icon: Target }
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] rounded-2xl p-4 border border-white/5 flex flex-col justify-between">
              <stat.icon className="w-4 h-4 text-orange-500 mb-2 md:mb-4" />
              <div>
                <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.val}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white/[0.03] rounded-3xl border border-white/5 p-6 flex flex-col items-end justify-end gap-2 relative overflow-hidden min-h-[150px]">
          <div className="text-[10px] text-white/40 uppercase tracking-widest absolute top-6 left-6">Traffic Growth</div>
          <svg className="absolute inset-0 w-full h-[80%] bottom-0 mt-auto" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,100 L0,80 Q20,90 40,60 T80,30 L100,10 L100,100 Z" fill="rgba(249,115,22,0.1)" />
            <path d="M0,80 Q20,90 40,60 T80,30 L100,10" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    )
  },
  {
    key: "ads",
    title: "Paid Ads",
    desc: "Launch campaigns that stay profitable with tight tracking, testing, and creative iteration.",
    color: "bg-orange-600/10",
    icon: <Target className="w-6 h-6 text-orange-600" />,
    url: "LUMAGROWTH.AI/ADS",
    MockUI: () => (
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-10 h-full">
        <div className="flex flex-col gap-4">
          <div className="bg-white/[0.03] rounded-3xl p-6 flex-1 border border-white/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px] -mr-10 -mt-10" />
            <div className="text-[10px] text-white/40 uppercase tracking-widest">Active ROAS</div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">4.8x</div>
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded-md text-green-500 text-xs font-bold">
                <TrendingUp className="w-3 h-3" /> +24% M/M
              </div>
            </div>
          </div>
          <div className="bg-orange-500/10 rounded-2xl h-14 md:h-16 border border-orange-500/20 flex items-center justify-between px-6">
            <span className="text-orange-500 font-bold text-sm">Target CPA</span>
            <span className="text-white font-mono text-lg">$42.50</span>
          </div>
        </div>
        <div className="bg-[#141414] rounded-3xl border border-white/5 p-6 flex flex-col align-bottom justify-end relative overflow-hidden h-40 md:h-auto">
          <div className="absolute top-6 left-6 text-[10px] text-white/40 uppercase tracking-widest">Campaign Mix</div>
          <div className="flex items-end gap-2 w-full h-[60%] opacity-80 mt-auto">
            <div className="flex-1 bg-white/10 rounded-t-sm h-[30%]" />
            <div className="flex-1 bg-orange-500/40 rounded-t-sm h-[60%]" />
            <div className="flex-1 bg-orange-500 rounded-t-sm h-[90%]" />
            <div className="flex-1 bg-white/5 rounded-t-sm h-[40%]" />
          </div>
        </div>
      </div>
    )
  },
  {
    key: "brand",
    title: "Creative & Branding",
    desc: "Make the offer look irresistible with creative that earns attention and improves conversion.",
    color: "bg-orange-400/10",
    icon: <Palette className="w-6 h-6 text-orange-400" />,
    url: "LUMAGROWTH.AI/BRAND",
    MockUI: () => (
      <div className="flex-1 flex flex-col p-6 md:p-10 gap-6 h-full">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/20 flex items-center justify-center border border-white/20">
            <Palette className="w-6 h-6 text-black" />
          </div>
          <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex flex-col justify-center gap-2">
            <div className="h-2 w-1/3 bg-white/10 rounded-full" />
            <div className="h-2 w-full bg-white/5 rounded-full" />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-4 min-h-[120px]">
          <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 h-2 w-1/2 bg-white/20 rounded-full" />
          </div>
          <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 h-2 w-2/3 bg-white/20 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
          </div>
          <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 h-2 w-1/3 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    )
  },
  {
    key: "crm",
    title: "Automation & CRM",
    desc: "Capture, score, and follow up automatically so leads don’t leak while you sleep.",
    color: "bg-orange-700/10",
    icon: <Settings className="w-6 h-6 text-orange-700" />,
    url: "LUMAGROWTH.AI/CRM",
    MockUI: () => (
      <div className="flex-1 flex flex-col p-6 md:p-10 h-full relative overflow-hidden">
        <div className="absolute right-0 top-1/4 w-px h-1/2 bg-orange-500/20" />
        <div className="absolute left-6 md:left-10 top-1/4 w-px h-1/2 bg-white/10" />

        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-6 px-2">Workflow Builder</div>
        <div className="flex-1 flex flex-col justify-between relative pl-8 min-h-[200px]">
          <div className="relative">
            <div className="absolute -left-[38px] md:-left-10 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/10 border-2 border-[#0F0F0F]" />
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 w-[85%] md:w-2/3 ml-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <div className="h-2 w-16 md:w-20 bg-white/20 rounded-full mb-1" />
                <div className="h-1.5 w-12 bg-white/10 rounded-full" />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[45px] top-1/2 -translate-y-1/2 w-[25px] h-px bg-orange-500/30" />
            <div className="absolute -left-[38px] md:-left-10 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-500 border-2 border-[#0F0F0F] shadow-[0_0_10px_rgba(249,115,22,0.4)]" />
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 w-[95%] md:w-[80%] ml-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <Settings className="w-4 h-4 text-black" />
              </div>
              <div>
                <div className="h-2 w-20 md:w-24 bg-orange-500 rounded-full mb-1" />
                <div className="h-1.5 w-16 bg-orange-500/50 rounded-full" />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[38px] md:-left-10 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/10 border-2 border-[#0F0F0F]" />
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 w-[70%] md:w-1/2 ml-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <MousePointerClick className="w-4 h-4 text-white/40" />
              </div>
              <div className="h-2 w-16 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    )
  },
];

export default function ChannelScroller() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // DESKTOP: Native overlapping sticky cards, NO pinning traps
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");

        cards.forEach((card, index) => {
          // Detect when the card is near the center to change the active left-side text
          ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => {
              if (self.isActive) setActiveIndex(index);
            }
          });
        });
      });

      // MOBILE: Simple sequential fade up scrolling
      mm.add("(max-width: 767px)", () => {
        const mobileCards = gsap.utils.toArray<HTMLElement>(".mobile-channel-card");
        mobileCards.forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050505] pt-24 pb-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full relative">
        <div className="mb-12">
          <p className="text-orange-500 font-bold uppercase tracking-[0.25em] text-xs mb-4">
            Strategy First
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
            Choose your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              channel.
            </span>
          </h2>
        </div>

        {/* --- DESKTOP VIEW: STICKY NATURAL SCROLL --- */}
        <div className="hidden md:flex items-start gap-12 relative w-full">

          {/* LEFT SIDE: Sticky Native Text */}
          <div className="w-5/12 sticky top-32 h-[60vh] flex flex-col justify-center">
            {/* The Icons */}
            <div className="relative mb-12 flex gap-4">
              {/* Highlight Bubble */}
              <div
                className="pointer-events-none absolute left-0 top-0 h-14 w-14 rounded-full bg-orange-500/20 border border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-transform duration-500 ease-out"
                style={{ transform: `translateX(${activeIndex * 72}px)` }} // 56px width + 16px gap = 72px offset
              />
              {PANELS.map((p, i) => (
                <div
                  key={p.key}
                  className={`relative z-10 grid h-14 w-14 flex-shrink-0 place-items-center rounded-full border border-white/10 transition-all duration-500 ${activeIndex === i ? 'opacity-100 scale-100' : 'opacity-40 scale-90'}`}
                >
                  {p.icon}
                </div>
              ))}
            </div>

            {/* The Text Bodies */}
            <div className="relative h-48 w-full">
              {PANELS.map((p, i) => (
                <div
                  key={p.key}
                  className={`absolute inset-0 max-w-sm transition-all duration-500 ease-out ${activeIndex === i
                    ? 'opacity-100 visible translate-y-0'
                    : activeIndex < i
                      ? 'opacity-0 invisible translate-y-8'
                      : 'opacity-0 invisible -translate-y-8'
                    }`}
                >
                  <h3 className="text-5xl font-bold tracking-tight text-white mb-6">
                    {p.title}
                  </h3>
                  <p className="text-xl font-light leading-relaxed text-white/40">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Stacking Scroll Cards */}
          <div className="w-7/12 flex flex-col pb-[20vh] perspective-2000">
            {PANELS.map((p, index) => (
              <div
                key={p.key}
                data-card
                className="sticky w-full origin-top mb-[15vh] last:mb-0 transition-all"
                style={{ top: `calc(15vh + ${index * 40}px)` }} // Creates the physical cascading offset effect natively
              >
                <div className="inner-card relative h-[500px] overflow-hidden rounded-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.6)] border border-white/10 bg-[#0F0F0F] flex flex-col will-change-transform">
                  {/* Glowing Aura inside card */}
                  <div
                    className="absolute -inset-16 blur-4xl opacity-30 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 20%, #F29A3D33, transparent 55%), radial-gradient(circle at 70% 80%, #E86B2E44, transparent 60%)",
                    }}
                  />

                  {/* Browser Control Bar */}
                  <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-md">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-white/10" />
                      <div className="h-3 w-3 rounded-full bg-white/10" />
                      <div className="h-3 w-3 rounded-full bg-white/10" />
                    </div>
                    <div className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] text-white/20 font-mono flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {p.url}
                    </div>
                    <div className="w-10" />
                  </div>

                  <div className="relative z-10 flex-1">
                    <p.MockUI />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* --- MOBILE VIEW (Normal Vertical Scrolling Stack) --- */}
        <div className="md:hidden flex flex-col gap-16 mt-8">
          {PANELS.map((p) => (
            <div key={`mobile-${p.key}`} className="mobile-channel-card flex flex-col gap-6">
              {/* Mobile Header */}
              <div>
                <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                  {p.icon}
                </div>
                <h3 className="text-4xl font-bold tracking-tight text-white mb-4">{p.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed">{p.desc}</p>
              </div>

              {/* Mobile Mock App Container */}
              <div className="relative w-full h-[450px] overflow-hidden rounded-[32px] shadow-2xl border border-white/5 bg-[#0F0F0F] flex flex-col">
                <div
                  className="absolute -inset-16 blur-3xl opacity-20 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, #F29A3D33, transparent 55%), radial-gradient(circle at 70% 80%, #E86B2E44, transparent 60%)",
                  }}
                />
                <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="bg-white/5 px-3 py-1 rounded-full text-[9px] text-white/20 font-mono flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                    {p.url}
                  </div>
                </div>
                <div className="relative z-10 flex-1 overflow-hidden">
                  <p.MockUI />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
