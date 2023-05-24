import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      icon: <CheckM color="green-400" />,
      children: 'Keyword was successfully moved to Keyword Analyzer!',
      initialAnimation: true,
      duration: 3000,
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
