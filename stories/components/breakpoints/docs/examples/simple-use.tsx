import Breakpoints from '@semcore/breakpoints';
import Button from '@semcore/button';
import React from 'react';

const buttonSizes = ['m', 'l'] as const;

const Example = () => {
  const index = React.useContext(Breakpoints.Context);
  const size = index !== undefined ? buttonSizes[index] : 'm';

  return (
    <Button size={size}>
      Size
      {' '}
      {size.toUpperCase()}
    </Button>
  );
};

const Demo = () => {
  return (
    <Breakpoints>
      <Example />
    </Breakpoints>
  );
};

export default Demo;
