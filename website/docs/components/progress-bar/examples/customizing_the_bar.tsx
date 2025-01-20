import React from 'react';
import ProgressBar from '@semcore/progress-bar';

const Demo = () => {
  return (
    <ProgressBar tabIndex={0} value={80} theme='violet-100' aria-label='Email processing'>
      <ProgressBar.Value theme='violet-500' />
    </ProgressBar>
  );
};

export default Demo;
