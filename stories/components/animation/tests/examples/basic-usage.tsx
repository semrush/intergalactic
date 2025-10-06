import { Animation, FadeInOut, Transform } from '@semcore/ui/animation';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import React from 'react';

import stylePopper from './basic-usage.module.css';

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
          keyframes={[stylePopper.enter, stylePopper.exit]}
        >
          <Button>Duration 500</Button>
        </Animation>

        <Animation
          visible={true}
          duration={500}
          delay={500}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper.enter, stylePopper.exit]}
        >
          <Button>Duration 500 Delay 500</Button>
        </Animation>

        <Animation
          visible={false}
          duration={500}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper.enter, stylePopper.exit]}
        >
          <Button>Visible False</Button>
        </Animation>

        <Animation
          visible={true}
          duration={0}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper.enter, stylePopper.exit]}
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
          keyframes={[stylePopper.enter, stylePopper.exit]}
        >
          <Button>Fade Duration 500</Button>
        </FadeInOut>

        <FadeInOut
          visible={true}
          duration={500}
          delay={500}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper.enter, stylePopper.exit]}
        >
          <Button>Fade Duration 500 Delay 500</Button>
        </FadeInOut>

        <FadeInOut
          visible={true}
          duration={0}
          initialAnimation={true}
          timingFunction='ease-out'
          keyframes={[stylePopper.enter, stylePopper.exit]}
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
          keyframes={[stylePopper.enter, stylePopper.exit]}
        >
          <Button>Transform</Button>
        </Transform>
      </Flex>
    </>
  );
};

export default Demo;
