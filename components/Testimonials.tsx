"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Alex M.",
    role: "E-Com Founder",
    text: "STONIX completely transformed our customer acquisition. Before them, our ROAS was unstable. Now, we're doubling down on ad spend.",
  },
  {
    name: "Sarah K.",
    role: "CEO, TechFlow",
    text: "The first agency we've worked with that actually cares about bottom-line revenue, not just vanity metrics. Highly recommended.",
  },
  {
    name: "David L.",
    role: "Director, Local Reach",
    text: "Our calendar is completely booked. The local SEO campaigns started working faster than we expected. They know what they're doing.",
  },
  {
    name: "Emma D.",
    role: "VP Marketing, GrowthStack",
    text: "Their creative team is phenomenal. They took our drab messaging and turned it into high-converting video ads.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { y: 30, opacity: 0 },
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
    <section id="testimonials" ref={sectionRef} className="py-24 bg-surface text-foreground relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Client Feedback</h2>
          <h3 className="text-4xl md:text-5xl font-black text-black">Don't Take Our Word For It.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="p-8 bg-white border border-black/5 rounded-[2rem] shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex text-amber-400 mb-6 gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-muted text-sm leading-relaxed mb-8 italic">"{review.text}"</p>
              
              <div>
                <h4 className="font-bold text-black">{review.name}</h4>
                <p className="text-xs text-muted font-medium">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
