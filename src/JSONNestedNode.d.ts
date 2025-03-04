import type { CircularCache, CommonInternalProps } from './types';
/**
 * Renders nested values (eg. objects, arrays, lists, etc.)
 */
export interface RenderChildNodesProps extends CommonInternalProps {
    data: unknown;
    nodeType: string;
    circularCache: CircularCache;
    level: number;
}
interface Props extends CommonInternalProps {
    data: unknown;
    nodeType: string;
    nodeTypeIndicator: string;
    createItemString: (data: unknown, collectionLimit: number) => string;
    expandable: boolean;
}
export default function JSONNestedNode(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
