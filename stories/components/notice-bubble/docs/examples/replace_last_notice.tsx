import Button from '@semcore/ui/button';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import React from 'react';

type ReplaceLastNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };
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
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
