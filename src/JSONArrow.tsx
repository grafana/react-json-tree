import React from 'react';

interface Props {
  arrowStyle?: 'single' | 'double';
  expanded: boolean;
  nodeType: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function JSONArrow({
  arrowStyle = 'single',
  expanded,
  nodeType,
  onClick,
}: Props) {
  return (
    <div className={'arrowContainer'} onClick={onClick}>
      <div className={`arrow arrow--node-type-${nodeType} arrow--expanded-${expanded} arrow--arrow-style-${arrowStyle}`}>
        {/* @todo let implementer define custom arrow object */}
        {'\u25B6'}
        {arrowStyle === 'double' && (
          <div className={'arrow__inner'}>{'\u25B6'}</div>
        )}
      </div>
    </div>
  );
}
