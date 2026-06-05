import Button from '@semcore/ui/button';
import { lastInteraction } from '@semcore/ui/core';
import Link from '@semcore/ui/link';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import React from 'react';
type NotInPortalNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();

const Demo = (props: NotInPortalNoticeBubbleProps) => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    manager.add({
      children: (
        <>
          Link was moved to
          {' '}
          <Link href='#'>Cats from outer space group</Link>
        </>
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
        };
      },
    });
  };

  return (
    <div
      style={{ border: '1px dashed var(--intergalactic-border-primary)', height: '180px', position: 'relative', overflow: 'auto' }}
    >
      <div style={{ height: '800px', overflow: 'hidden' }}>
        <NoticeBubbleContainer manager={manager} disablePortal={true} />
        <Button onClick={handleClick} m={5} ref={openButtonRef}>
          Show basic notice
        </Button>
      </div>
    </div>
  );
};

export const defaultProps: NotInPortalNoticeBubbleProps = {
  initialAnimation: true,
  duration: 300000,
  type: 'info',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
