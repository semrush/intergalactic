import { NeighborLocation } from '@semcore/ui/base-components';
import React from 'react';

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
        {(neighborLocation) => (
          <span>
            {' '}
            |
            {neighborLocation}
            {' '}
            |
            {' '}
          </span>
        )}
      </NeighborLocation.Detect>
      <NeighborLocation.Detect>
        <CustomComponent />
      </NeighborLocation.Detect>
    </NeighborLocation>
  );
};

export default Demo;
