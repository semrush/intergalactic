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
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <div style={{ background: '#eee', height: '180px', position: 'relative', overflow: 'auto' }}>
      <div style={{ height: '800px' }}>
        <NoticeBubbleContainer manager={manager} disablePortal={true} />{' '}
        {/* Should be before another content! */}
        <Button onClick={handleClick}>Show basic notice</Button>
      </div>
    </div>
  );
};
export default Demo;
