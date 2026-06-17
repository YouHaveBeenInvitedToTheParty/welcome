import "./sections.css";

export function ConceptSection() {
  return (
    <section className="section concept-section" id="concept">
      <p className="section-eyebrow">The concept</p>
      <h2 className="section-title">
        Pick a theme. Commit to the bit.
      </h2>
      <div className="section-body">
        <p>
          Show up at the party pretending it&apos;s whatever theme you want — wedding,
          tea ceremony, princess, pajama, your call.
        </p>
        <p className="concept-doorline">
          At the door, look confused and say:
        </p>
        <blockquote className="concept-quote">
          Wasn&apos;t this a <span className="concept-blank">____</span> party?
        </blockquote>
        <p>
          The blank is yours to fill. The roulette is just a suggestion. The
          commitment is mandatory (jk you can show up in your regular clothes).
        </p>
      </div>
    </section>
  );
}
