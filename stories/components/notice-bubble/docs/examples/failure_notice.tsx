import ReloadM from '@semcore/icon/Reload/m';
import WarningM from '@semcore/icon/Warning/m';
import Button from '@semcore/ui/button';
import { lastInteraction } from '@semcore/ui/core';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import React from 'react';
type FailtureNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();

const Demo = (props: FailtureNoticeBubbleProps) => {
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
        Show failure notice
      </Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export const defaultProps: FailtureNoticeBubbleProps = {
  initialAnimation: true,
  duration: 0,
  type: 'info',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
