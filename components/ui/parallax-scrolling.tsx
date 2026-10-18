"use client";

import { createContext, useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollContext = createContext<RefObject<Lenis | null> | null>(null);

type ParallaxScrollProps = {
  children: React.ReactNode;
};

export function ParallaxScroll({ children }: ParallaxScrollProps) {
  const scope = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!scope.current || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-parallax-speed]");
      layers.forEach((layer) => {
        const speed = Number(layer.dataset.parallaxSpeed ?? 0);
        gsap.to(layer, {
          yPercent: speed * 10,
          ease: "none",
          scrollTrigger: {
            trigger: layer.closest("section") ?? layer,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.35,
          },
        });
      });
    }, scope);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const elem = document.querySelector(href);
        if (elem) {
          e.preventDefault();
          const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 60;
          lenis.scrollTo(elem as HTMLElement, { offset: -(headerHeight + 16), duration: 1.2 });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
      context.revert();
    };
  }, []);

  return <SmoothScrollContext.Provider value={lenisRef}><div ref={scope}>{children}</div></SmoothScrollContext.Provider>;
}
