import React from "react";
import { areKeyPathsEqual, KeyPath } from "../main.ts";
import styles from "./NodeListItem.module.scss";

interface ListItemProps {
  expanded: boolean;
  expandable: boolean;
  nodeType: string;
  keyPath: KeyPath;
  className: string;
  children: React.ReactNode;
  scrollToPath?: KeyPath;
}

export const NodeListItem = ({
  children,
  expanded,
  expandable,
  nodeType,
  keyPath,
  className,
  scrollToPath,
}: ListItemProps) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const isScrollTo =
    scrollToPath !== undefined && areKeyPathsEqual(scrollToPath, keyPath);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  const optionalProps = isScrollTo ? { ref, "data-scrolled": "true" } : {};

  // aria-expanded is only wanted on elements that have expanded state, for un-expandable nodes we want to omit the attribute all together
  if (expandable) {
    return (
      <li
        role="treeitem"
        aria-expanded={expanded}
        data-nodetype={nodeType}
        data-keypath={keyPath[0]}
        aria-label={keyPath[0]?.toString()}
        className={`${className} ${isScrollTo ? styles.nodeListItemScrolled : ""}`}
        {...optionalProps}
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
        {...optionalProps}
      >
        {children}
      </li>
    );
  }
};
