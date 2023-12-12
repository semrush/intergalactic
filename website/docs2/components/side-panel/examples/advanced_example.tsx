import React from 'react';
import Button from '@semcore/ui/button';
import SidePanel from '@semcore/ui/side-panel';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} mt={20}>
        <SidePanel.Close />
        <SidePanel.Header>
          <SidePanel.Back>Go to Tool Name</SidePanel.Back>
          <SidePanel.Title>Heading 6, 16px</SidePanel.Title>
        </SidePanel.Header>
        <SidePanel.Body>Content</SidePanel.Body>
        <SidePanel.Footer justifyContent='center' pt={2}>
          <Button use='primary'>Primary</Button>
          <Button ml={2}>Cancel</Button>
        </SidePanel.Footer>
      </SidePanel>
    </>
  );
};