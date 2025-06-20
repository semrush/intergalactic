import Button from '@semcore/button';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Spin from '@semcore/spin';
import React from 'react';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      icon: <Spin size='xs' theme='invert' />,
      children: 'Server connection lost. Reconnecting...',
      type: 'warning',
      initialAnimation: true,
      duration: 10000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show no connection notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
