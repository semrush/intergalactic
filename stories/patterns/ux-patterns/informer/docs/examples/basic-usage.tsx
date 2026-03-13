import InfoL from '@semcore/icon/Info/l';
import InfoM from '@semcore/icon/Info/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Link from '@semcore/ui/link';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <>
    <Flex tag={Text} size={700} gap={1} mb={4}>
      Fastest animals
      <DescriptionTooltip>
        <DescriptionTooltip.Trigger
          tag={ButtonLink}
          addonLeft={InfoL}
          aria-label='About fastest animals'
          color='icon-secondary-neutral'
          mt='10px'
        />
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
    </Flex>
    <Flex tag={Text} size={200} gap={1}>
      Peregrine falcon
      <DescriptionTooltip>
        <DescriptionTooltip.Trigger
          tag={ButtonLink}
          addonLeft={InfoM}
          aria-label='About peregrine falcon'
          color='icon-secondary-neutral'
          mt='-1px'
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
  </>
);

export default Demo;
