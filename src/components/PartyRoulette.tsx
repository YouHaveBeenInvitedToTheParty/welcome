import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PARTY_WORDS } from "../data/partyWords";
import "./PartyRoulette.css";

const ITEM_HEIGHT = 80;
const AUTO_MS = 650;
const AUTO_TRANSITION_MS = 180;
const TURBO_MS = 48;
const TURBO_TRANSITION_MS = 40;
const TURBO_DURATION_MS = 1600;

const DECEL_STEPS = [
  { delay: 65, transition: 55 },
  { delay: 85, transition: 75 },
  { delay: 110, transition: 95 },
  { delay: 145, transition: 120 },
  { delay: 190, transition: 155 },
  { delay: 250, transition: 200 },
  { delay: 330, transition: 260 },
  { delay: 430, transition: 340 },
  { delay: 560, transition: 450 },
  { delay: 720, transition: 580 },
];

type Phase = "auto" | "turbo" | "decel" | "stopped";

type LeverButtonProps = {
  variant: "desktop" | "mobile";
  pulled: boolean;
  disabled: boolean;
  onPull: () => void;
};

function LeverButton({ variant, pulled, disabled, onPull }: LeverButtonProps) {
  return (
    <button
      type="button"
      className={`slot-lever slot-lever--${variant} ${pulled ? "slot-lever--pulled" : ""} ${disabled ? "slot-lever--disabled" : ""}`}
      onClick={onPull}
      disabled={disabled}
      aria-label="Pull the lever to stop the wheel"
    >
      <span className="slot-lever__base" aria-hidden="true" />
      <span className="slot-lever__arm" aria-hidden="true">
        <span className="slot-lever__shaft" />
        <span className="slot-lever__knob" />
      </span>
    </button>
  );
}

export function PartyRoulette() {
  const [index, setIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);
  const [noTransition, setNoTransition] = useState(false);
  const [phase, setPhase] = useState<Phase>("auto");
  const [transitionMs, setTransitionMs] = useState(AUTO_TRANSITION_MS);
  const [leverPulled, setLeverPulled] = useState(false);

  const phaseRef = useRef<Phase>("auto");
  const decelStepRef = useRef(0);
  const timerRef = useRef<number | undefined>(undefined);
  const decelTimerRef = useRef<number | undefined>(undefined);

  const words = useMemo(() => [...PARTY_WORDS, ...PARTY_WORDS], []);

  const clearTimers = useCallback(() => {
    window.clearTimeout(timerRef.current);
    window.clearTimeout(decelTimerRef.current);
  }, []);

  const resetLoop = useCallback(() => {
    setNoTransition(true);
    setIndex(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setNoTransition(false));
    });
  }, []);

  const tick = useCallback(() => {
    setIsSpinning(true);
    setIndex((prev) => {
      const next = prev + 1;
      if (next === PARTY_WORDS.length) {
        window.setTimeout(resetLoop, phaseRef.current === "auto" ? AUTO_TRANSITION_MS : TURBO_TRANSITION_MS);
      }
      return next;
    });
  }, [resetLoop]);

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
    if (!isSpinning) return;
    const timeout = window.setTimeout(() => setIsSpinning(false), transitionMs);
    return () => window.clearTimeout(timeout);
  }, [index, isSpinning, transitionMs]);

  const runDecelStep = useCallback(
    (step: number) => {
      if (step >= DECEL_STEPS.length) {
        phaseRef.current = "stopped";
        setPhase("stopped");
        setIsSpinning(false);
        return;
      }

      const { delay, transition } = DECEL_STEPS[step];
      setTransitionMs(transition);
      decelStepRef.current = step;

      decelTimerRef.current = window.setTimeout(() => {
        if (phaseRef.current !== "decel") return;
        tick();
        runDecelStep(step + 1);
      }, delay);
    },
    [tick],
  );

  const handleLeverPull = () => {
    if (phaseRef.current !== "auto") return;

    setLeverPulled(true);
    window.setTimeout(() => setLeverPulled(false), 450);

    clearTimers();
    phaseRef.current = "turbo";
    setPhase("turbo");
    setTransitionMs(TURBO_TRANSITION_MS);
    setIsSpinning(true);
    tick();

    scheduleTurboTick();

    window.setTimeout(() => {
      if (phaseRef.current !== "turbo") return;
      clearTimers();
      phaseRef.current = "decel";
      setPhase("decel");
      runDecelStep(0);
    }, TURBO_DURATION_MS);
  };

  const offset = index * ITEM_HEIGHT;
  const currentWord = PARTY_WORDS[index % PARTY_WORDS.length];
  const leverDisabled = phase !== "auto";

  return (
    <h1 className="roulette-title">
      <span className="title-line">Is this a</span>

      <span className={`slot-row ${phase === "stopped" ? "slot-row--locked" : ""}`}>
        <span className="slot-wrapper">
          <span className="slot-frame" aria-hidden="true">
            <span className="slot-shine" />
            <span className="slot-glow" />
          </span>

          <span
            className="slot-window"
            style={{ height: ITEM_HEIGHT }}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="sr-only">{currentWord} party</span>

            <span
              className={`slot-reel ${isSpinning ? "slot-reel--spinning" : ""} ${noTransition ? "slot-reel--instant" : ""} ${phase === "turbo" ? "slot-reel--turbo" : ""} ${phase === "stopped" ? "slot-reel--locked" : ""}`}
              style={{
                transform: `translateY(-${offset}px)`,
                transitionDuration: `${transitionMs}ms`,
              }}
              aria-hidden="true"
            >
              {words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="slot-word"
                  style={{ height: ITEM_HEIGHT }}
                >
                  {word}
                </span>
              ))}
            </span>
          </span>
        </span>

        <LeverButton
          variant="desktop"
          pulled={leverPulled}
          disabled={leverDisabled}
          onPull={handleLeverPull}
        />
      </span>

      <span className="title-party">
        <span className="party-text">PARTY</span>
        <span className="party-qmark-row">
          <span className="party-qmark">?</span>
          <LeverButton
            variant="mobile"
            pulled={leverPulled}
            disabled={leverDisabled}
            onPull={handleLeverPull}
          />
        </span>
      </span>
    </h1>
  );
}
