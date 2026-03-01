"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Check, Flame } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
  { label: "Setup", completed: true },
  { label: "Launch", completed: true },
  { label: "Optimize", completed: false },
  { label: "Scale", completed: false },
  { label: "Dominate", completed: false },
];

export default function ProgressRing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (ringRef.current) {
        const circumference = 2 * Math.PI * 140;
        gsap.set(ringRef.current, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        });

        gsap.to(ringRef.current, {
          strokeDashoffset: circumference * 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center center",
            scrub: true,
          },
        });
      }

      const dots = timelineRef.current?.querySelectorAll(".timeline-dot");
      dots?.forEach((dot, index) => {
        gsap.fromTo(
          dot,
          { scale: 0.8, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${20 + index * 15}% 70%`,
              end: `${30 + index * 15}% 60%`,
              scrub: true,
            },
          }
        );
      });

      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-dark-bg py-24 flex items-center justify-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div
        ref={cardRef}
        className="relative w-full max-w-2xl mx-4 aspect-square bg-dark-card rounded-[3rem] border border-dark-border flex items-center justify-center overflow-hidden"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
        >
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B347D9" />
              <stop offset="50%" stopColor="#4A90E2" />
              <stop offset="100%" stopColor="#50C8B8" />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="#2A2A2A"
            strokeWidth="4"
          />
          <circle
            ref={ringRef}
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            transform="rotate(-90 200 200)"
          />
        </svg>

        <div className="relative z-10 text-center">
          <div
            ref={timelineRef}
            className="flex items-center justify-center gap-3 mb-8"
          >
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`timeline-dot w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step.completed
                      ? "bg-pastel-purple"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  {step.completed ? (
                    <Check className="w-4 h-4 text-black" />
                  ) : index === 2 ? (
                    <Flame className="w-4 h-4 text-pastel-purple" />
                  ) : null}
                </div>
                {index < timelineSteps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step.completed ? "bg-pastel-purple/50" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-xs mx-auto leading-tight">
            Track performance in real time
          </h2>
        </div>

        <div className="absolute top-10 right-10 w-2 h-2 bg-pastel-purple rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-10 w-1.5 h-1.5 bg-pastel-blue rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/3 left-8 w-1 h-1 bg-pastel-cyan rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
    </section>
  );
}
