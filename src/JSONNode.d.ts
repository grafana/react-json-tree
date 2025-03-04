import type { CommonInternalProps } from './types';
interface Props extends CommonInternalProps {
    value: unknown;
}
export default function JSONNode({ getItemString, keyPath, labelRenderer, value, valueRenderer, isCustomNode, ...rest }: Props): import("react/jsx-runtime").JSX.Element;
export {};
