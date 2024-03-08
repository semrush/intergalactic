import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from 'intergalactic/notice-bubble';
import Button from 'intergalactic/button';
import Spin from 'intergalactic/spin';
import { Flex } from 'intergalactic/flex-box';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: (
        <Flex justifyContent='center' gap={1}>
          <Spin size='xs' />
          Loading...
        </Flex>
      ),
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show notice with centered spinner</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
