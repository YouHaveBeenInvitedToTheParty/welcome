import { useMemo } from "react";
import "./Sparkles.css";

const SPARKLE_COUNT = 42;

type Sparkle = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  hue: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function Sparkles() {
  const sparkles = useMemo<Sparkle[]>(
    () =>
      Array.from({ length: SPARKLE_COUNT }, (_, id) => ({
        id,
        left: `${randomBetween(2, 98)}%`,
        top: `${randomBetween(2, 98)}%`,
        size: randomBetween(2, 5),
        delay: randomBetween(0, 6),
        duration: randomBetween(2.5, 6),
        hue: randomBetween(280, 340),
      })),
    [],
  );

  return (
    <div className="sparkles" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            background: `hsl(${sparkle.hue} 100% 75%)`,
            boxShadow: `0 0 ${sparkle.size * 3}px hsl(${sparkle.hue} 100% 70%)`,
          }}
        />
      ))}
    </div>
  );
}
