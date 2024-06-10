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
      Tooltip:
      <Tooltip
        tag={Link}
        href='https://google.com'
        title='Default tooltip contains short text explaining something about the trigger.'
      >
        Keywords
      </Tooltip>
      <Tooltip
        title='Default tooltip contains short text explaining something about the trigger.'
        tag={Button}
        aria-label='Export to PDF'
        addonLeft={FileExportM}
      />
    </Flex>
    <Flex gap={4} alignItems='center'>
      Hint:
      <Hint title='Export to PDF' tag={Button} addonLeft={FileExportM} />
      <Hint
        title='You confirmed your email'
        aria-hidden={false}
        tag={CheckAltM}
        color='var(--intergalactic-icon-primary-success)'
      />
    </Flex>
    <Flex gap={4} alignItems='center'>
      DescriptionTooltip:
      <DescriptionTooltip>
        <DescriptionTooltip.Trigger tag={HintLink}>
          About fastest animals
        </DescriptionTooltip.Trigger>
        <DescriptionTooltip.Popper aria-label='About fastest animals'>
          <Text tag='p' mb={3}>
            The <Link href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>{' '}
            is the fastest bird, and the fastest member of the animal kingdom, with a diving speed
            of over 300 km/h (190 mph).
          </Text>
          <Text tag='p'>
            The fastest land animal is the cheetah. Among the fastest animals in the sea is the
            black marlin, with uncertain and conflicting reports of recorded speeds.
          </Text>
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>
      <DescriptionTooltip>
        <DescriptionTooltip.Trigger
          tag={InfoM}
          color='var(--intergalactic-icon-secondary-neutral)'
          interactive
          aria-label='About peregrine falcon'
        />
        <DescriptionTooltip.Popper aria-label='About peregrine falcon'>
          <Text tag='p' mb={3}>
            The peregrine falcon is the fastest aerial animal, fastest animal in flight, fastest
            bird, and the overall fastest member of the{' '}
            <Link href='https://en.wikipedia.org/wiki/Animal'>animal kingdom</Link>.
          </Text>
          <Text tag='p'>
            The peregrine achieves its highest velocity not in horizontal level flight, but during
            its characteristic hunting stoop (vertical flight). While stooping, the peregrine falcon
            soars to a great height, then dives steeply at speed of over 320 km/h (200 mph).
          </Text>
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>
    </Flex>
  </Flex>
);

export default Demo;
