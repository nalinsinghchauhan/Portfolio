"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

type ParallaxTextProps = {
  children: React.ReactNode;
  baseVelocity?: number;
};

const wrap = (min: number, max: number, value: number): number => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export function ParallaxText({ children, baseVelocity = 1 }: ParallaxTextProps) {
  const baseX = useMotionValue(-0.01);
  const baseDirection = baseVelocity >= 0 ? 1 : -1;
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 40,
    stiffness: 260,
    mass: 0.2,
  });
  const velocityBoost = useTransform(smoothVelocity, [-1400, 0, 1400], [-0.3, 0, 0.3]);
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);
  const reducedMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reducedMotion) {
      return;
    }

    const velocity = velocityBoost.get();
    const scrollDirection = Math.sign(velocity);
    const scrollAdjustment = scrollDirection * baseDirection * Math.min(Math.abs(velocity), 0.3);
    baseX.set(baseX.get() + (baseVelocity + scrollAdjustment) * (delta / 1000));
  });

  return (
    <div className="parallax-text-viewport">
      <span className="sr-only">{children}</span>
      <motion.div className="parallax-text-track" style={{ x }} aria-hidden="true">
        {[0, 1, 2, 3].map((copy) => (
          <span className="parallax-text-copy" key={copy}>{children}</span>
        ))}
      </motion.div>
    </div>
  );
}
