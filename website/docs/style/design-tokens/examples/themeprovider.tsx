import React from 'react';
import Button from '@semcore/button';
import { ThemeProvider } from '@semcore/core/lib/utils/ThemeProvider';

const violetPrimaryControlTheme = {
  '--intergalactic-control-primary-info': '#8649e1',
  '--intergalactic-control-primary-info-hover': '#5925ab',
  '--intergalactic-control-primary-info-active': '#5925ab',
};
const grayPrimaryControlTheme = {
  '--intergalactic-control-primary-info': '#6c6e79',
  '--intergalactic-control-primary-info-hover': '#484a54',
  '--intergalactic-control-primary-info-active': '#2b2e38',
};

const Demo = () => {
  return (
    <>
      <ThemeProvider tokens={violetPrimaryControlTheme}>
        <Button use='primary'>Violet primary control theme</Button>
      </ThemeProvider>
      <br />
      <br />
      <ThemeProvider tokens={grayPrimaryControlTheme}>
        <Button use='primary'>Gray primary control theme</Button>
      </ThemeProvider>
    </>
  );
};

export default Demo;
