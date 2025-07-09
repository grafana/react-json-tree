import React, { useCallback, useState } from "react";
import JSONArrow from "./JSONArrow.js";
import type { CircularCache, CommonInternalProps } from "./types.js";
import styles from "./styles/itemRange.module.scss";

interface Props extends CommonInternalProps {
  data: unknown;
  nodeType: string;
  from: number;
  to: number;
  renderChildNodes: (props: Props, from: number, to: number) => React.ReactNode;
  circularCache: CircularCache;
  level: number;
}

export default function ItemRange(props: Props) {
  const { from, to, renderChildNodes, nodeType } = props;

  const [expanded, setExpanded] = useState<boolean>(false);
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
