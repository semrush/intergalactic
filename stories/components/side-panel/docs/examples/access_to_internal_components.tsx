import Button from '@semcore/ui/button';
import type { SidePanelProps } from '@semcore/ui/side-panel';
import SidePanel from '@semcore/ui/side-panel';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: SidePanelProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel
        closable={props.closable}
        visible={visible}
        aria-label='SidePanel example'
        onClose={() => setVisible(false)}
        placement={props.placement}
        disablePreventScroll={props.disablePreventScroll}
      >
        <SidePanel.Overlay>
          <SidePanel.Panel>
            <SidePanel.Header>
              <SidePanel.Title mt={3}>Taking the Stage</SidePanel.Title>
            </SidePanel.Header>
            <SidePanel.Body>
              <Text size={300} tag='p'>
                Trends and Strategies for 2024 and Beyond
              </Text>
              <Button size='l' mt={3}>Read more</Button>
            </SidePanel.Body>
          </SidePanel.Panel>
        </SidePanel.Overlay>
      </SidePanel>
    </React.Fragment>
  );
};

export const defaultProps: SidePanelProps = {
  placement: undefined,
  closable: false,
  disablePreventScroll: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
