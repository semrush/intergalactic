import Button from '@semcore/button';
import type { SidePanelProps } from '@semcore/side-panel';
import SidePanel from '@semcore/side-panel';
import { List } from '@semcore/typography';
import React from 'react';

const Demo = (props: SidePanelProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel
        visible={visible}
        onClose={() => setVisible(false)}
        aria-label='Documentation'
        placement={props.placement}
        closable={props.closable}
        disablePreventScroll={props.disablePreventScroll}
      >
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

export const defaultProps: SidePanelProps = {
  placement: undefined,
  closable: undefined,
  disablePreventScroll: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
