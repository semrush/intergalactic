import React, { useState } from 'react';
import FullscreenModal from '@semcore/ui/fullscreen-modal';
import { Text } from '@semcore/ui/typography';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import ArrowLeftS from '@semcore/ui/icon/ArrowLeft/m';
import ArrowRightS from '@semcore/ui/icon/ArrowRight/m';

const Demo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button use="primary" onClick={() => setVisible(true)}>
        Open fullscreen window
      </Button>
      <FullscreenModal visible={visible} onClose={() => setVisible(false)}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header>
          <FullscreenModal.Title>Modal Window Title</FullscreenModal.Title>
          <FullscreenModal.Description>Additional information</FullscreenModal.Description>
        </FullscreenModal.Header>
        <FullscreenModal.Body>
          <FullscreenModal.Section>
            <Text size={400}>Content Title</Text>
          </FullscreenModal.Section>
          <FullscreenModal.Section style={{ background: '#eee', overflow: 'auto' }}>
            <div style={{ height: '1000px' }}>
              <Text size={400}>Content Title</Text>
            </div>
          </FullscreenModal.Section>
        </FullscreenModal.Body>
        <FullscreenModal.Footer justifyContent="center" alignItems="center">
          <Button size="m" color="gray60" theme="muted" use="tertiary">
            <Button.Addon>
              <ArrowLeftS />
            </Button.Addon>
            <Button.Text ml={2}>Previous content</Button.Text>
          </Button>
          <Divider orientation="vertical" h={26} mx={6} />
          <Button size="m" color="gray60" theme="muted" use="tertiary">
            <Button.Text mr={2}>Next content</Button.Text>
            <Button.Addon>
              <ArrowRightS />
            </Button.Addon>
          </Button>
        </FullscreenModal.Footer>
      </FullscreenModal>
    </>
  );
};

export default Demo;
