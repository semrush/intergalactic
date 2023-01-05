import React, { useState } from 'react';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import Select from '@semcore/ui/select';
import SidePanel from '@semcore/side-panel';

const placements = ['left', 'right', 'bottom'];

export default () => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState('right');

  return (
    <React.Fragment>
      <Text size={200} tag="div" mb={2}>
        Placement:
      </Text>
      <Select value={placement} options={arrToOptions(placements)} onChange={setPlacement} />
      <Button onClick={() => setVisible(true)} use="primary" theme="success" size="l">
        Show SidePanel
      </Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} placement={placement}>
        <Text size={300} tag="p">
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
