import React from 'react';
import Button from '@semcore/button';
import { ThemeProvider } from '@semcore/utils/lib/ThemeProvider';

const violetPrimaryButtonTheme = {
  '--intergalactic-control-primary-info': '#8649e1',
  '--intergalactic-control-primary-info-hover': '#5925ab',
  '--intergalactic-control-primary-info-active': '#5925ab',
};
const grayPrimaryButtonTheme = {
  '--intergalactic-control-primary-info': '#6c6e79',
  '--intergalactic-control-primary-info-hover': '#484a54',
  '--intergalactic-control-primary-info-active': '#2b2e38',
};

const Demo = () => {
  return (
    <>
      <ThemeProvider tokens={violetPrimaryButtonTheme}>
        <Button use="primary">Violet primary button theme</Button>
      </ThemeProvider>
      <br />
      <br />
      <ThemeProvider tokens={grayPrimaryButtonTheme}>
        <Button use="primary">Gray primary button theme</Button>
      </ThemeProvider>
    </>
  );
};
export default Demo;
