import React from 'react';
import { Box } from '@semcore/flex-box';
import { createBaseComponent } from '@semcore/core';

function Head(props, ref) {
  return <Box ref={ref} tag="thead" {...props} />;
}

Head.displayName = 'Head';

export default createBaseComponent(Head);
