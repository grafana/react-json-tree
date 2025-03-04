import type { CommonInternalProps } from './types';
interface Props extends CommonInternalProps {
    data: unknown;
    nodeType: string;
}
export default function JSONArrayNode({ data, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
