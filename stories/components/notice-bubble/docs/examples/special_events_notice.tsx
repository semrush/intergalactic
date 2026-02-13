import MailSent from '@semcore/illustration/MailSent';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import React from 'react';

type SpecialEventsNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();

const Demo = (props: SpecialEventsNoticeBubbleProps) => {
  const handleClick = () => {
    manager.add({
      children: (
        <Flex gap={4}>
          <MailSent style={{ flexShrink: 0 }} />
          Your post is on its way, and we will take great care of it!
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
      <Button onClick={handleClick}>Show special event notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

export const defaultProps: SpecialEventsNoticeBubbleProps = {
  initialAnimation: true,
  duration: 10000,
  type: 'info',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
