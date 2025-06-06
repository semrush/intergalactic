import Button from '@semcore/button';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import React from 'react';

const manager = new NoticeBubbleManager();

let counter = 0;

const Demo = () => {
  const handleClick = () => {
    counter++;

    manager.replaceLast({
      children: `Link ${counter} was moved to "Cats from outer space"`,
      initialAnimation: true,
      duration: 0,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show basic notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
