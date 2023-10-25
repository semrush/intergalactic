import React from 'react';
import ProgressBar from '@semcore/ui/progress-bar';

const Demo = () => {
  return (
    <ProgressBar value={80} theme='violet-100' aria-label='Email processing'>
      <ProgressBar.Value theme='violet-500' />
    </ProgressBar>
  );
};

export default Demo;
