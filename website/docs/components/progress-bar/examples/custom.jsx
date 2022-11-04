import React from 'react';
import ProgressBar from '@semcore/ui/progress-bar';

const Demo = () => {
  return (
    <ProgressBar value={80} theme="#f8b2b2">
      <ProgressBar.Value theme="denim-blue" />
    </ProgressBar>
  );
};

export default Demo;
