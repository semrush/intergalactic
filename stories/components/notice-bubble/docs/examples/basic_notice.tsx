import Button from '@semcore/button';
import Link from '@semcore/link';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import React from 'react';
type BaseNoticeBubbleProps = { initialAnimation: any; duration: any; type: any; focusLock: any };

const manager = new NoticeBubbleManager();

const Demo = (props: BaseNoticeBubbleProps) => {
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
        setTimeout(() => {
          openButtonRef.current?.focus();
        }, 300);
      },
    });
  };

  return (
    <>
      <Button onClick={handleClick} ref={openButtonRef}>
        Show basic notice
      </Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export const defaultProps: BaseNoticeBubbleProps = {
  initialAnimation: true,
  duration: 0,
  type: 'info',
  focusLock: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
