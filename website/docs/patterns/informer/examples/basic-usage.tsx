import React from 'react';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import { DescriptionTooltip } from 'intergalactic/tooltip';
import Link from 'intergalactic/link';
import InfoM from 'intergalactic/icon/Info/m';
import InfoL from 'intergalactic/icon/Info/l';

const Demo = () => (
  <>
    <Flex gap={1} mb={4} alignItems='center'>
      <Text size={700}>Text</Text>
      <DescriptionTooltip>
        <DescriptionTooltip.Trigger
          tag={InfoL}
          interactive
          aria-label='Additional information'
          color='--intergalactic-icon-secondary-neutral'
        />
        <DescriptionTooltip.Popper>
          <Text tag='p' bold mb={1}>
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
    <Flex gap={1} alignItems='center'>
      <Text size={200}>Text</Text>
      <DescriptionTooltip>
        <DescriptionTooltip.Trigger
          tag={InfoM}
          interactive
          aria-label='Additional information'
          color='--intergalactic-icon-secondary-neutral'
        />
        <DescriptionTooltip.Popper>
          <Text tag='p' bold mb={1}>
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
  </>
);

export default Demo;
