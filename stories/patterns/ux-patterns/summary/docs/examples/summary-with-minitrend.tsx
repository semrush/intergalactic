import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import MiniChart from '@semcore/ui/mini-chart';
import Link from '@semcore/ui/link';
import Divider from '@semcore/ui/divider';
import Info from '@semcore/ui/icon/Info/m';

const Demo = () => (
  <Flex gap={6} direction='column' w='min-content'>
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
      <Flex alignItems='baseline' gap={1} mt={1}>
        <Link
          size={500}
          color='text-large-secondary'
          fontWeight='bold'
          href='https://semrush.com'
          target='_blank'
        >
          n/a
        </Link>
      </Flex>
    </Flex>
    <Divider />
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
      <Flex alignItems='baseline' gap={1} mt={1}>
        <Link
          size={500}
          color='text-large-info'
          fontWeight='bold'
          href='https://semrush.com'
          target='_blank'
        >
          24,765
        </Link>
        <Text size={100} color='text-critical' noWrap>
          &minus;4
        </Text>
        <MiniChart.TrendArea
          aria-hidden
          data={[20, 50, 33, 80, 70, 35, 10, 40, 90, 50]}
          w={34}
          h={20}
        />
      </Flex>
    </Flex>
    <Divider />
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
      <Flex alignItems='baseline' gap={1} mt={1}>
        <Link
          size={500}
          color='text-large-info'
          fontWeight='bold'
          href='https://semrush.com'
          target='_blank'
        >
          908
        </Link>
        <Text size={100} color='text-success'>
          +12
        </Text>
      </Flex>
    </Flex>
  </Flex>
);

export default Demo;
