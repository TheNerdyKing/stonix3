"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Sparkles } from "lucide-react";

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 });
    }, []);

    return (
        <div ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 pointer-events-auto">
            <nav className="flex items-center justify-between px-6 py-4 bg-[#0B1220]/80 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                        <span className="text-white text-sm font-black tracking-tighter">SX</span>
                    </div>
                    <span className="text-white font-bold tracking-tight hidden sm:block">STONIX</span>
                </div>

                <div className="hidden md:flex items-center gap-6 px-4">
                    {['Services', 'Work', 'Process', 'Pricing'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-white text-xs uppercase tracking-[0.1em] font-medium transition-colors cursor-pointer">
                            {item}
                        </a>
                    ))}
                </div>

                <button className="hidden sm:flex items-center gap-2 px-6 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/30 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.15)] cursor-pointer text-white font-semibold text-sm">
                    <span>Get in Touch</span>
                    <Sparkles className="w-4 h-4 text-accent" />
                </button>
            </nav>
        </div>
    );
}
