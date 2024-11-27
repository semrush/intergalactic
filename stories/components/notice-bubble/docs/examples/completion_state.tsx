import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import CheckM from '@semcore/icon/Check/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: (
        <Flex justifyContent='center' alignItems='center' gap={1}>
          <CheckM color='--intergalactic-icon-primary-success' />
          Undone
        </Flex>
      ),
      initialAnimation: true,
      duration: 4000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show notice with completion state</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
