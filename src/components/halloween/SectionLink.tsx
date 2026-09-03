import { scrollToSection } from "../../utils/scrollToSection";

type Layer = "back" | "front";

function OliveBranch({ layer }: { layer: Layer }) {
  const leaves = Array.from({ length: 90 }, (_, i) => {
    const y = 16 + i * 53;
    const wave = (Math.sin(i * 0.58) + 1) * 0.5;
    const reach = 28 + (i % 5) * 10;
    const x = 196 - wave * reach - (i % 2) * 8;
    const rot = -18 - (i % 6) * 8 - wave * 10;
    const rx = 12 + (i % 4) * 1.6;
    const front = i % 4 !== 2;
    return { y, x: Math.max(36, Math.min(206, x)), rot, rx, front };
  });

  const shown = leaves.filter((leaf) => (layer === "front" ? leaf.front : !leaf.front));

  return (
    <svg
      className={`hw-link__svg hw-link__svg--${layer}`}
      viewBox="0 0 220 4800"
      preserveAspectRatio="xMaxYMin slice"
      aria-hidden="true"
    >
      {layer === "back" && (
        <path
          d="M208 0
             C 188 80, 150 160, 176 240
             C 204 320, 168 400, 130 480
             C 168 560, 206 640, 184 720
             C 152 800, 118 880, 156 960
             C 198 1040, 206 1120, 172 1200
             C 136 1280, 108 1360, 148 1440
             C 196 1520, 208 1600, 178 1680
             C 142 1760, 114 1840, 154 1920
             C 200 2000, 208 2080, 176 2160
             C 138 2240, 110 2320, 150 2400
             C 198 2480, 208 2560, 180 2640
             C 144 2720, 116 2800, 156 2880
             C 200 2960, 208 3040, 174 3120
             C 136 3200, 112 3280, 152 3360
             C 196 3440, 208 3520, 178 3600
             C 142 3680, 118 3760, 158 3840
             C 200 3920, 208 4000, 176 4080
             C 140 4160, 114 4240, 154 4320
             C 196 4400, 208 4480, 180 4560
             C 168 4640, 190 4720, 204 4800"
          fill="none"
          stroke="#3f6a28"
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
      {layer === "front" && (
        <path
          d="M176 240 C 150 280, 168 360, 130 480
             M184 720 C 150 780, 130 860, 156 960
             M172 1200 C 140 1280, 120 1360, 148 1440
             M178 1680 C 144 1760, 124 1840, 154 1920
             M176 2160 C 140 2240, 122 2320, 150 2400
             M180 2640 C 146 2720, 126 2800, 156 2880
             M174 3120 C 138 3200, 124 3280, 152 3360
             M178 3600 C 144 3680, 128 3760, 158 3840
             M176 4080 C 142 4160, 126 4240, 154 4320
             M180 4560 C 160 4640, 176 4720, 204 4800"
          fill="none"
          stroke="#4d7c30"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      )}
      {shown.map((leaf, i) => (
        <ellipse
          key={`${layer}-${i}`}
          cx={leaf.x}
          cy={leaf.y}
          rx={leaf.rx}
          ry="5.2"
          fill={leaf.front ? "#6b9a40" : "#3d6d28"}
          transform={`rotate(${leaf.rot} ${leaf.x} ${leaf.y})`}
        />
      ))}
    </svg>
  );
}

function RottenWood({ layer }: { layer: Layer }) {
  const splinters = Array.from({ length: 30 }, (_, i) => {
    const y = 36 + i * 158;
    const x1 = 14 + (i % 3) * 6;
    const x2 = x1 + 46 + (i % 4) * 12;
    const jab = i % 2 === 0 ? 22 : 14;
    return {
      d: `M${x1} ${y} L${Math.min(168, x2)} ${y + jab} L${x1 + 10} ${y + 12} Z`,
      front: i % 3 !== 1,
    };
  });

  const shown = splinters.filter((piece) => (layer === "front" ? piece.front : !piece.front));

  return (
    <svg
      className={`hw-link__svg hw-link__svg--${layer}`}
      viewBox="0 0 220 4800"
      preserveAspectRatio="xMinYMin slice"
      aria-hidden="true"
    >
      {layer === "back" && (
        <>
          <path
            d="M12 0 L48 80 L18 170 L62 270 L16 380 L70 500 L14 630 L58 760 L20 900 L74 1040 L16 1190 L66 1340 L18 1500 L72 1660 L14 1830 L60 2000 L20 2180 L76 2360 L16 2550 L68 2740 L18 2940 L72 3140 L14 3350 L64 3560 L20 3780 L70 4000 L16 4230 L58 4460 L22 4640 L44 4800 L8 4800 L4 0 Z"
            fill="#4a2a12"
          />
          <path
            d="M22 0 L50 110 L20 230 L64 370 L18 520 L68 680 L22 850 L56 1030 L24 1220 L70 1420 L18 1630 L62 1850 L22 2080 L68 2320 L20 2570 L60 2830 L24 3100 L66 3380 L18 3670 L62 3970 L22 4280 L52 4560 L28 4800"
            fill="none"
            stroke="#2c1608"
            strokeWidth="4.4"
            strokeLinejoin="miter"
          />
        </>
      )}
      {shown.map((piece, i) => (
        <path
          key={`${layer}-${i}`}
          d={piece.d}
          fill={piece.front ? "#7a4520" : "#3a220e"}
          stroke="#2c1608"
          strokeWidth="1.1"
        />
      ))}
    </svg>
  );
}

type SectionLinkProps = {
  to: string;
};

export function SectionLink({ to }: SectionLinkProps) {
  const go = () => {
    scrollToSection(to);
  };

  return (
    <div className="hw-link">
      <div className="hw-link__art hw-link__art--olive hw-link__art--back">
        <OliveBranch layer="back" />
      </div>
      <div className="hw-link__art hw-link__art--wood hw-link__art--back">
        <RottenWood layer="back" />
      </div>

      <div className="hw-link__side hw-link__side--olive">
        <button
          type="button"
          className="hw-travel hw-travel--continue"
          onClick={go}
          aria-label="Continue to the next section"
        >
          continue
        </button>
      </div>
      <div className="hw-link__side hw-link__side--wood">
        <button
          type="button"
          className="hw-travel hw-travel--descend"
          onClick={go}
          aria-label="Descend to the next section"
        >
          descend
        </button>
      </div>

      <div className="hw-link__art hw-link__art--olive hw-link__art--front">
        <OliveBranch layer="front" />
      </div>
      <div className="hw-link__art hw-link__art--wood hw-link__art--front">
        <RottenWood layer="front" />
      </div>
    </div>
  );
}
