"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Search, Target, Palette, Settings } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const channels = [
  {
    id: "seo",
    title: "SEO & Content",
    description:
      "Dominate search results with data-driven SEO strategies and compelling content that ranks and converts.",
    icon: Search,
    color: "bg-pastel-green",
    highlightColor: "bg-pastel-green/30",
  },
  {
    id: "paid",
    title: "Paid Ads",
    description:
      "Scale profitably with Meta, Google, and TikTok ads optimized for your target ROAS and growth goals.",
    icon: Target,
    color: "bg-pastel-cyan",
    highlightColor: "bg-pastel-cyan/30",
  },
  {
    id: "creative",
    title: "Creative & Branding",
    description:
      "Stand out with scroll-stopping creative, brand identity, and conversion-focused design systems.",
    icon: Palette,
    color: "bg-pastel-yellow",
    highlightColor: "bg-pastel-yellow/30",
  },
  {
    id: "automation",
    title: "Automation & CRM",
    description:
      "Nurture leads and retain customers with automated workflows and personalized email sequences.",
    icon: Settings,
    color: "bg-pastel-pink",
    highlightColor: "bg-pastel-pink/30",
  },
];

export default function ChannelScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current?.querySelectorAll(".channel-card");
      if (!cards) return;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.floor(self.progress * channels.length),
              channels.length - 1
            );
            setActiveIndex(newIndex);
          },
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, { y: 0, rotation: 0, opacity: 1 });
        } else {
          gsap.set(card, { y: "100%", rotation: 8, opacity: 0.5 });
        }

        if (index < cards.length - 1) {
          scrollTl.to(
            card,
            {
              y: "-100%",
              rotation: -8,
              opacity: 0.3,
              ease: "power2.inOut",
            },
            index * (1 / channels.length)
          );

          scrollTl.to(
            cards[index + 1],
            {
              y: "0%",
              rotation: 0,
              opacity: 1,
              ease: "power2.inOut",
            },
            index * (1 / channels.length)
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white overflow-hidden"
    >
      <div className="h-screen flex">
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-4 mb-8">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.id}
                  className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                    activeIndex === index
                      ? `${channel.highlightColor} scale-110`
                      : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                      activeIndex === index ? "text-black" : "text-gray-400"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          <div className="relative h-48">
            {channels.map((channel, index) => (
              <div
                key={channel.id}
                className={`absolute inset-0 transition-all duration-500 ${
                  activeIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-30 translate-y-4"
                }`}
              >
                <h3 className="text-3xl md:text-5xl font-bold text-black mb-4">
                  {channel.title}
                </h3>
                <p className="text-gray-600 text-lg max-w-md">
                  {channel.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-1/2 h-full relative overflow-hidden">
          <div
            ref={cardsContainerRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            {channels.map((channel, index) => (
              <div
                key={channel.id}
                className={`channel-card absolute w-[80%] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl gpu-accelerate ${channel.color}`}
                style={{
                  zIndex: channels.length - index,
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-black/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <channel.icon className="w-10 h-10 text-black/60" />
                    </div>
                    <p className="text-black/60 text-lg font-medium">
                      {channel.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
