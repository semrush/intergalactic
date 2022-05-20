import React, { useState } from 'react';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import SidePanel from '@semcore/side-panel';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)}>
        <SidePanel.Panel>
          <Text size={300} tag="p">
            Waba-laba-dub-dub!
            <Button mt={3}>I'm just a button</Button>
          </Text>
        </SidePanel.Panel>
      </SidePanel>
    </React.Fragment>
  );
};
