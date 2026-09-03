import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OPPOSITES } from "../../data/opposites";
import "./DualWheel.css";

const PAIR_COUNT = OPPOSITES.length;
const SLOT_DEG = 180 / PAIR_COUNT;
const AUTO_MS = 1100;
const AUTO_TRANSITION_MS = 700;
const TURBO_MS = 55;
const TURBO_TRANSITION_MS = 45;
const TURBO_DURATION_MS = 1500;

const DECEL_STEPS = [
  { delay: 70, transition: 60 },
  { delay: 95, transition: 80 },
  { delay: 130, transition: 110 },
  { delay: 180, transition: 150 },
  { delay: 250, transition: 210 },
  { delay: 340, transition: 280 },
  { delay: 460, transition: 380 },
  { delay: 620, transition: 520 },
];

type Phase = "auto" | "turbo" | "decel";

export type WheelSpinState = "idle" | "spinning";

type WheelWord = {
  text: string;
  angle: number;
  pole: "order" | "chaos";
};

type DualWheelProps = {
  onSpinStateChange?: (state: WheelSpinState) => void;
};

export function DualWheel({ onSpinStateChange }: DualWheelProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("auto");
  const [transitionMs, setTransitionMs] = useState(AUTO_TRANSITION_MS);

  const phaseRef = useRef<Phase>("auto");
  const timerRef = useRef<number | undefined>(undefined);
  const decelTimerRef = useRef<number | undefined>(undefined);
  const turboEndRef = useRef<number | undefined>(undefined);

  const words = useMemo<WheelWord[]>(() => {
    const arrowSlot = Math.floor(PAIR_COUNT / 2);
    return OPPOSITES.flatMap(([order, chaos], pairIndex) => {
      const slot = (arrowSlot + pairIndex) % PAIR_COUNT;
      const orderAngle = 180 + slot * SLOT_DEG;
      const chaosAngle = (orderAngle + 180) % 360;
      return [
        { text: order, angle: orderAngle, pole: "order" },
        { text: chaos, angle: chaosAngle, pole: "chaos" },
      ];
    });
  }, []);

  const clearTimers = useCallback(() => {
    window.clearTimeout(timerRef.current);
    window.clearTimeout(decelTimerRef.current);
    window.clearTimeout(turboEndRef.current);
  }, []);

  const tick = useCallback(() => {
    setIndex((prev) => prev + 1);
  }, []);

  const scheduleAutoTick = useCallback(() => {
    timerRef.current = window.setTimeout(() => {
      if (phaseRef.current !== "auto") return;
      tick();
      scheduleAutoTick();
    }, AUTO_MS);
  }, [tick]);

  const scheduleTurboTick = useCallback(() => {
    timerRef.current = window.setTimeout(() => {
      if (phaseRef.current !== "turbo") return;
      tick();
      scheduleTurboTick();
    }, TURBO_MS);
  }, [tick]);

  useEffect(() => {
    scheduleAutoTick();
    return clearTimers;
  }, [scheduleAutoTick, clearTimers]);

  useEffect(() => {
    if (phase === "turbo" || phase === "decel") {
      onSpinStateChange?.("spinning");
      return;
    }
    onSpinStateChange?.("idle");
  }, [phase, onSpinStateChange]);

  const resumeAuto = useCallback(() => {
    phaseRef.current = "auto";
    setPhase("auto");
    setTransitionMs(AUTO_TRANSITION_MS);
    scheduleAutoTick();
  }, [scheduleAutoTick]);

  const runDecelStep = useCallback(
    (step: number) => {
      if (step >= DECEL_STEPS.length) {
        resumeAuto();
        return;
      }

      const { delay, transition } = DECEL_STEPS[step];
      setTransitionMs(transition);

      decelTimerRef.current = window.setTimeout(() => {
        if (phaseRef.current !== "decel") return;
        tick();
        runDecelStep(step + 1);
      }, delay);
    },
    [tick, resumeAuto],
  );

  const handleSpin = () => {
    if (phaseRef.current === "turbo" || phaseRef.current === "decel") return;

    clearTimers();
    phaseRef.current = "turbo";
    setPhase("turbo");
    setTransitionMs(TURBO_TRANSITION_MS);
    tick();
    scheduleTurboTick();

    turboEndRef.current = window.setTimeout(() => {
      if (phaseRef.current !== "turbo") return;
      window.clearTimeout(timerRef.current);
      phaseRef.current = "decel";
      setPhase("decel");
      runDecelStep(0);
    }, TURBO_DURATION_MS);
  };

  const rotation = -index * SLOT_DEG;
  const pairIndex = index % PAIR_COUNT;
  const flipped = Math.floor(index / PAIR_COUNT) % 2 === 1;
  const leftWord = flipped ? OPPOSITES[pairIndex][1] : OPPOSITES[pairIndex][0];
  const rightWord = flipped ? OPPOSITES[pairIndex][0] : OPPOSITES[pairIndex][1];
  const busy = phase === "turbo" || phase === "decel";

  return (
    <div className={`dual-wheel ${busy ? "dual-wheel--storming" : ""}`}>
      <div className="dual-wheel__arrow dual-wheel__arrow--left" aria-hidden="true" />

      <button
        type="button"
        className="dual-wheel__hit"
        onClick={handleSpin}
        aria-label="Spin the dual wheel"
      >
        <span className="sr-only">
          {leftWord} and {rightWord}
        </span>

        <span
          className={`dual-wheel__disk ${phase === "turbo" ? "dual-wheel__disk--turbo" : ""}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionDuration: `${transitionMs}ms`,
          }}
          aria-hidden="true"
        >
          <span className="dual-wheel__wedges" />
          <span className="dual-wheel__hub">
            <span className="dual-wheel__sun" />
            <span className="dual-wheel__moon" />
          </span>
          {words.map((word) => {
            const shown = (word.angle + rotation + 3600) % 360;
            const isActive =
              Math.abs(shown - 90) < 1 || Math.abs(shown - 270) < 1;
            const long = word.text.length > 8;
            return (
              <span
                key={`${word.text}-${word.angle}`}
                className={`dual-wheel__word dual-wheel__word--${word.pole} ${isActive ? "dual-wheel__word--active" : ""}`}
                style={{ transform: `rotate(${word.angle}deg)` }}
              >
                <span
                  className={`dual-wheel__word-label ${long ? "dual-wheel__word-label--long" : ""}`}
                  style={{
                    transform: `rotate(${-word.angle - rotation}deg)`,
                    transitionDuration: `${transitionMs}ms`,
                  }}
                >
                  {word.text}
                </span>
              </span>
            );
          })}
        </span>
      </button>

      <div className="dual-wheel__arrow dual-wheel__arrow--right" aria-hidden="true" />
    </div>
  );
}
