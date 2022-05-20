import React from 'react';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';

const Demo = () => (
  <Box style={{ background: resolveColor('dark-red') }} p={5}>
    <Box style={{ color: resolveColor('gray96') }}>Oh, my eyes!</Box>
  </Box>
);

export default Demo;
