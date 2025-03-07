import React from "react";
import { KeyPath } from "../main.ts";

interface ListItemProps {
  expanded: boolean;
  expandable: boolean;
  nodeType: string;
  keyPath: KeyPath;
  className: string;
  children: React.ReactNode;
}

export const NodeListItem = ({
  children,
  expanded,
  expandable,
  nodeType,
  keyPath,
  className,
}: ListItemProps) => {
  // aria-expanded is only wanted on elements that have expanded state, for un-expandable nodes we want to omit the attribute all together
  if (expandable) {
    return (
      <li
        role="treeitem"
        aria-expanded={expanded}
        data-nodetype={nodeType}
        data-keypath={keyPath[0]}
        aria-label={keyPath[0]?.toString()}
        className={className}
      >
        {children}
      </li>
    );
  } else {
    return (
      <li
        role="treeitem"
        data-nodetype={nodeType}
        data-keypath={keyPath[0]}
        aria-label={keyPath[0]?.toString()}
        className={className}
      >
        {children}
      </li>
    );
  }
};
