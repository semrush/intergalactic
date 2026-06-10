import FileExportM from '@semcore/icon/FileExport/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import SidePanel from '@semcore/ui/side-panel';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

export type SidePanelDemoProps = {
  ellipsisTitle?: boolean;
  ellipsisMaxLine?: number;
  withClose?: boolean;
  withAdditionalHeaderContent?: boolean;
  withTooltipInBody?: boolean;
  withFooter?: boolean;
  backText?: string;
  backWMax?: number;
};

export const defaultSidePanelDemoProps: SidePanelDemoProps = {
  ellipsisTitle: false,
  ellipsisMaxLine: 2,
  withClose: false,
  withAdditionalHeaderContent: false,
  withTooltipInBody: false,
  withFooter: false,
  backText: 'Go to Tool Name',
};

const Demo = (props: SidePanelDemoProps) => {
  const [visible, setVisible] = React.useState(false);
  const backText = props.backText ?? defaultSidePanelDemoProps.backText;

  const content = (
    <>
      {props.withClose && <SidePanel.Close />}
      <SidePanel.Header>
        <SidePanel.Back wMax={props.backWMax}>{backText}</SidePanel.Back>
        <SidePanel.Title w={100} ellipsis={props.ellipsisTitle} ellipsis:maxLine={props.ellipsisMaxLine}>
          Heading 6, 16px Heading 6, 16px
        </SidePanel.Title>
        {props.withAdditionalHeaderContent && (
          <Flex direction='column'>
            <Box>Additional element 1</Box>
            <Box>Additional element 2</Box>
          </Flex>
        )}
      </SidePanel.Header>
      <SidePanel.Body>
        Content
        {props.withTooltipInBody && (
          <Tooltip
            title='Default tooltip contains short text explaining something about the trigger.'
            tag={Button}
            aria-label='Export to PDF'
            addonLeft={FileExportM}
          />
        )}
      </SidePanel.Body>
      {props.withFooter && (
        <SidePanel.Footer justifyContent='center' pt={2}>
          <Button use='primary'>Primary</Button>
          <Button ml={2}>Cancel</Button>
        </SidePanel.Footer>
      )}
    </>
  );

  return (
    <>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} aria-label='My side panel'>
        {props.withClose ? <SidePanel.Panel>{content}</SidePanel.Panel> : content}
      </SidePanel>
    </>
  );
};

export default Demo;
