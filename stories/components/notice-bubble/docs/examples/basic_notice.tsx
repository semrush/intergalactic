import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Button from '@semcore/button';
import Link from '@semcore/link';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    manager.add({
      children: (
        <>
          Link was moved to <Link href='#'>Cats from outer space group</Link>
        </>
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
        Show basic notice
      </Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
