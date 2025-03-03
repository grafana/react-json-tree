import React from 'react';
import type {
  GetItemString,
  Key,
  KeyPath,
  LabelRenderer,
  ValueRenderer,
} from './types.js';

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
    <li className={`value value--${nodeType} value--${keyPath}`}>
      <span className={`label valueLabel valueLabel---node-type-${nodeType} valueLabel--key-path-${keyPath}`}>
        {labelRenderer(keyPath, nodeType, false, false)}
      </span>
      <span className={`valueText valueText--node-type-${nodeType} valueText--key-path-${keyPath}`}>
        {valueRenderer(valueGetter ? valueGetter(value) : undefined, value, ...keyPath)}
      </span>
    </li>
  );
}
