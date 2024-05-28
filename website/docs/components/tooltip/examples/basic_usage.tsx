import React from 'react';
import Tooltip, { Hint, DescriptionTooltip } from 'intergalactic/tooltip';
import { Flex } from 'intergalactic/flex-box';
import { Text, Hint as HintLink } from 'intergalactic/typography';
import Link from 'intergalactic/link';
import Button from 'intergalactic/button';
import FileExportM from 'intergalactic/icon/FileExport/m';
import CheckAltM from 'intergalactic/icon/CheckAlt/m';
import InfoM from 'intergalactic/icon/Info/m';

const Demo = () => (
  <Flex gap={4} direction='column'>
    <Flex gap={4} alignItems='center'>
      Hint:
      <Hint title='Export to PDF'>
        <Button addonLeft={FileExportM} />
      </Hint>
      <Hint
        title='You confirmed your email'
        aria-hidden={false}
        tag={CheckAltM}
        color='var(--intergalactic-icon-primary-success)'
      />
    </Flex>
    <Flex gap={4} alignItems='center'>
      Tooltip:
      <Tooltip
        tag={Link}
        href='https://google.com'
        title='Default tooltip contains short text explaining something about the trigger.'
      >
        Tooltip
      </Tooltip>
      <Tooltip title='Default tooltip contains short text explaining something about the trigger.'>
        <Button aria-label='Export to PDF' addonLeft={FileExportM} />
      </Tooltip>
    </Flex>
    <Flex gap={4} alignItems='center'>
      DescriptionTooltip:
      <DescriptionTooltip>
        <DescriptionTooltip.Trigger tag={HintLink}>
          Additional information
        </DescriptionTooltip.Trigger>
        <DescriptionTooltip.Popper aria-labelledby='tooltip-title'>
          <Text tag='p' bold mb={1} id='tooltip-title'>
            Additional information
          </Text>
          <Text tag='p' mb={3}>
            Use this tooltip type if you need to show a lot of supplementary information.
          </Text>
          <Text tag='p'>
            It may contain several paragraphs and interactive elements (for example,{' '}
            <Link href='https://semrush.com'>links</Link>).
          </Text>
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>
      <DescriptionTooltip>
        <DescriptionTooltip.Trigger
          tag={InfoM}
          color='var(--intergalactic-icon-secondary-neutral)'
          interactive
          aria-label='Additional information'
        />
        <DescriptionTooltip.Popper aria-labelledby='icon-tooltip-title'>
          <Text tag='p' bold mb={1} id='icon-tooltip-title'>
            Additional information
          </Text>
          <Text tag='p' mb={3}>
            Use this tooltip type if you need to show a lot of supplementary information.
          </Text>
          <Text tag='p'>
            It may contain several paragraphs and interactive elements (for example,{' '}
            <Link href='https://semrush.com'>links</Link>).
          </Text>
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>
    </Flex>
  </Flex>
);

export default Demo;
