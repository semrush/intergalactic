import React, { useContext } from 'react';
import Breakpoints from '@semcore/ui/breakpoints';
import Button from '@semcore/ui/button';

const buttonSizes = ['m', 'l'] as const;

const Example = () => {
  const index = useContext(Breakpoints.Context);

  return <Button size={buttonSizes[index]}>Button size {buttonSizes[index]}</Button>;
};

export default () => {
  return (
    <Breakpoints>
      <Example />
    </Breakpoints>
  );
};
