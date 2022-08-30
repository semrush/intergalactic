import React, { useState } from 'react';
import Button from '@semcore/button';
import { List } from '@semcore/typography';
import SidePanel from '@semcore/side-panel';
import Divider from '@semcore/divider';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)}>
        <List size={400} marker={null}>
          {['Features', 'Pricing', 'Resources', 'Company', 'Extra tools'].map((name, i, arr) => (
            <React.Fragment key={i}>
              <List.Item>{name}</List.Item>
              {i < arr.length - 1 && <Divider my={2} />}
            </React.Fragment>
          ))}
        </List>
      </SidePanel>
    </React.Fragment>
  );
};
