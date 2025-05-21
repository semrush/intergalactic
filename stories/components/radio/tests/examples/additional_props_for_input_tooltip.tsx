import React from 'react';
import Radio, { RadioGroup } from '@semcore/radio';
import Tooltip, { Hint, DescriptionTooltip } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import Link from '@semcore/link';
import { ButtonLink } from '@semcore/button';
import InfoM from '@semcore/icon/Info/m';

const Demo = () => {
  return (
    <RadioGroup aria-label='radiogroup with custom properties' size='l'>
      <Radio mb={3} value={'1'}>
        <Radio.Value>
          <Radio.Value.Control data-test-id={'TEST_ID'} />
          <Radio.Value.RadioMark />
        </Radio.Value>
        <Radio.Text>First value</Radio.Text>
      </Radio>
      <Radio mb={3} value={'2'} label={'Second value'} />
      <Radio mb={3} value={'3'} state='invalid' >
        <Radio.Value>
          <Radio.Value.Control data-test-id={'TEST_ID'} />
          <Radio.Value.RadioMark />
        </Radio.Value>
        <Radio.Text>First value
        <DescriptionTooltip>
        <DescriptionTooltip.Trigger
          tag={ButtonLink}
          addonLeft={InfoM}
          color='icon-secondary-neutral'
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
        </Radio.Text>
      </Radio>
    </RadioGroup>
  );
};

export default Demo;
