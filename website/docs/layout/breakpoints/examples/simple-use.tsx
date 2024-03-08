import React from 'react';
import Breakpoints from 'intergalactic/breakpoints';
import Button from 'intergalactic/button';

const buttonSizes = ['m', 'l'] as const;

const Example = () => {
  const index = React.useContext(Breakpoints.Context);

  return <Button size={buttonSizes[index]}>Button size {buttonSizes[index]}</Button>;
};

const Demo = () => {
  return (
    <Breakpoints>
      <Example />
    </Breakpoints>
  );
};

export default Demo;
