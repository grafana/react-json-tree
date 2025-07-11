import React from "react";
import { areKeyPathsEqual } from "./index";
import type {
  Key,
  KeyPath,
  LabelRenderer,
  ScrollToPath,
  ValueRenderer,
} from "./types";
import styles from "./styles/JSONValueNode.module.scss";

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

interface Props {
  key: Key;
  keyPath: KeyPath;
  labelRenderer: LabelRenderer;
  nodeType: string;
  value: unknown;
  valueRenderer: ValueRenderer;
  valueGetter?: (value: any) => unknown;
  scrollToPath?: ScrollToPath;
}

export default function JSONValueNode({
  nodeType,
  labelRenderer,
  keyPath,
  valueRenderer,
  value,
  valueGetter = (value) => value,
  scrollToPath,
}: Props) {
  const ref = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const optionalProps =
    scrollToPath !== undefined && areKeyPathsEqual(scrollToPath, keyPath)
      ? { ref }
      : {};

  return (
    <li
      className={`${styles.valueNode} valueNode--${nodeType} valueNode--${keyPath[0]}`}
      {...optionalProps}
    >
      <span data-testid={"value-node-label"} className={styles.valueNodeLabel}>
        {labelRenderer(keyPath, nodeType, false, false)}
      </span>
      <span data-testid={"value-node-value"} className={styles.valueNodeValue}>
        {valueRenderer(
          valueGetter ? valueGetter(value) : undefined,
          value,
          ...keyPath,
        )}
      </span>
    </li>
  );
}
