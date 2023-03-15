import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import CheckM from '@semcore/ui/icon/Check/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: (
        <Flex justifyContent="center" alignItems="center" gap={1}>
          <CheckM color="green-400" />
          Undone
        </Flex>
      ),
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show notice with centered check mark</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};
export default Demo;
