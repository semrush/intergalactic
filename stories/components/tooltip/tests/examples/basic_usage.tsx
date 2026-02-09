import FileExportM from '@semcore/icon/FileExport/m';
import InfoM from '@semcore/icon/Info/m';
import { Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import Link from '@semcore/ui/link';
import Tooltip, { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <Flex gap={4} direction='column'>
    <Flex gap={4} alignItems='center'>
      Tooltip:
      <Tooltip
        interaction='hover'
        tag={[Link, 'h1']}
        href='https://google.com'
        title='Default tooltip contains short text explaining something about the trigger.'
      >
        Hover and few tags
      </Tooltip>
      <Tooltip
        title='Default tooltip contains short text explaining something about the trigger.'
        tag={Button}
        interaction='click'
        aria-label='Click'
        addonLeft={FileExportM}
      />
      <Tooltip
        interaction='focus'
        tag={Link}
        href='https://google.com'
        title='Default tooltip contains short text explaining something about the trigger.'
      >
        Focus
      </Tooltip>
      <Tooltip
        interaction='none'
        tag={Link}
        href='https://google.com'
        title='Default tooltip contains short text explaining something about the trigger.'
      >
        None
      </Tooltip>
    </Flex>
    <Flex gap={4} alignItems='center'>
      DescriptionTooltip:
      <DescriptionTooltip interaction='hover'>
        <DescriptionTooltip.Trigger tag={[ButtonLink, 'h2']} use='secondary'>
          Hover and few tags
        </DescriptionTooltip.Trigger>
        <DescriptionTooltip.Popper aria-label='About fastest animals'>
          <Text tag='p' mb={3}>
            The
            {' '}
            <Link href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>
            {' '}
            is the fastest bird, and the fastest member of the animal kingdom, with a diving speed
            of over 300 km/h (190 mph).
          </Text>
          <Text tag='p'>
            The fastest land animal is the cheetah. Among the fastest animals in the sea is the
            black marlin, with uncertain and conflicting reports of recorded speeds.
          </Text>
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>
      <DescriptionTooltip interaction='click'>
        <DescriptionTooltip.Trigger
          tag={ButtonLink}
          addonLeft={InfoM}
          color='icon-secondary-neutral'
          aria-label='About peregrine falcon'
        />
        <DescriptionTooltip.Popper aria-label='About peregrine falcon'>
          <Text tag='p' mb={3}>
            The peregrine falcon is the fastest aerial animal, fastest animal in flight, fastest
            bird, and the overall fastest member of the
            {' '}
            <Link href='https://en.wikipedia.org/wiki/Animal'>animal kingdom</Link>
            .
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
