import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from 'intergalactic/notice-bubble';
import Button from 'intergalactic/button';
import { Flex } from 'intergalactic/flex-box';
import CheckM from 'intergalactic/icon/Check/m';

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
