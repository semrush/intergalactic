import CheckM from '@semcore/icon/Check/m';
import Button from '@semcore/ui/button';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import React from 'react';
type SuccessNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();

const Demo = (props: SuccessNoticeBubbleProps) => {
  const handleClick = () => {
    manager.add({
      icon: <CheckM color='--intergalactic-icon-primary-success' />,
      children: 'Keyword was successfully moved to Keyword Analyzer!',
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show success notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export const defaultProps: SuccessNoticeBubbleProps = {
  initialAnimation: true,
  duration: 5000,
  type: 'info',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
