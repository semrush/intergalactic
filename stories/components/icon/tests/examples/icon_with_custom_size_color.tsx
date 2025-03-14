import React from 'react';
import '@semcore/core/lib/theme/themes/default.css';
import Icon from '@semcore/icon';

const Demo = () => {
  return (
    <>
      <div style={{ display: 'flex', width: '100px' }}>
        <Icon
          width={22}
          height={22}
          viewBox='0 0 22 22'
          color='green'
          aria-label='icon with size 22'
        >
          <polygon points='18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473' />
        </Icon>
        <p>lorem lorem lorem lorem </p>
      </div>

      <div style={{ display: 'flex', width: '100px' }}>
        <Icon
          width={55}
          height={55}
          viewBox='0 0 55 55'
          color='green'
          aria-label='icon with size 55'
        >
          <polygon points='22.532 5 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473' />
        </Icon>
        <p>lorem lorem lorem lorem </p>
      </div>
    </>
  );
};

export default Demo;
