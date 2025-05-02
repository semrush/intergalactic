import React from 'react';
import Divider from '@semcore/divider';

const Demo = () => {
    return (
<>
        <div style={{ display: 'flex', alignItems: 'center', width: 100, height: 20 }}>
          <div style={{ width: '50%', height: 20, background: 'yellow' }} />
          <Divider orientation='vertical' />
          <div style={{ width: '50%', height: 20, background: 'yellow' }} />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 100 }}
        >
          <div style={{ height: '20px', background: 'blue' }} />
          <Divider orientation='horizontal' />
          <div style={{ height: '20px', background: 'blue' }} />
        </div>
        </>
    );
};

export default Demo;
