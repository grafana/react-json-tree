import type { CommonExternalProps } from './types.js';
interface Props extends Partial<CommonExternalProps> {
    data: unknown;
}
export declare function JSONTree({ data: value, keyPath, labelRenderer, valueRenderer, shouldExpandNodeInitially, hideRoot, getItemString, postprocessValue, isCustomNode, collectionLimit, sortObjectKeys, }: Props): import("react/jsx-runtime").JSX.Element;
export type { Key, KeyPath, GetItemString, LabelRenderer, ValueRenderer, ShouldExpandNodeInitially, PostprocessValue, IsCustomNode, SortObjectKeys, CommonExternalProps, } from './types.js';
