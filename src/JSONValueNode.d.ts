import type { GetItemString, Key, KeyPath, LabelRenderer, ValueRenderer } from './types.js';
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
export default function JSONValueNode({ nodeType, labelRenderer, keyPath, valueRenderer, value, valueGetter, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
