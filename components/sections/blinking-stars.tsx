"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const STAR_COUNT = 90;

type Star = {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
};

function createStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, id) => ({
    id,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  }));
}

export default function BlinkingStars() {
  const { resolvedTheme } = useTheme();
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStars(createStars());
  }, []);

  if (!mounted || resolvedTheme === "light") {
    return null;
  }

  return (
    <div className="blinking-stars-container" aria-hidden>
      {stars.map((star) => (
        <span
          key={star.id}
          className="blinking-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
