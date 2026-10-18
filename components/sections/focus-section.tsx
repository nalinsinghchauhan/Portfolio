"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";
import { ParallaxText } from "@/components/ui/parallax-text-scroll";

const focusRows = [
  ["01", "SOFTWARE DEVELOPMENT", -1.1],
  ["02", "CLOUD INFRASTRUCTURE", 0.9],
  ["03", "RAG / LLM APPLICATIONS", -0.75],
  ["04", "NLP RESEARCH", 0.65],
] as const;

export function FocusSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const labelY = useTransform(scrollYProgress, [0, 0.45], [28, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section id="focus" ref={sectionRef} className="position-section focus-section" aria-labelledby="focus-title">
      <div className="shell position-inner">
        <motion.div className="position-meta" style={mounted && !reducedMotion ? { y: labelY, opacity: labelOpacity } : undefined}>
          <span className="section-index" id="focus-title">02 <i>/</i> focus</span>
          <span className="position-context">ENGINEERING / AI / CLOUD</span>

        </motion.div>
        <div className="position-rule" />
        <div className="position-intro">
          <p>Areas of practice</p>
        </div>
        <div className="position-rows">
          {focusRows.map(([number, label, velocity]) => (
            <div className="position-row" key={label}>
              <span className="position-row-number">{number}</span>
              <ParallaxText baseVelocity={velocity}>{label}</ParallaxText>
            </div>
          ))}
        </div>
        <div className="position-footer">
          <span>FOCUS / 02</span>
          <span>AI x SYSTEMS x CLOUD</span>
          <span>2026</span>
        </div>
      </div>
    </section>
  );
}

// Backward-compatibility export
export { FocusSection as PositionSection };
