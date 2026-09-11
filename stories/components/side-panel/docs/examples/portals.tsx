import Button from '@semcore/ui/button';
import SidePanel from '@semcore/ui/side-panel';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} disablePortal>
        <SidePanel.Panel aria-label='Taking the stage' mt={20}>
          <SidePanel.Header>
            <SidePanel.Title>SidePanel Title</SidePanel.Title>
          </SidePanel.Header>
          <SidePanel.Body>
            <Text size={300} tag='p'>
              SidePanel content
            </Text>
          </SidePanel.Body>
        </SidePanel.Panel>
      </SidePanel>
    </React.Fragment>
  );
};

export default Demo;
