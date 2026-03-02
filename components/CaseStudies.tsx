"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { TrendingUp, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const studies = [
    {
        client: "E - Commerce Brand",
        metricValue: "+354%",
        metricLabel: "ROAS Increase",
        description: "Scaled Facebook Ads while reducing CPA by 40% in 60 days.",
        color: "group-hover:text-primary",
    },
    {
        client: "B2B SaaS Startup",
        metricValue: "$1.2M",
        metricLabel: "New Pipeline",
        description: "Generated qualified enterprise leads through LinkedIn & Cold Email.",
        color: "group-hover:text-accent",
    },
    {
        client: "Local Service Biz",
        metricValue: "4x",
        metricLabel: "More Inquiries",
        description: "Dominated local SEO rankings leading to record monthly revenue.",
        color: "group-hover:text-primary",
    },
];

export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                itemsRef.current,
                { scale: 0.95, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={sectionRef} className="py-24 bg-surface text-foreground relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Case Studies</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-black">Numbers Speak Louder.</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {studies.map((study, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                if (el) itemsRef.current[i] = el;
                            }}
                            className="group relative bg-white p-8 rounded-[2rem] border border-black/5 shadow-xl hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <span className="text-sm font-semibold text-muted bg-[#F6F7FB] px-3 py-1 rounded-full">{study.client}</span>
                                <ArrowUpRight className="w-5 h-5 text-muted transition-colors group-hover:text-black" />
                            </div>

                            <div className={`text-6xl font-black tracking-tighter mb-2 transition-colors duration-300 ${study.color} text-black`}>
                                {study.metricValue}
                            </div>
                            <p className="text-lg font-bold text-black mb-4">{study.metricLabel}</p>
                            <p className="text-muted text-sm">{study.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
