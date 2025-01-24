import React from 'react';
import Breakpoints from '@semcore/breakpoints';
import Button from '@semcore/button';

const Demo = () => {
  const [index, setIndex] = React.useState(Breakpoints.mediaList.matches());

  React.useEffect(() => {
    const unsubscribe = Breakpoints.mediaList.addListener((index) => {
      setIndex(index);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <Button size={(['m', 'l'] as const)[index]}>Button size {['M', 'L'][index]}</Button>;
};

export default Demo;
