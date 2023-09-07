import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import Spin from '@semcore/ui/spin';
import { Flex } from '@semcore/ui/flex-box';

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
