import React from 'react';
// @ts-ignore
import { DescriptionTooltip } from 'intergalactic/tooltip';
// @ts-ignore
import { Box, Flex } from 'intergalactic/flex-box';
// @ts-ignore
import { Text } from 'intergalactic/typography';
// @ts-ignore
import Link from 'intergalactic/link';
// @ts-ignore
import Button from 'intergalactic/button';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <Flex gap={4} flexWrap direction='column'>
      <Box m={15} />
      <Flex>
        <DescriptionTooltip visible>
          <DescriptionTooltip.Trigger tag={Button}>Trigger</DescriptionTooltip.Trigger>
          <DescriptionTooltip.Popper aria-label={'Popper description'}>
            Popper
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
