import ReloadM from '@semcore/icon/Reload/m';
import WarningM from '@semcore/icon/Warning/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { lastInteraction } from '@semcore/ui/core';
import type { AddedNoticeMeta } from '@semcore/ui/notice-bubble';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Spin from '@semcore/ui/spin';
import React from 'react';
type DynamicNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();

let notice: AddedNoticeMeta | null = null;

const Demo = (props: DynamicNoticeBubbleProps) => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const tryAgain = async () => {
    if (!notice) return;
    notice = await notice.update({
      icon: undefined,
      children: (
        <Flex justifyContent='center' alignItems='center' gap={1.5}>
          <Spin size='xs' theme='invert' />
          Loading...
        </Flex>
      ),
      action: null,
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    notice = await notice.update({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='--intergalactic-icon-primary-warning' />,
      action: (
        <Button theme='invert' onClick={tryAgain} addonLeft={ReloadM}>
          Try again
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
      icon: <WarningM color='--intergalactic-icon-primary-warning' />,
      action: (
        <Button theme='invert' onClick={tryAgain} addonLeft={ReloadM}>
          Try again
        </Button>
      ),
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
      onClose: () => {
        if (lastInteraction.isKeyboard()) {
          setTimeout(() => {
            openButtonRef.current?.focus();
          }, 300);
        }
      },
    });
  };

  return (
    <>
      <Button onClick={handleClick} ref={openButtonRef}>
        Show dynamic notice
      </Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export const defaultProps: DynamicNoticeBubbleProps = {
  initialAnimation: true,
  duration: 20000,
  type: 'info',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
