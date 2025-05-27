import React from 'react';
import Button from '@semcore/button';
import Spin from '@semcore/spin';

const Demo = () => {
  return (
    <>
      <Button loading>Loading</Button>{' '}
      <Button disabled>
        <Button.Addon>
          <Spin size='xs' />
        </Button.Addon>
        <Button.Text>Loading</Button.Text>
      </Button>
    </>
  );
};

export default Demo;
