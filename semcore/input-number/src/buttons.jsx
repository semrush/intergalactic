import React from 'react';

const svg = (orientation, width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
  >
    {orientation === 'up' ? (
      <path d={`M0,${height}l${height},-${height}l${height},${height}Z`} />
    ) : (
      <path d={`M0,0l${width},0l-${height},${height}Z`} />
    )}
  </svg>
);

export default {
  up: {
    l: svg('up', 10, 5),
    m: svg('up', 8, 4),
  },
  down: {
    l: svg('down', 10, 5),
    m: svg('down', 8, 4),
  },
};
