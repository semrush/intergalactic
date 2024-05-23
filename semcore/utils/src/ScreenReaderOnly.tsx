import React from 'react';

export const ScreenReaderOnly = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}
    />
  );
};
ScreenReaderOnly.displayName = 'ScreenReaderOnlyRoot';
