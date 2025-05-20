import React from 'react';
import Spin from '@semcore/spin';

const Demo = () => {
  return (
    <div style={{ background: '#979797', width: 200 }} >
    <Spin theme='dark' />
    <Spin theme='invert' />
  </div>
  );
};

export default Demo;
