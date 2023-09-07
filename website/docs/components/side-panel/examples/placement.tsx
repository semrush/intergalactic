import React from 'react';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import Select from '@semcore/ui/select';
import SidePanel, { SidePanelPlacement } from '@semcore/ui/side-panel';

const placements: SidePanelPlacement[] = ['left', 'right', 'bottom'];

export default () => {
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
      >
        <Text size={300} tag='p'>
          Waba-laba-dub-dub! 😏
        </Text>
        <Button mt={3}>I'm just a button</Button>
      </SidePanel>
    </React.Fragment>
  );
};

function arrToOptions(arr) {
  return arr.map((i) => ({ value: i, label: i, children: i }));
}
