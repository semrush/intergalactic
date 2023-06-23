import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import WarningM from '@semcore/ui/icon/Warning/m';
import ReloadM from '@semcore/ui/icon/Reload/m';
import Spin from '@semcore/ui/spin';
const manager = new NoticeBubbleManager();

let notice = null;

const Demo = () => {
  const tryAgain = async () => {
    if (!notice) return;
    notice.update({
      icon: <Spin size='xs' />,
      children: 'Loading...',
      action: null,
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    notice.update({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='orange-400' />,
      action: (
        <Button theme='invert' onClick={tryAgain}>
          <Button.Addon>
            <ReloadM />
          </Button.Addon>
          <Button.Text>Try again</Button.Text>
        </Button>
      ),
    });
  };
  const handleClick = async () => {
    if (notice) {
      notice.remove();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    notice = manager.add({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='orange-400' />,
      action: (
        <Button theme='invert' onClick={tryAgain}>
          <Button.Addon>
            <ReloadM />
          </Button.Addon>
          <Button.Text>Try again</Button.Text>
        </Button>
      ),
      initialAnimation: true,
      duration: 20000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show dynamic notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};
export default Demo;
