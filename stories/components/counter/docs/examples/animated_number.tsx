import Button from '@semcore/button';
import { AnimatedNumber } from '@semcore/counter';
import React from 'react';

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
