import React from 'react';
import Button from '@semcore/button';
import { ThemeProvider } from '@semcore/utils/lib/ThemeProvider';

const redPrimaryButtonTheme = {
  '--intergalactic-control-primary-info': '#ff4953',
  '--intergalactic-control-primary-info-hover': '#d1002f',
  '--intergalactic-control-primary-info-active': '#d1002f',
};
const greenPrimaryButtonTheme = {
  '--intergalactic-control-primary-info': '#009f81',
  '--intergalactic-control-primary-info-hover': '#007c65',
  '--intergalactic-control-primary-info-active': '#007c65',
};

const Demo = () => {
  return (
    <>
      <ThemeProvider tokens={redPrimaryButtonTheme}>
        <Button use="primary">Red primary button theme</Button>
      </ThemeProvider>
      <br />
      <br />
      <ThemeProvider tokens={greenPrimaryButtonTheme}>
        <Button use="primary">Green primary button theme</Button>
      </ThemeProvider>
    </>
  );
};
export default Demo;
