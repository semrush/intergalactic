import React, { useState } from 'react';
import FullscreenModal from '@semcore/fullscreen-modal';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Button from '@semcore/button';
import Divider from '@semcore/divider';
import ArrowLeftS from '@semcore/icon/lib/ArrowLeft/s';
import ArrowRightS from '@semcore/icon/lib/ArrowRight/s';

const Demo = () => {
  const [hidden, updateHidden] = useState(true);

  const changeHiddenModal = () => {
    updateHidden((hidden) => !hidden);
  };

  return (
    <>
      <Button use="primary" onClick={changeHiddenModal}>
        Открыть окно
      </Button>
      <FullscreenModal hidden={hidden} onClose={changeHiddenModal}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header>
          <FullscreenModal.Title>Heading 4, 25px</FullscreenModal.Title>
          <Divider orientation="vertical" h={16} mx={3} />
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
        <FullscreenModal.Footer>
          <Flex alignItems="center" justifyContent="center" h="100%">
            <Button size="l" color="gray60" theme="muted" use="tertiary">
              <Button.Addon>
                <ArrowLeftS />
              </Button.Addon>
              <Button.Text ml={2}>Prev button</Button.Text>
            </Button>
            <Divider orientation="vertical" h={26} mx={6} />
            <Button size="l" color="gray60" theme="muted" use="tertiary">
              <Button.Text mr={2}>Next button</Button.Text>
              <Button.Addon>
                <ArrowRightS />
              </Button.Addon>
            </Button>
          </Flex>
        </FullscreenModal.Footer>
      </FullscreenModal>
    </>
  );
};

export default Demo;
