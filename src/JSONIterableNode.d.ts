import type { CommonInternalProps } from './types';
interface Props extends CommonInternalProps {
    data: unknown;
    nodeType: string;
}
export default function JSONIterableNode(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
