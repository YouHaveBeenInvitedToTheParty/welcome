import { useState } from "react";
import { HALLOWEEN_CALENDAR, HALLOWEEN_EVENT } from "../../data/halloweenEvent";
import { addToCalendar } from "../../utils/calendar";
import { DualText } from "./DualText";

type Side = "light" | "dark";
type Stage = "idle" | "waiting" | "error" | "added";

const ERRORS = [
  {
    order: "The lock does not answer a single knock twice. Cross, then retry.",
    chaos: "SAME SEEKS SAME AND STARVES. CROSS THE VEIL. AGAIN.",
  },
  {
    order: "A pale hand cannot open a pale door. Try the other half.",
    chaos: "YOU PETITIONED THE SHADOW WITH THE SHADOW. IT LAUGHS. RETRY.",
  },
  {
    order: "Balance refuses a rhyme. Light then dark, or dark then light.",
    chaos: "MIRROR MEETING MIRROR GOES BLIND. SWITCH. TRY AGAIN.",
  },
] as const;

export function HalloweenDetails() {
  const [first, setFirst] = useState<Side | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState<(typeof ERRORS)[number]>(ERRORS[0]);

  const handleSide = (side: Side) => {
    if (stage === "added") return;

    if (first === null) {
      setFirst(side);
      setStage("waiting");
      return;
    }

    if (first === side) {
      setError(ERRORS[Math.floor(Math.random() * ERRORS.length)]);
      setFirst(null);
      setStage("error");
      return;
    }

    addToCalendar(HALLOWEEN_CALENDAR);
    setFirst(null);
    setStage("added");
  };

  const lightLabel =
    stage === "added"
      ? "Entered."
      : first === "light"
        ? "Now the dark"
        : first === "dark"
          ? "The light waits"
          : "Add to calendar";

  const darkLabel =
    stage === "added"
      ? "YOU'RE IN"
      : first === "dark"
        ? "NOW THE PALE"
        : first === "light"
          ? "NOW THE VOID"
          : "MARK THE NIGHT";

  return (
    <section className="hw-section" id="details">
      <div className="hw-section-main">
      <DualText
        as="p"
        className="hw-eyebrow"
        order="When & where"
        chaos="THE HOUR"
      />
      <DualText
        as="h2"
        className="hw-title"
        order="The house. The date."
        chaos="SAME THRESHOLD"
      />

      <div className="hw-details">
        <DualText
          className="hw-detail"
          order={
            <>
              <span className="hw-detail-label">Date</span>
              {HALLOWEEN_EVENT.dateLabel}
            </>
          }
          chaos={
            <>
              <span className="hw-detail-label">WHEN</span>
              ALL HALLOWS
            </>
          }
        />
        <DualText
          className="hw-detail"
          order={
            <>
              <span className="hw-detail-label">Time</span>
              {HALLOWEEN_EVENT.timeLabel}
            </>
          }
          chaos={
            <>
              <span className="hw-detail-label">NOW</span>
              NINETEEN HUNDRED
            </>
          }
        />
        <DualText
          className="hw-detail hw-detail--wide"
          order={
            <>
              <span className="hw-detail-label">Place</span>
              {HALLOWEEN_EVENT.addressLine}
              <br />
              {HALLOWEEN_EVENT.city}
            </>
          }
          chaos={
            <>
              <span className="hw-detail-label">WHERE</span>
              THE SAME HOUSE
              <br />
              IT KNOWS YOU
            </>
          }
        />
      </div>

      <div className="hw-calendar">
        <div className="hw-calendar-pair dual-text">
          <button
            type="button"
            className={`hw-cal-btn dual-order ${first === "light" ? "hw-cal-btn--held" : ""} ${stage === "added" ? "hw-cal-btn--done" : ""}`}
            onClick={() => handleSide("light")}
            disabled={stage === "added"}
          >
            {lightLabel}
          </button>
          <button
            type="button"
            className={`hw-cal-btn dual-chaos ${first === "dark" ? "hw-cal-btn--held" : ""} ${stage === "added" ? "hw-cal-btn--done" : ""}`}
            onClick={() => handleSide("dark")}
            disabled={stage === "added"}
          >
            {darkLabel}
          </button>
        </div>

        {stage === "waiting" && (
          <DualText
            className="hw-calendar-msg"
            order={
              first === "light"
                ? "Pale has spoken. The dark must answer."
                : "The void has heard you. Now the light."
            }
            chaos={
              first === "light"
                ? "ONE FOOT IN THE DAY. STEP INTO THE NIGHT."
                : "THE BLACK KNOCKS. LET THE PALE REPLY."
            }
          />
        )}

        {stage === "error" && (
          <DualText
            className="hw-calendar-msg"
            order={error.order}
            chaos={error.chaos}
          />
        )}

        {stage === "added" && (
          <DualText
            className="hw-calendar-msg"
            order="Noted. See you at the threshold."
            chaos="BOUND. THE NIGHT HAS YOUR NAME."
          />
        )}
      </div>
      </div>
    </section>
  );
}
