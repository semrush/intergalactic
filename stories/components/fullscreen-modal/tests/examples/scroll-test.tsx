import Button from '@semcore/ui/button';
import FullscreenModal from '@semcore/ui/fullscreen-modal';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <style>
        {`
        body {
          height: 200vh;
        }

        body:has(input:checked) {
          overflow: hidden;
        }
        `}
      </style>
      <label>
        <input type='checkbox' /> Temporary lock scroll
      </label>
      <br />
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>
      <FullscreenModal visible={visible} onClose={() => setVisible(false)}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header
          title='Modal Window Title'
          description='Additional information'
        />
        <FullscreenModal.Footer />
      </FullscreenModal>
      <br />
      <p>After opening and closing the modal, the page should remain scrollable.</p>
      <div data-testid='bottom-marker' style={{ marginTop: '150vh' }}>
        Bottom of the page
      </div>
    </>
  );
};

export default Demo;

export const App = () => <Demo />;
