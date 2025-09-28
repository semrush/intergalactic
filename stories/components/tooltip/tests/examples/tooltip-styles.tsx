import CheckAltM from '@semcore/icon/CheckAlt/m';
import Button, { ButtonLink } from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';
import Tooltip, { Hint, DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <Flex direction='row' gap={40}>
    <Flex direction='column' gap={20} mb={3} data-testid='Hint'>
      <Hint
        visible
        title='Hint default'
        aria-hidden={false}
        placement='bottom'
        tag={CheckAltM}
        theme='default'
        color='var(--intergalactic-icon-primary-success)'
      />
      <Hint
        visible
        title='Hint invert'
        aria-hidden={false}
        placement='bottom'
        tag={CheckAltM}
        theme='invert'
      />

    </Flex>

    <Flex direction='column' gap={20} mb={3} data-testid='Top'>
      <Tooltip
        visible
        title='Tooltip default'
        aria-hidden={false}
        placement='bottom'
        tag={CheckAltM}
        theme='default'
        color='var(--intergalactic-icon-primary-success)'
      />
      <Tooltip
        visible
        title='Tooltip invert'
        aria-hidden={false}
        placement='bottom'
        tag={CheckAltM}
        theme='invert'
      />
      <Tooltip
        visible
        title='Tooltip warning'
        aria-hidden={false}
        placement='bottom'
        tag={CheckAltM}
        theme='warning'
      />

      <Tooltip
        visible
        title='Tooltip warning'
        aria-hidden={false}
        placement='bottom'
        tag={CheckAltM}
      />

      <Tooltip visible placement='bottom'>
        <Tooltip.Trigger>
          <Button type='button'>Test</Button>
        </Tooltip.Trigger>
        <Tooltip.Popper arrowBgColor='green' arrowShadowColor='grey'>
          Tooltip green arrow
        </Tooltip.Popper>
      </Tooltip>

    </Flex>

    <Flex direction='column' gap={20} mb={3} data-testid='Top'>
      <DescriptionTooltip
        visible
        title='Tooltip default'
        aria-hidden={false}
        placement='bottom'

        theme='default'
      >
        <DescriptionTooltip.Trigger tag={ButtonLink} use='secondary'>
          DescriptionTooltip invert
        </DescriptionTooltip.Trigger>
        <DescriptionTooltip.Popper aria-label='About fastest animals'>
          <Text tag='p'>
            The
            {' '}
            <Link href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>
            {' '}
            is the fastest bird,
          </Text>
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>

      <DescriptionTooltip
        visible
        title='Tooltip default'
        aria-hidden={false}
        placement='bottom'

        theme='invert'
      >
        <DescriptionTooltip.Trigger tag={ButtonLink} use='secondary'>
          DescriptionTooltip
        </DescriptionTooltip.Trigger>
        <DescriptionTooltip.Popper aria-label='About fastest animals'>
          <Text tag='p'>
            The
            {' '}
            <Link href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>
            {' '}
            is the fastest bird,
          </Text>
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>

      <DescriptionTooltip
        visible
        title='Tooltip default'
        aria-hidden={false}
        placement='bottom'

        theme='warning'
      >
        <DescriptionTooltip.Trigger tag={ButtonLink} use='secondary'>
          DescriptionTooltip warning
        </DescriptionTooltip.Trigger>
        <DescriptionTooltip.Popper aria-label='About fastest animals'>
          <Text tag='p'>
            The
            {' '}
            <Link href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>
            {' '}
            is the fastest bird,
          </Text>
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>

      <DescriptionTooltip
        visible
        title='Tooltip default'
        aria-hidden={false}
        placement='bottom'

        theme='warning'
      >
        <DescriptionTooltip.Trigger tag={ButtonLink} use='secondary'>
          DescriptionTooltip warning
        </DescriptionTooltip.Trigger>
        <DescriptionTooltip.Popper aria-label='About fastest animals' arrowBgColor='green' arrowShadowColor='grey'>
          <Text tag='p'>
            The
            {' '}
            <Link href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>
            {' '}
            is the fastest bird,
          </Text>
        </DescriptionTooltip.Popper>
      </DescriptionTooltip>
    </Flex>
  </Flex>
);

export default Demo;
