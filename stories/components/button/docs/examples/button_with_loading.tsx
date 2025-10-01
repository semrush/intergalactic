import Button from '@semcore/ui/button';
import Spin from '@semcore/ui/spin';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Button loading>Loading</Button>
      {' '}
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
