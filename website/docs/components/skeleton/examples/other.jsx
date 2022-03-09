import React from 'react';
import Skeleton from '@semcore/skeleton';

const Demo = () => {
  return (
    <Skeleton>
      <circle cx="30" cy="30" r="30" />
      <rect x="70" y="0" rx="4" ry="4" width="20%" height="38" />
      <rect x="70" y="50" rx="4" ry="4" width="60%" height="8" />
      <rect x="0" y="70" rx="4" ry="4" height="250" width="100%" />
    </Skeleton>
  );
};

export default Demo;
