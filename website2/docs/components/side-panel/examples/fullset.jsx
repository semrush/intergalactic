import React, { useState } from 'react';
import Button from '@semcore/button';
import SidePanel from '@semcore/side-panel';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)}>
        <SidePanel.Close />
        <SidePanel.Header>
          <SidePanel.Back>Go to Tool Name</SidePanel.Back>
          <SidePanel.Title>Heading 6, 16px</SidePanel.Title>
        </SidePanel.Header>
        <SidePanel.Body>Content</SidePanel.Body>
        <SidePanel.Footer justifyContent="center" pt={2}>
          <Button use="primary">Primary</Button>
          <Button ml={2}>Cancel</Button>
        </SidePanel.Footer>
      </SidePanel>
    </>
  );
};
