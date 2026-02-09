import CheckM from '@semcore/icon/Check/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import React from 'react';
type CompletionNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();

const Demo = (props: CompletionNoticeBubbleProps) => {
  const handleClick = () => {
    manager.add({
      children: (
        <Flex justifyContent='center' alignItems='center' gap={1}>
          <CheckM color='--intergalactic-icon-primary-success' />
          Undone
        </Flex>
      ),
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show notice with completion state</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export const defaultProps: CompletionNoticeBubbleProps = {
  initialAnimation: true,
  duration: 4000,
  type: 'info',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
