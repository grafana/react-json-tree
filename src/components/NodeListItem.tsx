import React from "react";
import { KeyPath } from "../main.ts";

interface ListItemProps {
  expanded: boolean;
  noteType: string;
  keyPath: KeyPath;
  className: string;
}

export const NodeListItem = ({
  children,
  expanded,
  expandable,
  nodeType,
  keyPath,
  className,
}: ListItemProps) => {
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
