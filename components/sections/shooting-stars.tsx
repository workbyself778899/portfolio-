"use client";

import { useEffect, useState } from "react";

type Star = {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
};

export default function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      top: Math.random() * 80,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 1 + Math.random() * 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="shooting-stars-container">
      {stars.map((star) => (
        <span
          key={star.id}
          className="shooting-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}