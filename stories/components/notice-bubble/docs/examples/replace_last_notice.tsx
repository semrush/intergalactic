import Button from '@semcore/button';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import React from 'react';

type ReplaceLastNoticeBubbleProps = { initialAnimation: any; duration: any; type: any; focusLock: any };
let counter = 0;

const manager = new NoticeBubbleManager();

const Demo = (props: ReplaceLastNoticeBubbleProps) => {
  const handleClick = () => {
    counter++;

    manager.replaceLast({
      children: `Link ${counter} was moved to "Cats from outer space"`,
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show basic notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export const defaultProps: ReplaceLastNoticeBubbleProps = {
  initialAnimation: true,
  duration: 0,
  type: 'info',
  focusLock: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
