import { Box } from '@semcore/ui/base-components';
import type { NSLimitsUsageMeter } from '@semcore/ui/limits';
import { UsageMeter } from '@semcore/ui/limits';
import React from 'react';

const Demo = (props: NSLimitsUsageMeter.Props) => {
  const { theme } = props;

  return (
    <Box {...(theme === 'invert' && { bg: 'black' })} p={3}>
      <UsageMeter {...props} />
    </Box>
  );
};

export const defaultProps: NSLimitsUsageMeter.Props = {
  min: undefined,
  max: undefined,
  theme: undefined,
  value: 10,
  feature: 'Audit',
};

export default Demo;
