import React from 'react';
import Button from 'intergalactic/button';
import Spin from 'intergalactic/spin';

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
