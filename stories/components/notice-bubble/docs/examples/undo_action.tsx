import Button from '@semcore/ui/button';
import { lastInteraction } from '@semcore/ui/core';
import Link from '@semcore/ui/link';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import React from 'react';
type UndoActionNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();

const Demo = (props: UndoActionNoticeBubbleProps) => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    manager.add({
      children: (
        <>
          Link was moved to
          {' '}
          <Link href='#' theme='invert'>Cats from outer space group</Link>
        </>
      ),
      action: <Button theme='invert'>Undo</Button>,
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
        Show notice with undo action
      </Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export const defaultProps: UndoActionNoticeBubbleProps = {
  initialAnimation: true,
  duration: 0,
  type: 'info',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
