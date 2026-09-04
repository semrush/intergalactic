import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import FileExportM from '@semcore/icon/FileExport/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import SidePanel from '@semcore/ui/side-panel';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type SidePanelDemoProps = {
  ellipsisTitle?: boolean;
  ellipsisMaxLine?: number;
  withClose?: boolean;
  withAdditionalHeaderContent?: boolean;
  withTooltipInBody?: boolean;
  withFooter?: boolean;
  backWMax?: number;
  animationsDisabled?: boolean;
  forcedAdvancedMode?: boolean;
};

export const defaultSidePanelDemoProps: SidePanelDemoProps = {
  ellipsisTitle: false,
  ellipsisMaxLine: 2,
  withClose: false,
  withAdditionalHeaderContent: false,
  withTooltipInBody: false,
  withFooter: false,
  animationsDisabled: false,
  forcedAdvancedMode: false,
};

const Demo = (props: SidePanelDemoProps) => {
  const [visible, setVisible] = React.useState(false);
  const ellipsisProps = {
    'ellipsis': props.ellipsisTitle,
    'ellipsis:maxLine': props.ellipsisMaxLine && props.ellipsisMaxLine > 1 ? props.ellipsisMaxLine : undefined,
  };

  const content = (
    <>
      {props.withClose && <SidePanel.Close />}
      <SidePanel.Header>
        <SidePanel.Title ellipsis={false}>
          <ButtonLink color='text-hint' size={100} addonLeft={ArrowLeft} mr={2} />
          <Text w={100} {...ellipsisProps}>
            Heading 6, 16px Heading 6, 16px
          </Text>
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
        <SidePanel.Footer>
          <Button use='primary'>Primary</Button>
          <Button>Cancel</Button>
        </SidePanel.Footer>
      )}
    </>
  );

  return (
    <>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel
        visible={visible}
        onClose={() => setVisible(false)}
        animationsDisabled={props.animationsDisabled}
        aria-label='My side panel'
      >
        {props.withClose || props.forcedAdvancedMode
          ? (
              <SidePanel.Panel forcedAdvancedMode={props.forcedAdvancedMode}>
                {content}
              </SidePanel.Panel>
            )
          : content}
      </SidePanel>
    </>
  );
};

export default Demo;
