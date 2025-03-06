import React from "react";
import styles from "./styles/JSONArrow.module.scss";

interface Props {
  arrowStyle?: "single" | "double";
  expanded: boolean;
  nodeType: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function JSONArrow({
  arrowStyle = "single",
  expanded,
  nodeType,
  onClick,
}: Props) {
  return (
    <div className={styles.arrowContainer} onClick={onClick}>
      <div
        className={`${styles.arrow} arrow--node-type-${nodeType} ${expanded ? styles.arrowExpanded : ""} arrow--arrow-style-${arrowStyle === "single" ? styles.arrowArrowStyleSingle : styles.arrowArrowStyleDouble}`}
      >
        {/* @todo let implementer define custom arrow object */}
        {"\u25B6"}
        {arrowStyle === "double" && (
          <div className={styles.arrow__inner}>{"\u25B6"}</div>
        )}
      </div>
    </div>
  );
}
