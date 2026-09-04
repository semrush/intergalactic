import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import { Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import SidePanel from '@semcore/ui/side-panel';
import type { NSSidePanel } from '@semcore/ui/side-panel';
import React from 'react';

const Demo = (props: NSSidePanel.Props) => {
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
        <SidePanel.Header>
          <SidePanel.Title ellipsis={false} tag={Flex} alignItems='start'>
            <ButtonLink use='secondary' size={300} addonLeft={ArrowLeft} mr={2} title='Back to {Step}' />
            SidePanel title
          </SidePanel.Title>
        </SidePanel.Header>
        <SidePanel.Body>Content</SidePanel.Body>
        <SidePanel.Footer>
          <Button size='l' use='primary'>Got it!</Button>
          <Button size='l'>Cancel</Button>
        </SidePanel.Footer>
      </SidePanel>
    </>
  );
};

export const defaultProps: NSSidePanel.Props = {
  placement: undefined,
  closable: undefined,
  disablePreventScroll: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
