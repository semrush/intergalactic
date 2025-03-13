import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Button from '@semcore/button';
import ReloadM from '@semcore/icon/Reload/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    manager.add({
      children: 'Server connection lost. Check your internet connection and reload the page.',
      action: (
        <Button theme='invert' addonLeft={ReloadM}>
          Reload the page
        </Button>
      ),
      type: 'warning',
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
        Show no connection notice with action
      </Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
