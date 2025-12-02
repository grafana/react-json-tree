import React from "react";
import styles from "./styles/JSONArrow.module.scss";

interface Props {
  arrowStyle?: "single" | "double";
  expanded: boolean;
  nodeType: string;
  onClick: () => void;
}

export default function JSONArrow({
  arrowStyle = "single",
  expanded,
  onClick,
}: Props) {
  return (
    <div
      role={"button"}
      aria-expanded={expanded}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className={`${styles.arrow} ${expanded ? styles.arrowExpanded : ""} ${arrowStyle === "single" ? styles.arrowArrowStyleSingle : styles.arrowArrowStyleDouble}`}
    >
      {/* @todo let implementer define custom arrow object */}
      {"\u25B6"}
      {arrowStyle === "double" && (
        <div className={`${styles.arrowInner}`}>{"\u25B6"}</div>
      )}
    </div>
  );
}
