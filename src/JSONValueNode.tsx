import type {
  GetItemString,
  Key,
  KeyPath,
  LabelRenderer,
  ValueRenderer,
} from './types.js';
import styles from "./styles/JSONValueNode.module.scss"

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

interface Props {
  getItemString: GetItemString;
  key: Key;
  keyPath: KeyPath;
  labelRenderer: LabelRenderer;
  nodeType: string;
  value: unknown;
  valueRenderer: ValueRenderer;
  valueGetter?: (value: any) => unknown;
}

export default function JSONValueNode({
  nodeType,
  labelRenderer,
  keyPath,
  valueRenderer,
  value,
  valueGetter = (value) => value,
}: Props) {
  return (
    <li className={`${styles.valueNode} valueNode--${nodeType} valueNode--${keyPath}`}>
      <span className={styles.valueNode__label}>
        {labelRenderer(keyPath, nodeType, false, false)}
      </span>
      <span className={styles.valueNode__value}>
        {valueRenderer(valueGetter ? valueGetter(value) : undefined, value, ...keyPath)}
      </span>
    </li>
  );
}
