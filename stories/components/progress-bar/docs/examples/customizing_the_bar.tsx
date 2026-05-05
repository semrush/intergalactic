import ProgressBar from '@semcore/ui/progress-bar';
import type { NSProgressBar } from '@semcore/ui/progress-bar';
import React from 'react';

type ProgressBarExampleProps = NSProgressBar.Props;
const Demo = (props: ProgressBarExampleProps) => {
  return (
    <ProgressBar tabIndex={0} value={props.value} size={props.size} theme={props.theme} aria-label='Custom theme example' duration={props.duration}>
      <ProgressBar.Value theme='violet-500' />
    </ProgressBar>
  );
};

export const defaultProps: ProgressBarExampleProps = {
  size: 'm',
  value: 80,
  theme: 'violet-100',
  duration: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
