import { Box } from '@semcore/ui/base-components';
import type { NSLimitsUsageMeter } from '@semcore/ui/limits';
import { UsageMeter } from '@semcore/ui/limits';
import React from 'react';

type DemoProps = NSLimitsUsageMeter.Props & { w?: number };

const Demo = (props: DemoProps) => {
  const { theme, w, ...meterProps } = props;

  return (
    <Box {...(theme === 'invert' && { bg: 'black' })} p={3}>
      <Box w={w}>
        <UsageMeter {...meterProps} theme={theme} data-testid='usage-meter' />
      </Box>
    </Box>
  );
};

export const defaultProps: DemoProps = {
  min: undefined,
  max: undefined,
  theme: undefined,
  locale: undefined,
  w: undefined,
  value: 10,
  feature: 'Audit',
};

export default Demo;
