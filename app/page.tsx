"use client";

import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);

    // Refresh ScrollTrigger after content renders
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  };

  return (
    <main className="relative bg-surface text-foreground font-sans min-h-screen">
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <Navbar />
        <Hero />
        <Services />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
