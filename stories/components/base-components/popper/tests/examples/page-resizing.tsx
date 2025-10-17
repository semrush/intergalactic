import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <Flex gap={4} flexWrap direction='column'>
      <Box m={15} />
      <Flex>
        <DescriptionTooltip visible>
          <DescriptionTooltip.Trigger tag={Button}>Trigger</DescriptionTooltip.Trigger>
          <DescriptionTooltip.Popper aria-label='Popper description'>
            Popper
          </DescriptionTooltip.Popper>
        </DescriptionTooltip>
        <Box mr={15} />
        <DescriptionTooltip visible strategy='fixed'>
          <DescriptionTooltip.Trigger tag={Button}>Trigger</DescriptionTooltip.Trigger>
          <DescriptionTooltip.Popper aria-label='Popper description'>
            Fixed
          </DescriptionTooltip.Popper>
        </DescriptionTooltip>
      </Flex>

      {/* @ts-ignore */}
      <Button onClick={() => setVisible(!visible)}>Change height</Button>

      {visible ? <Box m={10}>some dynamic block that is loaded</Box> : null}
    </Flex>
  );
};

export default Demo;

export const App = () => <Demo />;
