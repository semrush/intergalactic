import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from 'intergalactic/notice-bubble';
import Button from 'intergalactic/button';
import CheckM from 'intergalactic/icon/Check/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      icon: <CheckM color='--intergalactic-icon-primary-success' />,
      children: 'Keyword was successfully moved to Keyword Analyzer!',
      initialAnimation: true,
      duration: 5000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show success notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
