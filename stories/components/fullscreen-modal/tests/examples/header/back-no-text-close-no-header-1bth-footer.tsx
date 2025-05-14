import React from 'react';
import FullscreenModal from '@semcore/fullscreen-modal';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>

      <FullscreenModal disablePortal visible={visible} onClose={() => setVisible(false)}>

        <FullscreenModal.Close />
        <FullscreenModal.Back />

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
        <FullscreenModal.Footer justifyContent='center' alignItems='center'>


          <Button size='l' use='primary'>
            <Button.Text mr={2}>Next content</Button.Text>

          </Button>
        </FullscreenModal.Footer>
      </FullscreenModal>

    </>
  );
};

export default Demo;
