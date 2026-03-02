"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "How soon can I expect to see results?",
        answer: "Our initial campaigns usually launch within 14 days, and you can expect early traction in the first 30 days. Scalable ROI typically stabilizes by month three.",
    },
    {
        question: "Do you handle the creative and ad copy?",
        answer: "Yes. Our in-house creative team designs all the assets, videos, and writes the high-converting copy required for the advertising campaigns.",
    },
    {
        question: "Do you guarantee ROAS (Return On Ad Spend)?",
        answer: "No reputable agency can guarantee specific ROAS due to external market factors. We do, however, guarantee a relentless testing framework and complete data transparency.",
    },
    {
        question: "Who will manage my account?",
        answer: "You will be assigned a Senior Media Buyer and a Dedicated Account Manager who will be your primary point of contact via Slack.",
    },
    {
        question: "What is the onboarding process like?",
        answer: "After you sign, we have a 60-minute kickoff call. From there, we begin our Discovery & Audit phase. We handle all tracking setup and asset collection.",
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                itemsRef.current,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
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
        <section id="faq" ref={sectionRef} className="py-24 bg-surface text-foreground relative">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Questions</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-black">Frequently Asked.</h3>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                if (el) itemsRef.current[i] = el;
                            }}
                            className="border border-black/10 rounded-2xl bg-white overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                            >
                                <span className="font-bold text-lg text-black">{faq.question}</span>
                                <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
                            </button>

                            <div
                                className="overflow-hidden transition-all duration-300 ease-in-out"
                                style={{ maxHeight: openIndex === i ? "500px" : "0", opacity: openIndex === i ? 1 : 0 }}
                            >
                                <div className="p-6 pt-0 text-muted leading-relaxed pb-6">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
