import React, { useCallback, useState } from "react";
import JSONArrow from "./JSONArrow.js";
import { CircularCache, CommonInternalProps, ScrollToPath } from "./types.js";
import styles from "./styles/itemRange.module.scss";
import { areKeyPathsEqual } from "./index.tsx";

interface Props extends CommonInternalProps {
  data: unknown;
  nodeType: string;
  from: number;
  to: number;
  renderChildNodes: (props: Props, from: number, to: number) => React.ReactNode;
  circularCache: CircularCache;
  level: number;
  scrollToPath?: ScrollToPath;
}

export default function ItemRange(props: Props) {
  const { from, to, renderChildNodes, nodeType, scrollToPath, keyPath } = props;
  let initialExpanded = false;
  if (scrollToPath) {
    const [index, ...path] = scrollToPath;
    if (areKeyPathsEqual(path, keyPath) && index > from && index <= to) {
      initialExpanded = true;
    }
  }

  const [expanded, setExpanded] = useState<boolean>(initialExpanded);
  const handleClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return expanded ? (
    <div className={`${styles.itemRange}`}>
      {renderChildNodes(props, from, to)}
    </div>
  ) : (
    <div className={`${styles.itemRange}`}>
      <JSONArrow
        nodeType={nodeType}
        expanded={false}
        onClick={handleClick}
        arrowStyle="double"
      />
      {`${from} ... ${to}`}
    </div>
  );
}
