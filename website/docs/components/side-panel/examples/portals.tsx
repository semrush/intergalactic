import React from 'react';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import SidePanel from 'intergalactic/side-panel';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} disablePortal>
        <SidePanel.Panel aria-label='Blah-blah-blah'>
          <Text size={300} tag='p'>
            Waba-laba-dub-dub!
          </Text>
          <Button mt={3}>I'm just a button</Button>
        </SidePanel.Panel>
      </SidePanel>
    </React.Fragment>
  );
};

export default Demo;
