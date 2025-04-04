import React from 'react';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import SidePanel from '@semcore/side-panel';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} disablePortal>
        <SidePanel.Panel aria-label='Taking the stage' mt={20}>
          <Text size={300} tag='p'>
            Taking the Stage: Trends and Strategies for 2024 and Beyond
          </Text>
          <Button mt={3}>Read more</Button>
        </SidePanel.Panel>
      </SidePanel>
    </React.Fragment>
  );
};

export default Demo;
