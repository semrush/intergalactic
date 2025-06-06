import { Box } from '@semcore/flex-box';
import { createBaseComponent } from '@semcore/core';
import React from 'react';

function Head(props, ref) {
  return <Box ref={ref} tag='thead' {...props} />;
}

Head.displayName = 'Head';

export default createBaseComponent(Head);
