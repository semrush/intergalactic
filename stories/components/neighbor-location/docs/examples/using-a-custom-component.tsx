import React from 'react';
import NeighborLocation from '@semcore/neighbor-location';

const CustomComponent: React.FC<{ neighborLocation?: string }> = ({ neighborLocation }) => {
  return <span>{neighborLocation}</span>;
};

const Demo = () => {
  return (
    <NeighborLocation>
      <NeighborLocation.Detect>
        {(neighborLocation) => <span>{neighborLocation}</span>}
      </NeighborLocation.Detect>
      <NeighborLocation.Detect>
        {(neighborLocation) => <span> | {neighborLocation} | </span>}
      </NeighborLocation.Detect>
      <NeighborLocation.Detect>
        <CustomComponent />
      </NeighborLocation.Detect>
    </NeighborLocation>
  );
};

export default Demo;
