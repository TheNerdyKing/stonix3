"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Search, Megaphone, PenTool, RefreshCw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "SEO Optimization",
        description: "Dominate search engine rankings with data-driven organic strategies that bring high-intent traffic.",
        icon: Search,
        color: "from-primary/20 to-primary/5",
    },
    {
        title: "Performance Ads",
        description: "Scalable ROI across Meta, Google, and TikTok. We engineer campaigns that convert clicks into clients.",
        icon: Megaphone,
        color: "from-accent/20 to-accent/5",
    },
    {
        title: "Creative Factory",
        description: "Scroll-stopping visuals and copywriting that captures attention and drives emotional engagement.",
        icon: PenTool,
        color: "from-primary/20 to-accent/20",
    },
    {
        title: "CRO & Automation",
        description: "Turn traffic into sales faster. Optimizing every touchpoint to maximize your conversion rate.",
        icon: RefreshCw,
        color: "from-[#F6F7FB]/10 to-[rgba(11,18,32,0)]",
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardsRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={sectionRef} className="py-24 bg-background text-surface relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4">Our Services</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white">Full-Stack Growth Ecosystem.</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                if (el) cardsRef.current[i] = el;
                            }}
                            className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-2 shadow-lg"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.color} border border-white/10`}>
                                <service.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                            <p className="text-muted leading-relaxed text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
