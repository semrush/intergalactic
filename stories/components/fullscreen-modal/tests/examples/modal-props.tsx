import Button from '@semcore/ui/button';
import type { FullscreenModalProps } from '@semcore/ui/fullscreen-modal';
import FullscreenModal from '@semcore/ui/fullscreen-modal';
import React from 'react';

const Demo = (props: FullscreenModalProps) => {
  const { closable } = props;
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>
      <FullscreenModal visible={visible} onClose={() => setVisible(false)} closable={closable} duration={500} aria-describedby='my-modal-description'>
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header
          title='Modal Window Title'
          description={(
            <FullscreenModal.Description id='my-modal-description'>
              Additional information
            </FullscreenModal.Description>
          )}
          w={300}
        />
        <FullscreenModal.Body />
        <FullscreenModal.Footer />
      </FullscreenModal>
    </>
  );
};

export const defaultProps: FullscreenModalProps = {
  closable: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
