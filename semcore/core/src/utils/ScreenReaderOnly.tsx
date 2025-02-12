import React from 'react';

/**
 * @deprecated Use ScreenReaderOnly from 'flex-box' component
 */
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
        whiteSpace: 'nowrap',
        borderWidth: 0,
        left: -1,
        top: -1,
      }}
    />
  );
};
ScreenReaderOnly.displayName = 'ScreenReaderOnlyRoot';
