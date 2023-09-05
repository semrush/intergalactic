import React from 'react';
import ProgressBar from '@semcore/ui/progress-bar';

const Demo = () => {
  return (
    <ProgressBar value={80} theme='#EDD9FF' aria-label='Email processing'>
      <ProgressBar.Value theme='violet' />
    </ProgressBar>
  );
};
