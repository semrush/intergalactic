import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import ReloadM from '@semcore/ui/icon/Reload/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: 'Server connection lost. Check your internet connection and reload the page.',
      action: (
        <Button theme="invert">
          <Button.Addon>
            <ReloadM />
          </Button.Addon>
          <Button.Text>Reload the page</Button.Text>
        </Button>
      ),
      type: 'warning',
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show warning notice with action</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};
export default Demo;
