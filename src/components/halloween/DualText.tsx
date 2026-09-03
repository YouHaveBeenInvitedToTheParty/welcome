import type { ElementType, ReactNode } from "react";

type DualTextProps = {
  order: ReactNode;
  chaos: ReactNode;
  className?: string;
  as?: ElementType;
};

export function DualText({
  order,
  chaos,
  className = "",
  as: Tag = "p",
}: DualTextProps) {
  return (
    <Tag className={`dual-text ${className}`}>
      <span className="dual-order">{order}</span>
      <span className="dual-chaos" aria-hidden="true">
        {chaos}
      </span>
    </Tag>
  );
}
