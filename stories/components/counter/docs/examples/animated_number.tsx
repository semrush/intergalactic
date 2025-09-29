import Button from '@semcore/ui/button';
import { AnimatedNumber } from '@semcore/ui/counter';
import React from 'react';

type AnimatedNumberBaseProps = { duration?: number; delay?: number };
const Demo = (props: AnimatedNumberBaseProps) => {
  const [value, setValue] = React.useState(20);
  const handleClick = () => {
    setValue(value + 20);
  };

  return (
    <>
      <AnimatedNumber value={value} duration={props.duration} delay={props.delay} />
      <Button onClick={handleClick} mt={2}>
        Rerender value
      </Button>
    </>
  );
};

export const defaultProps: AnimatedNumberBaseProps = {
  duration: undefined,
  delay: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
