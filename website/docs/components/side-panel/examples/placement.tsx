import React from 'react';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import Select from 'intergalactic/select';
import SidePanel, { SidePanelPlacement } from 'intergalactic/side-panel';

const placements: SidePanelPlacement[] = ['left', 'right', 'bottom'];

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState(placements[1]);

  return (
    <React.Fragment>
      <Text size={300} tag='div' mb={2}>
        Placement:
      </Text>
      <Select
        value={placement}
        options={arrToOptions(placements)}
        onChange={setPlacement}
        size='l'
      />
      <Button onClick={() => setVisible(true)} use='primary' theme='success' size='l' ml={3}>
        Show SidePanel
      </Button>
      <SidePanel
        visible={visible}
        onClose={() => setVisible(false)}
        placement={placement}
        mt={placement === 'bottom' ? 0 : 20}
        aria-label={`Here is a ${placement}-placed side panel`}
      >
        <Text size={300} tag='p'>
          Waba-laba-dub-dub!
        </Text>
        <Button mt={3}>I'm just a button</Button>
      </SidePanel>
    </React.Fragment>
  );
};

function arrToOptions(arr) {
  return arr.map((i) => ({ value: i, label: i, children: i }));
}

export default Demo;
