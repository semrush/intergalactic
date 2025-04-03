import React from 'react';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import Select from '@semcore/select';
import SidePanel, { SidePanelPlacement } from '@semcore/side-panel';

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
          Taking the Stage: Trends and Strategies for 2024 and Beyond
        </Text>
        <Button mt={3}>Read more</Button>
      </SidePanel>
    </React.Fragment>
  );
};

function arrToOptions(arr:any) {
  return arr.map((i: any) => ({ value: i, label: i, children: i }));
}

export default Demo;
