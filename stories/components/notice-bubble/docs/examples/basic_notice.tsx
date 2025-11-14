import Button from '@semcore/ui/button';
import Link from '@semcore/ui/link';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import React from 'react';
type BaseNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();
const manager2 = new NoticeBubbleManager();

const Demo = (props: BaseNoticeBubbleProps) => {
  const ref = React.useRef(null);
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const openButtonRef2 = React.useRef<HTMLButtonElement>(null);
  const replaceButtonRef = React.useRef<HTMLButtonElement>(null);
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

  const handleClick2 = () => {
    manager2.add({
      children: (
        <>
          Link2 was moved to
          {' '}
          <Link href='#'>Cats2 from outer space group</Link>
        </>
      ),
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
      onClose: () => {
        setTimeout(() => {
          openButtonRef2.current?.focus();
        }, 300);
      },
    });
  };

  const handleClickReplace2 = () => {
    manager2.replaceLast({
      children: (
        <>
          This is notice about replace!
        </>
      ),
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
      onClose: () => {
        setTimeout(() => {
          openButtonRef2.current?.focus();
        }, 300);
      },
    });
  };

  return (
    <>
      <Button onClick={handleClick} ref={openButtonRef}>
        Show basic notice
      </Button>
      <Button onClick={handleClick2} ref={openButtonRef2}>
        Show basic notice2
      </Button>
      <Button onClick={handleClickReplace2} ref={replaceButtonRef}>
        replace last in 2
      </Button>
      <NoticeBubbleContainer manager={manager} containerNode={ref} />
      <NoticeBubbleContainer manager={manager2} containerNode={ref} />

      <div ref={ref} style={{ position: 'fixed', right: '20px', top: '20px', width: '300px', background: 'green' }} />
    </>
  );
};

export const defaultProps: BaseNoticeBubbleProps = {
  initialAnimation: true,
  duration: 0,
  type: 'info',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
