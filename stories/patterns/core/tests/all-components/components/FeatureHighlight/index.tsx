import Card from '@semcore/ui/card';
import React from 'react';

import AllFHControls from '../../../../../../components/feature-highlight/advanced/examples/all-controls';

export function FeatureHighlight() {
  return (
    <Card mt={8}>
      <Card.Body>
        <AllFHControls />
      </Card.Body>
    </Card>
  );
}
