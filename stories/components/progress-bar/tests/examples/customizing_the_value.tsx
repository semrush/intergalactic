import { Box } from '@semcore/flex-box';
import ProgressBar from '@semcore/progress-bar';
import type { ValueProps } from '@semcore/progress-bar';
import React from 'react';

type ProgressBarExampleProps = ValueProps;
const Demo = (props: ProgressBarExampleProps) => {
  return (
    <Box style={{ backgroundColor: '#191B23' }} h={50}>

      <ProgressBar tabIndex={0} aria-label='Custom theme example'>
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
