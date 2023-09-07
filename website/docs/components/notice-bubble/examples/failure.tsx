import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import WarningM from '@semcore/ui/icon/Warning/m';
import ReloadM from '@semcore/ui/icon/Reload/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='orange-400' />,
      action: (
        <Button theme='invert'>
          <Button.Addon>
            <ReloadM />
          </Button.Addon>
          <Button.Text>Reload the page</Button.Text>
        </Button>
      ),
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show failure notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};
export default Demo;
