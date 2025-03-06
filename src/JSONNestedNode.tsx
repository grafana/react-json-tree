import React, { useCallback, useState } from 'react';
import JSONArrow from './JSONArrow.js';
import getCollectionEntries from './getCollectionEntries.js';
import JSONNode from './JSONNode.js';
import ItemRange from './ItemRange.js';
import type { CircularCache, CommonInternalProps } from './types.js';
import styles from "./styles/JSONNestedNode.module.scss"

/**
 * Renders nested values (eg. objects, arrays, lists, etc.)
 */

export interface RenderChildNodesProps extends CommonInternalProps {
  data: unknown;
  nodeType: string;
  circularCache: CircularCache;
  level: number;
}

interface Range {
  from: number;
  to: number;
}

interface Entry {
  key: string | number;
  value: unknown;
}

function isRange(rangeOrEntry: Range | Entry): rangeOrEntry is Range {
  return (rangeOrEntry as Range).to !== undefined;
}

function renderChildNodes(
  props: RenderChildNodesProps,
  from?: number,
  to?: number,
) {
  const {
    nodeType,
    data,
    collectionLimit,
    circularCache,
    keyPath,
    postprocessValue,
    sortObjectKeys,
  } = props;
  const childNodes: React.ReactNode[] = [];

  getCollectionEntries(
    nodeType,
    data,
    sortObjectKeys,
    collectionLimit,
    from,
    to,
  ).forEach((entry) => {
    if (isRange(entry)) {
      childNodes.push(
        <ItemRange
          {...props}
          key={`ItemRange--${entry.from}-${entry.to}`}
          from={entry.from}
          to={entry.to}
          renderChildNodes={renderChildNodes}
        />,
      );
    } else {
      const { key, value } = entry;
      const isCircular = circularCache.includes(value);

      childNodes.push(
        <JSONNode
          {...props}
          {...{ postprocessValue, collectionLimit }}
          key={`Node--${key}`}
          keyPath={[key, ...keyPath]}
          value={postprocessValue(value)}
          circularCache={[...circularCache, value]}
          isCircular={isCircular}
          hideRoot={false}
        />,
      );
    }
  });

  return childNodes;
}

interface Props extends CommonInternalProps {
  data: unknown;
  nodeType: string;
  nodeTypeIndicator: string;
  createItemString: (data: unknown, collectionLimit: number) => string;
  expandable: boolean;
}

export default function JSONNestedNode(props: Props) {
  const {
    circularCache = [],
    collectionLimit,
    createItemString,
    data,
    expandable,
    getItemString,
    hideRoot,
    isCircular,
    keyPath,
    labelRenderer,
    level = 0,
    nodeType,
    nodeTypeIndicator,
    shouldExpandNodeInitially,
  } = props;

  const [expanded, setExpanded] = useState<boolean>(
    // calculate individual node expansion if necessary
    isCircular ? false : shouldExpandNodeInitially(keyPath, data, level),
  );

  const handleClick = useCallback(() => {
    if (expandable) setExpanded(!expanded);
  }, [expandable, expanded]);

  const renderedChildren =
    expanded || (hideRoot && level === 0)
      ? renderChildNodes({ ...props, circularCache, level: level + 1 })
      : null;

  const itemType = (
    <span className={ `${styles.nestedNodeItemType} ${expanded? styles.nestedNodeItemTypeExpanded : ''}`}>
      {nodeTypeIndicator}
    </span>
  );
  const renderedItemString = getItemString(
    nodeType,
    data,
    itemType,
    createItemString(data, collectionLimit),
    keyPath,
  );
  const stylingArgs = [keyPath, nodeType, expanded, expandable] as const;

  return hideRoot ? (
    <li
        data-nodetype={nodeType}
        data-keypath={keyPath[0]}
        className={`${styles.rootNode} ${expanded ? styles.rootNodeExpanded : ''} ${expandable ? styles.rootNodeExpandable : ''}`}>
      <ul className={`${styles.rootNode__children}`}>
        {renderedChildren}
      </ul>
    </li>
  ) : (
    <li
        data-nodetype={nodeType}
        data-keypath={keyPath[0]}
        className={`${styles.nestedNode}  ${expanded ? styles.nestedNodeExpanded : ''} ${expandable ? styles.nestedNodeExpandable : ''}`}>

      <span className={styles.nestedNodeLabelWrap}>
          {expandable && (
            <JSONArrow
              nodeType={nodeType}
              expanded={expanded}
              onClick={handleClick}
            />
          )}
          <span
              data-nodetype={nodeType}
              data-keypath={keyPath[0]}
              className={`${styles.nestedNodeLabel} ${expanded ? styles.nestedNodeLabelExpanded: ''} ${expandable ? styles.nestedNodeLabelExpandable : ''}`}
            onClick={handleClick}
          >
            {labelRenderer(...stylingArgs)}
          </span>
          <span
              className={styles.nestedNodeItemString}
              onClick={handleClick}
          >
            {renderedItemString}
          </span>
      </span>
      {renderedChildren &&
          <ul className={styles.nestedNodeChildren}>
            {renderedChildren}
          </ul>
      }

    </li>
  );
}
