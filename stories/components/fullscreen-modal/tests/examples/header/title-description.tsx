import React from 'react';
import FullscreenModal from '@semcore/fullscreen-modal';
import Ellipsis from '@semcore/ellipsis';
import Button from '@semcore/button';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>

      <FullscreenModal disablePortal visible={visible} onClose={() => setVisible(false)}>
        <FullscreenModal.Header>
          <FullscreenModal.Title tag={Ellipsis} w={200}>Go to Tool Name Go to Tool Name</FullscreenModal.Title>
          <FullscreenModal.Description w={500}>Heading 6, 16px Heading 6, 16px Heading 6, 16px Heading 6, 16px Heading 6, 16px Heading 6, 16px</FullscreenModal.Description>
        </FullscreenModal.Header>
        <FullscreenModal.Body />

        <FullscreenModal.Footer>Footer</FullscreenModal.Footer>
      </FullscreenModal>
    </>
  );
};

export default Demo;
