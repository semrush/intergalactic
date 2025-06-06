import ProgressBar from '@semcore/progress-bar';
import React from 'react';

const Demo = () => {
  return (
    <ProgressBar tabIndex={0} value={80} theme='violet-100' aria-label='Custom theme example'>
      <ProgressBar.Value theme='violet-500' />
    </ProgressBar>
  );
};

export default Demo;
