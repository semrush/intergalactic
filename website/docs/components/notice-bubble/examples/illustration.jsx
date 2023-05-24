import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import MailSent from '@semcore/ui/illustration/MailSent';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: 'Your post is on the way – we will take care!',
      icon: <MailSent />,
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show illustrated notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};
export default Demo;
