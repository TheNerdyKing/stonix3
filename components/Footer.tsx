"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Twitter, Instagram, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  services: [
    { label: "Paid Ads", href: "#" },
    { label: "SEO & Content", href: "#" },
    { label: "Creative", href: "#" },
    { label: "Automation", href: "#" },
  ],
  company: [
    { label: "Case Studies", href: "#" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pillRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#050505] pt-16 pb-8 px-4 md:px-8 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={pillRef}
          className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02] rounded-3xl md:rounded-full px-8 py-6 border border-white/5 mb-24"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <span className="text-black font-bold">LG</span>
            </div>
            <span className="text-white text-xl font-bold italic tracking-tight">Scale your brand today.</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-8 py-4 bg-orange-500 text-black rounded-full font-bold hover:bg-orange-400 transition-all text-sm">
              Talk to an Expert
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 bg-[#080808] p-10 rounded-[3rem] border border-white/[0.03]">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-black text-sm font-bold">LG</span>
              </div>
              <span className="text-white font-bold tracking-tight">LumaGrowth</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-[200px]">
              Next-gen performance marketing that scales brands profitably.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/30 text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/30 text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 mb-8">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/30 text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-all text-white/40">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-all text-white/40">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-all text-white/40">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">
            ©2025 LumaGrowth. Built for the bold.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">Systems Operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
