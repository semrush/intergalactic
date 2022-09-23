import React from 'react';
import NeighborLocation, { NEIGHBOR_LOCATION_AUTO_DETECT } from '@semcore/neighbor-location';

function CustomComponent({ neighborLocation }) {
  return neighborLocation;
}

CustomComponent[NEIGHBOR_LOCATION_AUTO_DETECT] = true;

const Demo = () => {
  return (
    <NeighborLocation>
      <CustomComponent />
      <CustomComponent />
      <CustomComponent />
    </NeighborLocation>
  );
};

export default Demo;
