import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Button from '@semcore/button';
import Spin from '@semcore/spin';

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
