import Button from '@semcore/ui/button';
import { lastInteraction } from '@semcore/ui/core';
import ReloadM from '@semcore/ui/icon/Reload/m';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import React from 'react';
type NoConnectionActionNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();

const Demo = (props: NoConnectionActionNoticeBubbleProps) => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    manager.add({
      children: 'Server connection lost. Check your internet connection and reload the page.',
      action: (
        <Button theme='invert' addonLeft={ReloadM}>
          Reload the page
        </Button>
      ),
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
      onClose: () => {
        if (lastInteraction.isKeyboard()) {
          setTimeout(() => {
            openButtonRef.current?.focus();
          }, 300);
        }
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

export const defaultProps: NoConnectionActionNoticeBubbleProps = {
  initialAnimation: true,
  duration: 0,
  type: 'warning',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
