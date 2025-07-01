import { defaultBreakpoints as Breakpoints } from '@semcore/base-components';
import Button from '@semcore/button';
import React from 'react';

const Demo = () => {
  const [index, setIndex] = React.useState(Breakpoints.mediaList.matches());

  React.useEffect(() => {
    const unsubscribe = Breakpoints.mediaList.addListener((index: number) => {
      setIndex(index);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Button size={(['m', 'l'] as const)[index]}>
      Size
      {['M', 'L'][index]}
    </Button>
  );
};

export default Demo;
