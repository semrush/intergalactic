import React from 'react';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import { DescriptionTooltip } from '@semcore/tooltip';
import Link from '@semcore/link';
import { ButtonLink } from '@semcore/button';
import InfoM from '@semcore/icon/Info/m';
import InfoL from '@semcore/icon/Info/l';

const Demo = () => (
  <>
    <Flex gap={1} mb={4} alignItems='baseline'>
      <Text size={700}>Fastest animals</Text>
      <DescriptionTooltip>
        <DescriptionTooltip.Trigger
          tag={ButtonLink}
          addonLeft={InfoL}
          aria-label='About fastest animals'
          color='icon-secondary-neutral'
        />
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
    </Flex>
    <Flex gap={1} alignItems='center'>
      <Text size={200}>Peregrine falcon</Text>
      <DescriptionTooltip>
        <DescriptionTooltip.Trigger
          tag={ButtonLink}
          addonLeft={InfoM}
          aria-label='About peregrine falcon'
          color='icon-secondary-neutral'
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
  </>
);

export default Demo;
