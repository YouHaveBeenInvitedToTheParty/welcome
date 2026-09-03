import { scrollToSection } from "../../utils/scrollToSection";

type SectionNavProps = {
  to: string;
  up?: boolean;
};

export function SectionNav({ to, up = false }: SectionNavProps) {
  return (
    <button
      type="button"
      className={`hw-scroll dual-text ${up ? "hw-scroll--up" : ""}`}
      onClick={() => {
        scrollToSection(to);
      }}
    >
      <span className="dual-order">{up ? "return to the wheel" : "continue"}</span>
      <span className="dual-chaos" aria-hidden="true">
        {up ? "CRAWL BACK TO THE SPIN" : "descend"}
      </span>
    </button>
  );
}
