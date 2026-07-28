import Button from '@semcore/ui/button';
import type { NSSidePanel } from '@semcore/ui/side-panel';
import SidePanel from '@semcore/ui/side-panel';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: NSSidePanel.Props) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel
        visible={visible}
        onClose={() => setVisible(false)}
        aria-label='SidePanel example'
        placement={props.placement}
        closable={props.closable}
        disablePreventScroll={props.disablePreventScroll}
      >
        <SidePanel.Header>
          <SidePanel.Title mt={3}>SidePanel Title</SidePanel.Title>
        </SidePanel.Header>
        <SidePanel.Body>
          <Text size={300} tag='p'>
            SidePanel content
          </Text>
        </SidePanel.Body>
      </SidePanel>
    </React.Fragment>
  );
};

export const defaultProps: NSSidePanel.Props = {
  placement: undefined,
  closable: undefined,
  disablePreventScroll: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
