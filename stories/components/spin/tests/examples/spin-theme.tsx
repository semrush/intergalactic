import Spin from '@semcore/spin';
import React from 'react';

const Demo = () => {
  return (
    <div style={{ background: '#979797', width: 200 }}>
      <Spin theme='dark' />
      <Spin theme='invert' />
    </div>
  );
};

export default Demo;
