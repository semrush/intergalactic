import React from 'react';
import ProgressBar from '@semcore/ui/progress-bar';

const Demo = () => {
  return (
    <ProgressBar value={80} theme='#edd9ff' aria-label='Email processing'>
      <ProgressBar.Value theme='#ab6cfe' />
    </ProgressBar>
  );
};

export default Demo;
