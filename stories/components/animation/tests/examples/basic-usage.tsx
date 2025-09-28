import { Animation, Collapse, FadeInOut, Transform, Slide } from '@semcore/ui/animation';
import Button from '@semcore/ui/button';
import { sstyled } from '@semcore/ui/core';
import { Flex } from '@semcore/ui/flex-box';
import React from 'react';

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
      <Flex columnGap={2} scaleIndent={10} pb={4}>
        <div>Animation cases</div>
        <Animation
          visible={true}
          duration={500}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
        >
          <Button>Duration 500</Button>
        </Animation>

        <Animation
          visible={true}
          duration={500}
          delay={500}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
        >
          <Button>Duration 500 Delay 500</Button>
        </Animation>

        <Animation
          visible={false}
          duration={500}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
        >
          <Button>Visible False</Button>
        </Animation>

        <Animation
          visible={true}
          duration={0}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
        >
          <Button>Duration 0</Button>
        </Animation>
      </Flex>

      <Flex columnGap={2} scaleIndent={10} pb={4}>
        <div>Fade In out cases</div>
        <FadeInOut
          visible={true}
          duration={500}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
        >
          <Button>Fade Duration 500</Button>
        </FadeInOut>

        <FadeInOut
          visible={true}
          duration={500}
          delay={500}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
        >
          <Button>Fade Duration 500 Delay 500</Button>
        </FadeInOut>

        <FadeInOut
          visible={true}
          duration={0}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
        >
          <Button>Fade Duration 0</Button>
        </FadeInOut>
      </Flex>

      <Flex columnGap={2} scaleIndent={10}>
        <div>Transform</div>

        <Transform
          visible={true}
          duration={500}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
        >
          <Button>Transform</Button>
        </Transform>
      </Flex>
    </>
  );
};

export default Demo;
