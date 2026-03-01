"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const marketingMessages = [
  "Increase qualified leads",
  "Improve conversion rate",
  "Track ROI clearly",
  "Scale paid ads profitably",
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showTiles, setShowTiles] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete,
          });
        },
      });

      tl.fromTo(
        iconRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

      tl.add(() => {
        setShowTiles(true);
      }, "+=0.3");

      tl.fromTo(
        ".preloader-tile",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );

      const cycleTl = gsap.timeline({ repeat: 2 });

      cycleTl.to(".preloader-tile", {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      cycleTl.to(".tiles-container", {
        rotation: 25,
        duration: 0.6,
        ease: "power2.inOut",
      });

      cycleTl.to(
        ".preloader-tile",
        {
          x: (i) => [8, -8, 8, -8][i],
          y: (i) => [8, 8, -8, -8][i],
          duration: 0.6,
          ease: "power2.inOut",
        },
        "<"
      );

      cycleTl.to(".tiles-container", {
        rotation: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });

      cycleTl.to(
        ".preloader-tile",
        {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "<"
      );

      cycleTl.add(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % marketingMessages.length);
      }, 0.5);

      tl.add(cycleTl, "+=0.2");
      tl.to({}, { duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pastel-gradient-bg"
    >
      <div
        ref={iconRef}
        className={`absolute transition-opacity duration-300 ${
          showTiles ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-24 h-24 bg-black rounded-[2rem] flex items-center justify-center">
          <span className="text-white text-4xl font-bold">LG</span>
        </div>
      </div>

      <div
        className={`tiles-container relative transition-opacity duration-300 ${
          showTiles ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="preloader-tile w-20 h-20 bg-black rounded-2xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">LG</span>
          </div>
          <div className="preloader-tile w-20 h-20 bg-black rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-pastel-purple"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div className="preloader-tile w-20 h-20 bg-black rounded-2xl flex items-center justify-center p-2">
            <span className="text-white text-[10px] leading-tight text-center font-medium">
              {marketingMessages[currentMessageIndex].split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
          <div className="preloader-tile w-20 h-20 bg-black rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-pastel-cyan"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
