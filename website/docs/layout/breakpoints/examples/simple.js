import React, { useContext } from 'react';
import Breakpoints from '@semcore/breakpoints';
import Button from '@semcore/button';

function Demo() {
  const index = useContext(Breakpoints.Context);

  return <Button size={['m', 'xl'][index]}>Button size {['M', 'XL'][index]}</Button>;
}

export default () => {
  return (
    <Breakpoints>
      <Demo />
    </Breakpoints>
  );
};
