import Button from '@semcore/button';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Spin from '@semcore/spin';
import React from 'react';
type NoConnectionNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();

const Demo = (props: NoConnectionNoticeBubbleProps) => {
  const handleClick = () => {
    manager.add({
      icon: <Spin size='xs' theme='invert' />,
      children: 'Server connection lost. Reconnecting...',
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show no connection notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export const defaultProps: NoConnectionNoticeBubbleProps = {
  initialAnimation: true,
  duration: 10000,
  type: 'warning',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
