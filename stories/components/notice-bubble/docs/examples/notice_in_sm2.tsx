import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';
import Link from '@semcore/ui/link';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import React from 'react';
type BaseNoticeBubbleProps = { initialAnimation: boolean; duration: number; type: 'info' | 'warning'; focusLock: boolean };

const manager = new NoticeBubbleManager();
const manager2 = new NoticeBubbleManager();

const Demo = (props: BaseNoticeBubbleProps) => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const openButtonRef2 = React.useRef<HTMLButtonElement>(null);
  const replaceButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    manager.add({
      children: (
        <>
          Link was moved to
          {' '}
          <Link href='#'>Cats from outer space group</Link>
        </>
      ),
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
      onClose: () => {
        setTimeout(() => {
          openButtonRef.current?.focus();
        }, 300);
      },
    });
  };

  const handleClickSuccess = () => {
    manager2.add({
      icon: <CheckM color='--intergalactic-icon-primary-success' />,
      children: 'Keyword was successfully moved to Keyword Analyzer!',
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
      onClose: () => {
        setTimeout(() => {
          openButtonRef2.current?.focus();
        }, 300);
      },
    });
  };

  const handleClickReplace = () => {
    manager2.replaceLast({
      children: (
        <>
          This is notice about replace!
        </>
      ),
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
      onClose: () => {
        setTimeout(() => {
          openButtonRef2.current?.focus();
        }, 300);
      },
    });
  };

  // @ts-ignore - we don't have sm2 in our storybook environment
  const containerNode = window.sm2.getNoticeBubbleContainer();

  return (
    <>
      <Button onClick={handleClick} ref={openButtonRef}>
        Show basic notice
      </Button>
      <br />
      <br />
      <Button onClick={handleClickSuccess} ref={openButtonRef2}>
        Show success notice
      </Button>
      <Button onClick={handleClickReplace} ref={replaceButtonRef}>
        replace last success
      </Button>
      <NoticeBubbleContainer manager={manager} containerNode={containerNode} />
      <NoticeBubbleContainer manager={manager2} containerNode={containerNode} />
    </>
  );
};

/** =============== This is a container from sm2, you shouldn't add it by yourself =============== */
const noticeContainer = document.createElement('div');

noticeContainer.id = 'notice-bubble-container';

noticeContainer.style.setProperty('position', 'fixed');
noticeContainer.style.setProperty('right', '20px');
noticeContainer.style.setProperty('top', '20px');
noticeContainer.style.setProperty('width', '300px');

document.body.appendChild(noticeContainer);

// @ts-ignore
window.sm2 = {
  getNoticeBubbleContainer: () => {
    return document.getElementById('notice-bubble-container');
  },
};
/** =============== This is a container from sm2, you shouldn't add it by yourself =============== */

export const defaultProps: BaseNoticeBubbleProps = {
  initialAnimation: true,
  duration: 0,
  type: 'info',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
