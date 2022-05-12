import React, { useState } from 'react';
import FullscreenModal from '@semcore/fullscreen-modal';
import { Text } from '@semcore/typography';
import Button from '@semcore/button';
import Divider from '@semcore/divider';
import ArrowLeftS from '@semcore/icon/ArrowLeft/m';
import ArrowRightS from '@semcore/icon/ArrowRight/m';

const Demo = () => {
  const [visible, updateVisible] = useState(true);

  const changeModalVisibility = () => {
    updateVisible((visible) => !visible);
  };

  return (
    <>
      <Button use="primary" onClick={changeModalVisibility}>
        Открыть окно
      </Button>
      <FullscreenModal visible={visible} onClose={changeModalVisibility}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header>
          <FullscreenModal.Title>Heading 4, 25px</FullscreenModal.Title>
          <FullscreenModal.Description>Some additional information</FullscreenModal.Description>
        </FullscreenModal.Header>
        <FullscreenModal.Body>
          <FullscreenModal.Section>
            <Text size={400}>Heading 5</Text>
          </FullscreenModal.Section>
          <FullscreenModal.Section style={{ background: '#eee', overflow: 'auto' }}>
            <div style={{ height: '1000px' }}>
              <Text size={400}>Heading 5</Text>
            </div>
          </FullscreenModal.Section>
        </FullscreenModal.Body>
        <FullscreenModal.Footer justifyContent="center" alignItems="center">
          <Button size="m" color="gray60" theme="muted" use="tertiary">
            <Button.Addon>
              <ArrowLeftS />
            </Button.Addon>
            <Button.Text ml={2}>Prev button</Button.Text>
          </Button>
          <Divider orientation="vertical" h={26} mx={6} />
          <Button size="m" color="gray60" theme="muted" use="tertiary">
            <Button.Text mr={2}>Next button</Button.Text>
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
