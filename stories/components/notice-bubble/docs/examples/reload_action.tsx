import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Button from '@semcore/button';
import ReloadM from '@semcore/icon/Reload/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    manager.add({
      children: 'Data for 5 new profiles is ready. Please reload the page to view it.',
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
        Show notice with reload action
      </Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
