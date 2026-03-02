"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { ArrowRight, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                containerRef.current,
                { scale: 0.95, opacity: 0, y: 50 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
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
        <section id="contact" ref={sectionRef} className="py-24 bg-[#0B1220] text-white relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

            <div ref={containerRef} className="max-w-4xl w-full mx-6 p-8 md:p-16 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl relative z-10 flex flex-col md:flex-row gap-12 items-center">

                {/* Left Side: Copy & Calendar */}
                <div className="md:w-1/2 flex flex-col items-start">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                        Ready to scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">revenue</span>?
                    </h2>
                    <p className="text-white/60 mb-8 leading-relaxed">
                        Stop guessing. Book a free 30-minute discovery call where we audit your current setup and provide a custom growth roadmap.
                    </p>

                    <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] w-full sm:w-auto mt-auto">
                        <Calendar className="w-5 h-5" />
                        <span>Book A Free Call</span>
                    </button>
                </div>

                {/* Right Side: Simple Form */}
                <div className="md:w-1/2 w-full">
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-semibold pl-4">Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-semibold pl-4">Email</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-semibold pl-4">Monthly Ad Spend</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white/80 focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer">
                                <option value="none" className="bg-[#0B1220]">$0 - $10k</option>
                                <option value="10k" className="bg-[#0B1220]">$10k - $50k</option>
                                <option value="50k" className="bg-[#0B1220]">$50k+</option>
                            </select>
                        </div>

                        <button type="submit" className="mt-4 flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full font-bold transition-colors shadow-none w-full group">
                            <span>Submit Details</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}
