import React from 'react';
import NeighborLocation from '@semcore/neighbor-location';

function CustomComponent({ neighborLocation }) {
  return <div>{neighborLocation}</div>;
}

const Demo = () => {
  return (
    <NeighborLocation>
      <NeighborLocation.Detect>
        {(neighborLocation) => <div>{neighborLocation}</div>}
      </NeighborLocation.Detect>
      <NeighborLocation.Detect>
        {(neighborLocation) => <div>{neighborLocation}</div>}
      </NeighborLocation.Detect>
      <NeighborLocation.Detect>
        <CustomComponent />
      </NeighborLocation.Detect>
    </NeighborLocation>
  );
};

export default Demo;
