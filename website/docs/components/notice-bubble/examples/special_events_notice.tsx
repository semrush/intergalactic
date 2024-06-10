import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from 'intergalactic/notice-bubble';
import Button from 'intergalactic/button';
import MailSent from 'intergalactic/illustration/MailSent';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: 'Your post is on its way, and we will take great care of it!',
      icon: <MailSent />,
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
