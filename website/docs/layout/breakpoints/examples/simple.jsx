import React, { useContext } from 'react';
import Breakpoints from '@semcore/ui/breakpoints';
import Button from '@semcore/ui/button';

function Demo() {
  const index = useContext(Breakpoints.Context);

  return <Button size={['m', 'l'][index]}>Button size {['M', 'L'][index]}</Button>;
}

export default () => {
  return (
    <Breakpoints>
      <Demo />
    </Breakpoints>
  );
};
