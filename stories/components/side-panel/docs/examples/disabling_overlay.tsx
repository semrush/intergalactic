import Button from '@semcore/button';
import type { SidePanelProps } from '@semcore/side-panel';
import SidePanel from '@semcore/side-panel';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = (props: SidePanelProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel
        visible={visible}
        onClose={() => setVisible(false)}
        placement={props.placement}
        closable={props.closable}
        disablePreventScroll={props.disablePreventScroll}
      >
        <SidePanel.Panel aria-label='Taking the stage' mt={20}>
          <Text size={300} tag='p'>
            Taking the Stage: Trends and Strategies for 2024 and Beyond
          </Text>
          <Button mt={3}>Read more</Button>
        </SidePanel.Panel>
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
