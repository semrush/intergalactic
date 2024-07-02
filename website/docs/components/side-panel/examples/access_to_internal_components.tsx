import React from 'react';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import SidePanel from 'intergalactic/side-panel';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel closable={false} visible={visible} onClose={() => setVisible(false)}>
        <SidePanel.Overlay>
          <SidePanel.Panel aria-label='Blah-blah-blah'>
            <SidePanel.Close />
            <Text size={300} tag='p'>
              Waba-laba-dub-dub!
              <Button mt={3}>I'm just a button</Button>
            </Text>
          </SidePanel.Panel>
        </SidePanel.Overlay>
      </SidePanel>
    </React.Fragment>
  );
};

export default Demo;
