import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from 'intergalactic/notice-bubble';
import Button from 'intergalactic/button';
import Link from 'intergalactic/link';

const manager = new NoticeBubbleManager();

const Demo = () => {
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
    });
    focus();
  };

  return (
    <>
      <Button onClick={handleClick}>Show notice with undo action</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
