import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import type { ModalProps } from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type BasicModalProps = ModalProps & {
  title?: string;
  content?: string;
  showCloseButton?: boolean;
};

const Demo = (props: BasicModalProps) => {
  const {
    title = 'Modal Title',
    content = 'Modal content goes here',
    showCloseButton = true,
    duration = 200,
    closable = true,
    disablePreventScroll = false,
    ghost = false,
    w,
    locale,
    ...restProps
  } = props;

  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);
  const modalTabIndex = !closable && !showCloseButton ? 0 : undefined;

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        visible={visible}
        onClose={handleClose}
        duration={duration}
        closable={closable}
        disablePreventScroll={disablePreventScroll}
        ghost={ghost}
        w={w}
        locale={locale}
        tabIndex={modalTabIndex}
        {...restProps}
      >
        <Modal.Title>{title}</Modal.Title>
        <Text size={200} mb={4} tag='p'>
          {content}
        </Text>
        {showCloseButton && (
          <Button use='primary' theme='success' size='l' onClick={handleClose}>
            Close
          </Button>
        )}
      </Modal>
    </React.Fragment>
  );
};

export const defaultProps: BasicModalProps = {
  title: 'Modal Title',
  content: 'Modal content goes here',
  showCloseButton: true,
  duration: 200,
  closable: true,
  disablePreventScroll: false,
  ghost: false,
  w: undefined,
  locale: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
