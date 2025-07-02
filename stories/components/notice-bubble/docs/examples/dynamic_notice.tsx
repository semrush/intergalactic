import { Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import ReloadM from '@semcore/icon/Reload/m';
import WarningM from '@semcore/icon/Warning/m';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Spin from '@semcore/spin';
import React from 'react';

const manager = new NoticeBubbleManager();

let notice: any = null;

const Demo = () => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
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
      onClose: () => {
        setTimeout(() => {
          openButtonRef.current?.focus();
        }, 300);
      },
    });
  };

  return (
    <>
      <Button onClick={handleClick} ref={openButtonRef}>
        Show dynamic notice
      </Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
