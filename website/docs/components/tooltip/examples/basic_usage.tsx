import React from 'react';
import Tooltip, { Hint, DescriptionTooltip } from 'intergalactic/tooltip';
import { Box, Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import Link from 'intergalactic/link';
import Button from 'intergalactic/button';
import FileExportM from 'intergalactic/icon/FileExport/m'
import CheckAltM from 'intergalactic/icon/CheckAlt/m'

const Demo = () => (
  <Flex gap={4} flexWrap>
    <Hint title='Export to PDF'>
      <Button>
        <Button.Addon>
          <FileExportM />
        </Button.Addon>
      </Button>
    </Hint>
    <Hint title='You confirmed your email' role='image'>
      <CheckAltM />
    </Hint>
    <Hint title='You confirmed your email' aria-hidden={false} tag={CheckAltM} />
    <Tooltip tag={Link} href='https://google.com' title='Default tooltip contains short text explaining something about the trigger.'>
      Tooltip
    </Tooltip>
    <Tooltip title='Default tooltip contains short text explaining something about the trigger.'>
      <Button aria-label='Export to PDF'>
        <Button.Addon>
          <FileExportM />
        </Button.Addon>
      </Button>
    </Tooltip>
    <DescriptionTooltip>
      <DescriptionTooltip.Trigger tag={Button}>Additional information</DescriptionTooltip.Trigger>
      <DescriptionTooltip.Popper>
        <Text size={200} bold>
          Additional information
        </Text>
        <Box my={2}>
          Use this tooltip type for elements that already have a visible name, and you need to show
          a lot of additional information.
        </Box>
        <Box mb={2}>
          It may contain several paragraphs and interactive elements (for example,{' '}
          <Link href='https://semrush.com'>links</Link>).
        </Box>
      </DescriptionTooltip.Popper>
    </DescriptionTooltip>
    <input />
  </Flex>
);

export default Demo;
