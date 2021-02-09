import React, { useContext } from 'react';
import Breakpoints from '@semcore/breakpoints';
import Button from '@semcore/button';

function Demo() {
  const index = useContext(Breakpoints.Context);

  return <Button size={['s', 'xl'][index]}>Button size {['S', 'XL'][index]}</Button>;
}

export default () => {
  return (
    <Breakpoints>
      <Demo />
    </Breakpoints>
  );
};
