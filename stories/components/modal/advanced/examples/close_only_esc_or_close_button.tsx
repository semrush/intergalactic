import Button from '@semcore/ui/button';
import type { ModalProps } from '@semcore/ui/modal';
import Modal from '@semcore/ui/modal';
import type { ReactNode } from 'react';
import React, { useState, useCallback } from 'react';

export default function Demo() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Show</Button>
      <GoalSurveyModal visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}

type GoalSurveyModalProps = ModalProps & {
  children?: ReactNode;
};

export const GoalSurveyModal = (props: GoalSurveyModalProps) => {
  const { children, onClose, ...modalProps } = props;

  const handleClose = useCallback<NonNullable<ModalProps['onClose']>>(
    (trigger, e) => {
      if (trigger !== 'onOutsideClick') {
        return onClose?.(trigger, e);
      }
    },
    [onClose],
  );

  return (
    <Modal {...modalProps} onClose={handleClose}>
      <Modal.Overlay>
        <Modal.Window>Hello</Modal.Window>
      </Modal.Overlay>
    </Modal>
  );
};
