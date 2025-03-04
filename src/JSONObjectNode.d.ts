import type { CommonInternalProps } from './types';
interface Props extends CommonInternalProps {
    data: unknown;
    nodeType: string;
}
export default function JSONObjectNode({ data, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
