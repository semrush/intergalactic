import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from 'intergalactic/notice-bubble';
import Button from 'intergalactic/button';
import ReloadM from 'intergalactic/icon/Reload/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    const { focus } = manager.add({
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
          if (document.activeElement === document.body) {
            openButtonRef.current?.focus();
          }
        }, 500);
      },
    });
    focus();
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
