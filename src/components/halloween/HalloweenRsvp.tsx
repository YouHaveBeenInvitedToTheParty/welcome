import { useState, type FormEvent } from "react";
import { DualText } from "./DualText";
import { SectionNav } from "./SectionNav";
import { shareText } from "../../utils/share";

type ClubChoice = "house" | "club";

export function HalloweenRsvp() {
  const [name, setName] = useState("");
  const [choice, setChoice] = useState<ClubChoice | null>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !choice) return;

    const clubLine =
      choice === "club"
        ? "wants tickets for the club later"
        : "house only, drinks and snacks, no club";
    const message = `Halloween RSVP: ${name.trim()}, ${clubLine}.`;
    const result = await shareText(message);
    setStatus(result === "failed" ? "failed" : "copied");
  };

  return (
    <section className="hw-section hw-section--rsvp" id="rsvp">
      <div className="hw-section-main">
      <DualText as="p" className="hw-eyebrow" order="RSVP" chaos="SPEAK" />
      <DualText
        as="h2"
        className="hw-title"
        order="Tell us how you'll come."
        chaos="NAME YOURSELF"
      />
      <DualText
        className="hw-body"
        order="Snacks and drinks are on us. Please let us know if you also want to go to a club later so we can sort tickets. It is not mandatory, you can stay for the house and leave."
        chaos="STAY AND SIP. OR FOLLOW US INTO THE BEAT. SAY IT NOW SO WE CAN HUNT TICKETS. OR SAY NOTHING AND VANISH AT MIDNIGHT."
      />

      <form className="hw-rsvp" onSubmit={handleSubmit}>
        <label className="hw-field">
          <DualText
            as="span"
            className="hw-field-label"
            order="Your name"
            chaos="WHO ENTERS"
          />
          <input
            className="hw-input"
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <fieldset className="hw-choice">
          <legend className="sr-only">Will you join a club later?</legend>
          <button
            type="button"
            className={`hw-split-btn hw-choice-btn ${choice === "house" ? "hw-choice-btn--on" : ""}`}
            onClick={() => setChoice("house")}
            aria-pressed={choice === "house"}
          >
            <span className="dual-order">House only</span>
            <span className="dual-chaos" aria-hidden="true">
              DRINKS. DONE.
            </span>
          </button>
          <button
            type="button"
            className={`hw-split-btn hw-choice-btn ${choice === "club" ? "hw-choice-btn--on" : ""}`}
            onClick={() => setChoice("club")}
            aria-pressed={choice === "club"}
          >
            <span className="dual-order">House, then club</span>
            <span className="dual-chaos" aria-hidden="true">
              THEN WE HUNT
            </span>
          </button>
        </fieldset>

        <button
          type="submit"
          className="hw-split-btn"
          disabled={!name.trim() || !choice}
        >
          <span className="dual-order">Send RSVP</span>
          <span className="dual-chaos" aria-hidden="true">
            SEAL IT
          </span>
        </button>

        {status === "copied" && (
          <DualText
            className="hw-calendar-msg"
            order="Copied. Send that to the hosts on WhatsApp, Telegram, or a message."
            chaos="THE PACT IS WRITTEN. DELIVER IT."
          />
        )}

        {status === "failed" && (
          <DualText
            className="hw-calendar-msg"
            order={`Message the hosts: ${name.trim()}, ${choice === "club" ? "club later" : "house only"}.`}
            chaos="SCREAM IT INTO THE VOID. THEN TEXT US."
          />
        )}
      </form>
      </div>
      <SectionNav to="wheel" up />
    </section>
  );
}
