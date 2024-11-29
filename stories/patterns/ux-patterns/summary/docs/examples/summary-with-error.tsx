import React from 'react';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { Hint, DescriptionTooltip } from '@semcore/tooltip';
import Warning from '@semcore/icon/Warning/m';
import { ButtonLink } from '@semcore/button';
import Divider from '@semcore/divider';
import Info from '@semcore/icon/Info/m';

const Demo = () => (
  <Flex gap={6}>
    <Flex direction='column'>
      <Flex gap={1} alignItems='center'>
        <Text size={200} noWrap>
          Visibility
        </Text>
        <DescriptionTooltip>
          <DescriptionTooltip.Trigger
            tag={Info}
            interactive
            aria-label='About visibility'
            color='icon-secondary-neutral'
          />
          <DescriptionTooltip.Popper aria-label='About visibility'>
            <Text size={200}>
              The Visibility index is based on click-through rate (CTR) that shows a website's
              progress in Google's top 100 for keywords from the current tracking campaign. A zero-
              percent visibility means that the domain isn't ranking in Google's top 100 results for
              any of these keywords; and a 100-percent visibility means that the domain keeps the
              first position in the SERP for all of these keywords.
            </Text>
          </DescriptionTooltip.Popper>
        </DescriptionTooltip>
      </Flex>
      <Text size={100} color='text-secondary'>
        last 30 days
      </Text>
      <Flex gap={2} mt={1} h={28} alignItems='center'>
        <Hint
          tag={Warning}
          title='Something went wrong'
          aria-hidden={false}
          color='icon-secondary-neutral'
        />
        <ButtonLink>Reload</ButtonLink>
      </Flex>
    </Flex>
    <Divider orientation='vertical' />
    <Flex direction='column'>
      <Flex gap={1} alignItems='center'>
        <Text size={200} noWrap>
          Estimated traffic
        </Text>
        <DescriptionTooltip>
          <DescriptionTooltip.Trigger
            tag={Info}
            interactive
            aria-label='About estimated traffic'
            color='icon-secondary-neutral'
          />
          <DescriptionTooltip.Popper aria-label='About estimated traffic'>
            <Text size={200}>
              An estimation based on the average click-through rate of each position in Google's
              results multiplied by the volume of the keyword, and divided by 30 (i.e., the number
              of days in a month). It shows the probability that a user will click on a domain's
              search result depending on this domain's position in the SERP.
            </Text>
          </DescriptionTooltip.Popper>
        </DescriptionTooltip>
      </Flex>
      <Text size={100} color='text-secondary'>
        last 30 days
      </Text>
      <Flex gap={2} mt={1} h={28} alignItems='center'>
        <Hint
          tag={Warning}
          title='Something went wrong'
          aria-hidden={false}
          color='icon-secondary-neutral'
        />
        <ButtonLink>Reload</ButtonLink>
      </Flex>
    </Flex>
    <Divider orientation='vertical' />
    <Flex direction='column'>
      <Flex gap={1} alignItems='center'>
        <Text size={200} noWrap>
          Average position
        </Text>
        <DescriptionTooltip>
          <DescriptionTooltip.Trigger
            tag={Info}
            interactive
            aria-label='About Average position'
            color='icon-secondary-neutral'
          />
          <DescriptionTooltip.Popper aria-label='About Average position'>
            <Text size={200}>
              The average of your rankings for all keywords in your Position Tracking campaign. Any
              keyword you're not ranking for will be assigned a rank of 100.
            </Text>
          </DescriptionTooltip.Popper>
        </DescriptionTooltip>
      </Flex>
      <Text size={100} color='text-secondary'>
        last 30 days
      </Text>
      <Flex gap={2} mt={1} h={28} alignItems='center'>
        <Hint
          tag={Warning}
          title='Something went wrong'
          aria-hidden={false}
          color='icon-secondary-neutral'
        />
        <ButtonLink>Reload</ButtonLink>
      </Flex>
    </Flex>
  </Flex>
);

export default Demo;
