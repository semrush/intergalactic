import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Button from '@semcore/button';
import MailSent from '@semcore/illustration/MailSent';
import { Flex } from '@semcore/flex-box';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: (
        <Flex gap={4}>
          <MailSent style={{ flexShrink: 0 }} />
          Your post is on its way, and we will take great care of it!
        </Flex>
      ),
      initialAnimation: true,
      duration: 10000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show special event notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
