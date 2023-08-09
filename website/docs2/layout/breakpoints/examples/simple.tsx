import React, { useContext } from 'react';
import Breakpoints from '@semcore/ui/breakpoints';
import Button from '@semcore/ui/button';

const buttonSizes = ['m', 'l'] as const;

const Demo = () => {
  const index = useContext(Breakpoints.Context);

  return <Button size={buttonSizes[index]}>Button size {buttonSizes[index]}</Button>;
};

export default () => {
  return (
    <Breakpoints>
      <Demo />
    </Breakpoints>
  );
};
