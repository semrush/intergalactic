import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Button from '@semcore/button';
import WarningM from '@semcore/icon/Warning/m';
import ReloadM from '@semcore/icon/Reload/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='--intergalactic-icon-primary-warning' />,
      action: (
        <Button theme='invert' addonLeft={ReloadM}>
          Reload the page
        </Button>
      ),
      initialAnimation: true,
      duration: 0,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show failure notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
