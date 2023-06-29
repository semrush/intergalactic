import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import Link from '@semcore/ui/link';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: (
        <>
          Link was moved to <Link href='#'>Cats from outer space group</Link>
        </>
      ),
      action: <Button theme='invert'>Undo</Button>,
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show notice with action button</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};
export default Demo;
