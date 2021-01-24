import React, { HTMLAttributes } from 'react';
import { Box, IBoxProps } from '@semcore/flex-box';
import { createBaseComponent, Merge } from '@semcore/core';

function Head(props, ref) {
  return <Box ref={ref} tag="thead" {...props} />;
}

Head.displayName = 'Head';

export default createBaseComponent<Merge<IBoxProps, HTMLAttributes<HTMLTableSectionElement>>>(Head);
