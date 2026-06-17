import { PartyRoulette } from "./components/PartyRoulette";
import { Sparkles } from "./components/Sparkles";
import { ConceptSection } from "./components/ConceptSection";
import { DetailsSection } from "./components/DetailsSection";
import { RsvpSection } from "./components/RsvpSection";
import "./styles/App.css";

export default function App() {
  return (
    <div className="app">
      <div className="bg-gradient" aria-hidden="true" />
      <div className="bg-orbs" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>
      <Sparkles />
      <div className="grain" aria-hidden="true" />

      <section className="hero">
        <p className="eyebrow">you&apos;re invited</p>
        <PartyRoulette />
        <p className="tagline">…probably. we&apos;ll see what the roulette says.</p>
        <a className="scroll-hint" href="#concept">
          <span className="footer-dot" />
          scroll down for more
        </a>
      </section>

      <ConceptSection />
      <DetailsSection />
      <RsvpSection />
    </div>
  );
}
