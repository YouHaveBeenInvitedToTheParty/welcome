import "./sections.css";

export function RsvpSection() {
  return (
    <section className="section rsvp-section" id="rsvp">
      <p className="section-eyebrow">RSVP</p>
      <h2 className="section-title">You&apos;re coming, right?</h2>
      <div className="section-body rsvp-body">
        <p className="rsvp-main">Bring fun and booze.</p>
        <p>
          Bring something to drink or share. Good vibes
          are the only dress code... but a costume helps.
        </p>
      </div>
    </section>
  );
}
