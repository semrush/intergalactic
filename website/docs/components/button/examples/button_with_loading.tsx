import React from 'react';
import Button from 'intergalactic/button';
import Spin from 'intergalactic/spin';

const Demo = () => {
  return (
    <>
      <Button loading>Some loading state</Button>{' '}
      <Button disabled>
        <Button.Addon>
          <Spin size='xs' />
        </Button.Addon>
        <Button.Text>Some loading state</Button.Text>
      </Button>
    </>
  );
};

export default Demo;
