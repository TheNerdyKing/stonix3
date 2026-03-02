"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Mail, Phone, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  services: [
    { label: "SEO Optimization", href: "#services" },
    { label: "Meta Ads Management", href: "#services" },
    { label: "Google Ads Management", href: "#services" },
    { label: "Full-Stack Growth", href: "#services" },
  ],
  company: [
    { label: "Case Studies", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact Us", href: "#contact" },
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
      className="relative bg-[#0B1220] pt-16 pb-8 px-4 md:px-8 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={pillRef}
          className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02] rounded-3xl md:rounded-full px-8 py-6 border border-white/5 mb-24"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <span className="text-white font-bold text-lg">SX</span>
            </div>
            <span className="text-white text-xl font-bold tracking-tight">Your time to scale.</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => window.open('https://wa.me/972552664456', '_blank')} className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-blue-600 transition-all text-sm cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
              Free Growth Audit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 bg-white/[0.01] p-10 rounded-[3rem] border border-white/[0.03]">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">SX</span>
              </div>
              <span className="text-white font-bold tracking-tight">STONIX</span>
            </div>
            <div className="text-white/40 text-sm leading-relaxed max-w-[200px] flex flex-col gap-2">
              <p>236 HaHistadrut Blvd, Haifa</p>
              <p>055-2664456</p>
              <p>a.s.mediagroup2023@gmail.com</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/30 text-sm hover:text-primary transition-colors"
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
                    className="text-white/30 text-sm hover:text-primary transition-colors"
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
                    className="text-white/30 text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a href="mailto:a.s.mediagroup2023@gmail.com" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-white/40">
                <Mail className="w-4 h-4" />
              </a>
              <a href="tel:0552664456" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-white/40">
                <Phone className="w-4 h-4" />
              </a>
              <a href="https://wa.me/972552664456" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-white/40">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">
            ©2026 STONIX. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">Secure Systems</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
