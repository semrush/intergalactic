import { Box } from '@semcore/ui/flex-box';
import ProgressBar from '@semcore/ui/progress-bar';
import type { NSProgressBar } from '@semcore/ui/progress-bar';
import React from 'react';

type ProgressBarExampleProps = NSProgressBar.Props;
const Demo = (props: ProgressBarExampleProps) => {
  return (
    <Box style={{ backgroundColor: '#191B23' }} h={50}>

      <ProgressBar tabIndex={0} value={props.value} size={props.size} theme={props.theme} aria-label='Custom theme example' duration={props.duration}>
      </ProgressBar>

    </Box>
  );
};

export const defaultProps: ProgressBarExampleProps = {
  size: 'm',
  value: 80,
  theme: undefined,
  duration: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
