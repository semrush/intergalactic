import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from 'intergalactic/notice-bubble';
import Button from 'intergalactic/button';
import Link from 'intergalactic/link';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    const { focus } = manager.add({
      children: (
        <>
          Link was moved to <Link href='#'>Cats from outer space group</Link>
        </>
      ),
      action: <Button theme='invert'>Undo</Button>,
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
        Show notice with undo action
      </Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
