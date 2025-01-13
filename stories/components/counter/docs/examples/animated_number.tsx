import React from 'react';
import { AnimatedNumber } from '@semcore/counter';
import Button from '@semcore/button';

const Demo = () => {
  const [value, setValue] = React.useState(20);
  const handleClick = () => {
    setValue(value + 20);
  };

  return (
    <>
      <AnimatedNumber value={value} />
      <Button onClick={handleClick} mt={2}>
        Rerender value
      </Button>
    </>
  );
};

export default Demo;
