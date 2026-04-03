import type { AnimationProps } from '@semcore/ui/base-components';
import { Flex, Animation, FadeInOut, Transform } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React from 'react';

import stylePopper from './basic-usage.module.css';

const Demo = (props: AnimationProps) => {
  return (
    <>
      <Flex columnGap={2} scaleIndent={10} pb={4}>
        <div>Animation cases</div>
        <Animation
          visible={props.visible}
          duration={props.duration}
          delay={props.delay}
          initialAnimation={props.initialAnimation}
          timingFunction={props.timingFunction}
          keyframes={[stylePopper.enter, stylePopper.exit]}
        >
          <Button>Animation</Button>
        </Animation>
      </Flex>

      <Flex columnGap={2} scaleIndent={10} pb={4}>
        <div>FadeInOut cases</div>
        <FadeInOut
          visible={props.visible}
          duration={props.duration}
          delay={props.delay}
          initialAnimation={props.initialAnimation}
          timingFunction={props.timingFunction}
          keyframes={[stylePopper.enter, stylePopper.exit]}
        >
          <Button>FadeInOut</Button>
        </FadeInOut>
      </Flex>

      <Flex columnGap={2} scaleIndent={10}>
        <div>Transform</div>

        <Transform
          visible={props.visible}
          duration={props.duration}
          delay={props.delay}
          initialAnimation={props.initialAnimation}
          timingFunction={props.timingFunction}
          keyframes={[stylePopper.enter, stylePopper.exit]}
        >
          <Button>Transform</Button>
        </Transform>
      </Flex>
    </>
  );
};

export const defaultAnimationProps: AnimationProps = {
  visible: true,
  duration: 500,
  initialAnimation: true,
  timingFunction: 'ease-out',
  delay: undefined,
};

Demo.defaultProps = defaultAnimationProps;

export default Demo;
