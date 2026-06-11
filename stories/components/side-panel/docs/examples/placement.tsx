import Button from '@semcore/ui/button';
import Select from '@semcore/ui/select';
import type { SidePanelPlacement } from '@semcore/ui/side-panel';
import SidePanel from '@semcore/ui/side-panel';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const placements: SidePanelPlacement[] = ['left', 'right', 'bottom'];

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState(placements[1]);

  return (
    <React.Fragment>
      <Text size={300} tag='div' mb={2}>
        <label htmlFor='select-placement'>Placement</label>
      </Text>
      <Select
        id='select-placement'
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
        aria-label={`Here is a ${placement}-placed side panel`}
      >
        <Text size={300} tag='p'>
          SidePanel content
        </Text>
      </SidePanel>
    </React.Fragment>
  );
};

function arrToOptions(arr: any) {
  return arr.map((i: any) => ({ value: i, label: i, children: i }));
}

export default Demo;
