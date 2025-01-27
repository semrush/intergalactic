import React from 'react';
import { sstyled } from '@semcore/core';
import Button from '@semcore/button';
import { Animation } from '@semcore/animation';

const stylePopper = sstyled.css`
  @keyframes enter {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes exit {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-10px);
    }
  }
`;

const Demo = () => {
  return (
    <>
      <Animation
        visible={true}
        duration={500}
        initialAnimation={true}
        timingFunction='ease-out'
        keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
      >
        <Button>Button</Button>
      </Animation>
    </>
  );
};

export default Demo;