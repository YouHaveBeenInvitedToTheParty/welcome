import { DualText } from "./DualText";

export function HalloweenConcept() {
  return (
    <section className="hw-section" id="concept">
      <div className="hw-section-main">
        <DualText
          as="p"
          className="hw-eyebrow"
          order="The concept"
          chaos="THE RIFT"
        />
        <DualText
          as="h2"
          className="hw-title"
          order="Two sides. One night."
          chaos="SPLIT YOURSELF OPEN"
        />
        <DualText
          className="hw-body"
          order="You arrive at the house as you are, or as both of yourself. Costumes are not required. If you want a suggestion: explore duality. Angel and devil. Saint and sinner. Neat and undone."
          chaos="WEAR TWO FACES OR NONE. HALLOWEEN IS A MIRROR. COME WRONG. COME SPLIT. THE NIGHT WILL FINISH WHAT YOU START."
        />
        <DualText
          className="hw-body"
          order="Snacks and drinks are provided. Later, the plan is to go out and party, a club, if enough of us want it. That part is optional. Stay for the house, then leave whenever you like."
          chaos="EAT. DRINK. THEN WE DESCEND. OR DON'T. NOBODY OWNS YOUR EXIT. BUT THE STREETS WILL HOWL WITHOUT YOU."
        />
      </div>
    </section>
  );
}
