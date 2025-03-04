import React from 'react';
interface Props {
    arrowStyle?: 'single' | 'double';
    expanded: boolean;
    nodeType: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}
export default function JSONArrow({ arrowStyle, expanded, nodeType, onClick, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
