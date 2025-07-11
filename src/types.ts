import React from "react";

export type Key = string | number;

export interface JSONTreeProps extends Partial<CommonExternalProps> {
  data: unknown;
}

export type JSONTree = React.Component<JSONTreeProps>;
export type KeyPath = readonly (string | number)[];
// This only works for top level arrays and nested arrays that are already under the collection limit
// Only arrays are supported as we do not iterate through object keys until expanded if they are bigger then the collection limit
// If the array index is within a nested object that is over the collection limit this won't work either.
export type ScrollToPath = [number, ...KeyPath];

export type GetItemString = (
  nodeType: string,
  data: unknown,
  itemType: React.ReactNode,
  itemString: string,
  keyPath: KeyPath,
) => React.ReactNode;

export type LabelRenderer = (
  keyPath: KeyPath,
  nodeType: string,
  expanded: boolean,
  expandable: boolean,
) => React.ReactNode;

export type ValueRenderer = (
  valueAsString: unknown,
  value: unknown,
  ...keyPath: KeyPath
) => React.ReactNode;

export type ShouldExpandNodeInitially = (
  keyPath: KeyPath,
  data: unknown,
  level: number,
) => boolean;

export type PostprocessValue = (value: unknown) => unknown;

export type IsCustomNode = (value: unknown) => boolean;

export type SortObjectKeys = ((a: unknown, b: unknown) => number) | boolean;

export type CircularCache = unknown[];

export interface CommonExternalProps {
  keyPath: KeyPath;
  labelRenderer: LabelRenderer;
  valueRenderer: ValueRenderer;
  shouldExpandNodeInitially: ShouldExpandNodeInitially;
  hideRoot: boolean;
  hideRootExpand: boolean;
  getItemString: GetItemString;
  postprocessValue: PostprocessValue;
  isCustomNode: IsCustomNode;
  collectionLimit: number;
  sortObjectKeys: SortObjectKeys;
  valueWrap: string;
  scrollToPath?: ScrollToPath;
}

export interface CommonInternalProps extends CommonExternalProps {
  circularCache?: CircularCache;
  level?: number;
  isCircular?: boolean;
}
