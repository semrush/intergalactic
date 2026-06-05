import Button from '@semcore/ui/button';
import SidePanel from '@semcore/ui/side-panel';
import type { SidePanelProps } from '@semcore/ui/side-panel';
import React from 'react';

const Demo = (props: SidePanelProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel
        visible={visible}
        onClose={() => setVisible(false)}
        aria-label='SidePanel example'
        placement={props.placement}
        closable={props.closable}
        disablePreventScroll={props.disablePreventScroll}
      >
        <SidePanel.Header h='64px'>
          <SidePanel.Back>Go to Tool Name</SidePanel.Back>
          <SidePanel.Title mt={3}>SidePanel title</SidePanel.Title>
        </SidePanel.Header>
        <SidePanel.Body>Content</SidePanel.Body>
        <SidePanel.Footer justifyContent='center' pt={2} h='80px'>
          <Button size='l' use='primary'>Got it!</Button>
          <Button size='l' ml={2}>Cancel</Button>
        </SidePanel.Footer>
      </SidePanel>
    </>
  );
};

export const defaultProps: SidePanelProps = {
  placement: undefined,
  closable: undefined,
  disablePreventScroll: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
