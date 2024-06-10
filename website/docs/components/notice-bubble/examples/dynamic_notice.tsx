import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from 'intergalactic/notice-bubble';
import Button from 'intergalactic/button';
import WarningM from 'intergalactic/icon/Warning/m';
import ReloadM from 'intergalactic/icon/Reload/m';
import Spin from 'intergalactic/spin';
import { Flex } from 'intergalactic/flex-box';

const manager = new NoticeBubbleManager();

let notice = null;

const Demo = () => {
  const tryAgain = async () => {
    if (!notice) return;
    notice.update({
      icon: null,
      children: (
        <Flex justifyContent='center' gap={1}>
          <Spin size='xs' theme='invert' />
          Loading...
        </Flex>
      ),
      action: null,
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    notice.update({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='--intergalactic-icon-primary-warning' />,
      action: (
        <Button theme='invert' onClick={tryAgain} addonLeft={ReloadM}>
          Try again
        </Button>
      ),
    });
  };
  const handleClick = async () => {
    if (notice) {
      notice.remove();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    notice = manager.add({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='--intergalactic-icon-primary-warning' />,
      action: (
        <Button theme='invert' onClick={tryAgain} addonLeft={ReloadM}>
          Try again
        </Button>
      ),
      initialAnimation: true,
      duration: 20000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show dynamic notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
