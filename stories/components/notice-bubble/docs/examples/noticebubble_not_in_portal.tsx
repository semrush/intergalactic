import Button from '@semcore/button';
import Link from '@semcore/link';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import React from 'react';
type NotInPortalNoticeBubbleProps = { initialAnimation: any; duration: any; type: any; focusLock: any };

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
        setTimeout(() => {
          openButtonRef.current?.focus();
        }, 300);
      },
    });
  };

  return (
    <div
      style={{ border: '1px dashed #eee', height: '180px', position: 'relative', overflow: 'auto' }}
    >
      <div style={{ height: '800px' }}>
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
  focusLock: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
