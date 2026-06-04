import Info from '@semcore/icon/Info/m';
import Warning from '@semcore/icon/Warning/m';
import { Flex, Hint } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Reload = () => {
  const ref = React.useRef(null);

  return (
    <Flex gap={2} mt={1} h={28} alignItems='center'>
      <Warning
        color='icon-secondary-neutral'
        ref={ref}
        aria-hidden={false}
        role='img'
      />
      <Hint triggerRef={ref}>
        Something went wrong
      </Hint>
      <ButtonLink>Reload</ButtonLink>
    </Flex>
  );
};

const Demo = () => (
  <Flex gap={6}>
    <Flex direction='column'>
      <Flex gap={1} tag={Text} size={200}>
        Visibility
        <DescriptionTooltip>
          <DescriptionTooltip.Trigger
            tag={ButtonLink}
            addonLeft={Info}
            aria-label='About visibility'
            color='icon-secondary-neutral'
            mt='-1px'
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
      <Reload />
    </Flex>
    <Divider orientation='vertical' />
    <Flex direction='column'>
      <Flex gap={1} tag={Text} size={200}>
        Estimated traffic
        <DescriptionTooltip>
          <DescriptionTooltip.Trigger
            tag={ButtonLink}
            addonLeft={Info}
            aria-label='About estimated traffic'
            color='icon-secondary-neutral'
            mt='-1px'
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
      <Reload />
    </Flex>
    <Divider orientation='vertical' />
    <Flex direction='column'>
      <Flex gap={1} tag={Text} size={200}>
        Average position
        <DescriptionTooltip>
          <DescriptionTooltip.Trigger
            tag={ButtonLink}
            addonLeft={Info}
            aria-label='About Average position'
            color='icon-secondary-neutral'
            mt='-1px'
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
      <Reload />
    </Flex>
  </Flex>
);

export default Demo;
