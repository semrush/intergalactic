import { Box } from '@semcore/ui/base-components';
import ProgressBar from '@semcore/ui/progress-bar';
import type { NSProgressBar } from '@semcore/ui/progress-bar';
import React from 'react';

type ProgressBarExampleProps = NSProgressBar.Value.Props;
const Demo = (props: ProgressBarExampleProps) => {
  return (
    <Box>

      <ProgressBar tabIndex={0} aria-label='Custom theme example' size={props.size}>
        <ProgressBar.Value value={props.value} size={props.size} theme={props.theme} duration={props.duration} />
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
