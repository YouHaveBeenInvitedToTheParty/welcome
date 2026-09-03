import { useCallback, useEffect, useRef, useState } from "react";
import { DualText } from "../components/halloween/DualText";
import { DualWheel, type WheelSpinState } from "../components/halloween/DualWheel";
import { HalloweenConcept } from "../components/halloween/HalloweenConcept";
import { HalloweenDetails } from "../components/halloween/HalloweenDetails";
import { HalloweenRsvp } from "../components/halloween/HalloweenRsvp";
import { SectionLink } from "../components/halloween/SectionLink";
import "../components/halloween/Halloween.css";

function Lightning() {
  return (
    <div className="hw-lightning" aria-hidden="true">
      <span className="hw-lightning__flash" />
      <svg className="hw-lightning__bolts" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M52 0 L46 22 L58 24 L40 58 L54 52 L38 100" />
        <path d="M48 8 L60 18 L50 28 L63 40 L44 72" />
      </svg>
    </div>
  );
}

export function HalloweenPage() {
  const [spinState, setSpinState] = useState<WheelSpinState>("idle");
  const [inverted, setInverted] = useState(false);
  const [haunting, setHaunting] = useState(false);
  const hauntTimers = useRef<number[]>([]);
  const hasSpun = useRef(false);

  const handleSpinStateChange = useCallback((state: WheelSpinState) => {
    setSpinState(state);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Order / Chaos, Halloween";
    document.body.dataset.page = "halloween";
    return () => {
      document.title = previousTitle;
      delete document.body.dataset.page;
    };
  }, []);

  useEffect(() => {
    if (spinState !== "spinning") return;

    hasSpun.current = true;
    setHaunting(false);
    setInverted(true);
    const id = window.setInterval(() => {
      setInverted((value) => !value);
    }, 65);

    return () => window.clearInterval(id);
  }, [spinState]);

  useEffect(() => {
    if (spinState === "spinning") return;
    if (!hasSpun.current) return;

    setInverted(false);
    setHaunting(false);

    const clearHaunt = () => {
      hauntTimers.current.forEach((id) => window.clearTimeout(id));
      hauntTimers.current = [];
    };

    const scheduleHaunt = () => {
      const wait = 48000 + Math.random() * 22000;
      const waitId = window.setTimeout(() => {
        setHaunting(true);
        const swapId = window.setTimeout(() => {
          setInverted((value) => !value);
          setHaunting(false);
          scheduleHaunt();
        }, 780);
        hauntTimers.current.push(swapId);
      }, wait);
      hauntTimers.current.push(waitId);
    };

    scheduleHaunt();
    return clearHaunt;
  }, [spinState]);

  const pageClass = [
    "halloween-page",
    inverted ? "halloween-page--inverted" : "",
    spinState === "spinning" ? "halloween-page--storm" : "",
    haunting ? "halloween-page--haunt" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={pageClass}>
      <div className="hw-split" aria-hidden="true">
        <span className="hw-split__order" />
        <span className="hw-split__chaos" />
        <span className="hw-split__crack" />
      </div>
      <div className="hw-grain" aria-hidden="true" />
      <Lightning />

      <section className="hw-hero" id="wheel">
        <div className="hw-section-main">
          <DualText
            as="p"
            className="hw-eyebrow"
            order="You're invited"
            chaos="YoU'RE iNvItED"
          />
          <DualText
            as="h1"
            className="hw-title"
            order="A Halloween gathering"
            chaos="A HALLOWEEN RITUAL"
          />
          <DualWheel onSpinStateChange={handleSpinStateChange} />
          <DualText
            className="hw-body hw-tagline"
            order="The wheel does not choose a side. It only shows that every side has an opposite."
            chaos="SPIN IT UNTIL THE ARROWS LIE. THEY NEVER WILL."
          />
        </div>
      </section>

      <SectionLink to="concept" />
      <HalloweenConcept />
      <SectionLink to="details" />
      <HalloweenDetails />
      <SectionLink to="rsvp" />
      <HalloweenRsvp />
    </div>
  );
}
