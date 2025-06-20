import Button from '@semcore/button';
import ReloadM from '@semcore/icon/Reload/m';
import WarningM from '@semcore/icon/Warning/m';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import React from 'react';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
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
        Show failure notice
      </Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
