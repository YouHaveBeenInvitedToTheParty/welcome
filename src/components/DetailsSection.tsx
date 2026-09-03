import { useState } from "react";
import { EVENT, HOUSE_CALENDAR } from "../data/event";
import { addToCalendar } from "../utils/calendar";
import "./sections.css";
import "./AddToCalendarButton.css";

export function DetailsSection() {
  const [clickStage, setClickStage] = useState<"idle" | "wish" | "added">("idle");

  const handleCalendarClick = () => {
    if (clickStage === "idle") {
      setClickStage("wish");
      return;
    }

    if (clickStage === "wish") {
      addToCalendar(HOUSE_CALENDAR);
      setClickStage("added");
    }
  };

  return (
    <section className="section details-section" id="details">
      <p className="section-eyebrow">When &amp; where</p>
      <h2 className="section-title">Mark your calendar</h2>

      <div className="details-grid">
        <div className="detail-card">
          <span className="detail-label">Date</span>
          <span className="detail-value">{EVENT.dateLabel}</span>
        </div>
        <div className="detail-card">
          <span className="detail-label">Time</span>
          <span className="detail-value">{EVENT.timeLabel}</span>
        </div>
        <div className="detail-card detail-card--wide">
          <span className="detail-label">Place</span>
          <address className="detail-value detail-address">
            {EVENT.addressLine}
            <br />
            {EVENT.city}
          </address>
        </div>
      </div>

      <div className="calendar-action">
        <button
          type="button"
          className={`calendar-btn ${clickStage === "added" ? "calendar-btn--added" : ""}`}
          onClick={handleCalendarClick}
          disabled={clickStage === "added"}
        >
          {clickStage === "added" ? "Added!" : "Add to calendar"}
        </button>

        {clickStage === "wish" && (
          <p className="calendar-wish" role="status">
            YOU WISH!
          </p>
        )}

        {clickStage === "added" && (
          <p className="calendar-added" role="status">
            See you there. Theme TBD.
          </p>
        )}
      </div>
    </section>
  );
}
