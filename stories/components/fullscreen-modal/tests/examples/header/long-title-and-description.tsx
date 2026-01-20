import Button from '@semcore/ui/button';
import FullscreenModal from '@semcore/ui/fullscreen-modal';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>
      <FullscreenModal visible={visible} onClose={() => setVisible(false)}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header title='An Amazing Journey Through Enchanted Worlds, Where Every Step Unveils New Horizons and Dreams Become Reality' description='In the bustling city of Eldoria, where the sun sets behind the towering spires of ancient castles, a mysterious event is about to unfold' />
        <FullscreenModal.Footer />
      </FullscreenModal>
    </>
  );
};

export default Demo;
