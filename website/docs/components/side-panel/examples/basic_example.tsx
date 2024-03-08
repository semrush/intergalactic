import React from 'react';
import Button from 'intergalactic/button';
import { List } from 'intergalactic/typography';
import SidePanel from 'intergalactic/side-panel';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} mt={20}>
        <List size={300} marker={null}>
          {['Features', 'Pricing', 'Resources', 'Company', 'Extra tools'].map((name, i, arr) => (
            <React.Fragment key={i}>
              <List.Item>{name}</List.Item>
              {i < arr.length - 1}
            </React.Fragment>
          ))}
        </List>
      </SidePanel>
    </React.Fragment>
  );
};

export default Demo;
