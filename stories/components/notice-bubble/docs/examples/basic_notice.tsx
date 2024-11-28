import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/notice-bubble';
import Button from '@semcore/button';
import Link from '@semcore/link';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: (
        <>
          Link was moved to <Link href='#'>Cats from outer space group</Link>
        </>
      ),
      initialAnimation: true,
      duration: 0,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show basic notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export default Demo;
