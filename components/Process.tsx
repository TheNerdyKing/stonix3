"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: "01",
        title: "Discovery & Audit",
        desc: "We analyze your current funnels, competitors, and pinpoint exactly where you're leaving money on the table."
    },
    {
        num: "02",
        title: "Strategy Architecture",
        desc: "A custom blueprint for your growth. We define exactly which channels and angles will yield the highest ROI."
    },
    {
        num: "03",
        title: "Launch & Iterate",
        desc: "Execution mode. We launch targeted campaigns, ad creatives, and landing pages to start generating tests immediately."
    },
    {
        num: "04",
        title: "Scale & Dominate",
        desc: "We double down on winning creatives and campaigns to scale your revenue exponentially."
    }
];

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                itemsRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
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
        <section id="process" ref={sectionRef} className="py-24 bg-[#0B1220] text-white relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4">The Process</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white">How We Scale You.</h3>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2 z-0 hidden md:block" />

                    <div className="grid gap-12 md:gap-24 relative z-10">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    if (el) itemsRef.current[i] = el;
                                }}
                                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 w-full ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse text-left md:text-right"
                                    }`}
                            >
                                {/* Content Side */}
                                <div className={`md:w-1/2 flex flex-col ${i % 2 === 0 ? "items-start" : "items-start md:items-end"}`}>
                                    <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] w-full max-w-lg hover:border-primary/50 transition-colors">
                                        <span className="text-primary font-black text-6xl tracking-tighter opacity-20 block mb-4">{step.num}</span>
                                        <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
                                        <p className="text-white/60 leading-relaxed text-sm md:text-base">{step.desc}</p>
                                    </div>
                                </div>

                                {/* Timeline Node */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary shadow-[0_0_20px_rgba(37,99,235,0.4)] z-10" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
