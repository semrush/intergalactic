import { Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import Slider from '@semcore/ui/slider';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import InlineNumberInput from '../../../../../../../components/inline-input/docs/examples/number-only_input';
import InputNumberDemo from '../../../../../../../components/input-number/docs/examples/range_of_values';

export function ArticleLaunchForm() {
  const [distribution, setDistribution] = React.useState('site');
  const [promotionLevel, setPromotionLevel] = React.useState('standard');

  return (
    <Flex direction='column' gap={6}>
      <Flex direction='column' gap={2}>
        <Text size={300} tag='h3' semibold>
          Target word count
        </Text>
        <InputNumberDemo />
      </Flex>

      <Flex direction='column' gap={2}>
        <Text size={300} semibold>
          Editorial revision round
        </Text>
        <InlineNumberInput />
      </Flex>

      <RadioGroup
        name='article-launch-distribution'
        aria-labelledby='article-launch-distribution-label'
        value={distribution}
        onChange={(v: string) => setDistribution(v)}
        size='m'
      >
        <Text id='article-launch-distribution-label' size={300} semibold>
          Distribution
        </Text>
        <Flex direction='column' mt={2}>
          <Radio mb={3} value='site' label='Website only' />
          <Radio value='site-newsletter' label='Website + newsletter' />
        </Flex>
      </RadioGroup>

      <Flex direction='column' gap={2}>
        <Text tag='label' size={300} semibold htmlFor='article-hero-accent'>
          Hero accent color
        </Text>
        <ColorPicker>
          <ColorPicker.Trigger id='article-hero-accent' />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager>
              <PaletteManager.Colors />
              <PaletteManager.InputColor />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </Flex>

      <Flex direction='column' gap={2} alignItems='flex-start'>
        <Text tag='label' size={300} semibold htmlFor='article-promotion-level'>
          Launch promotion intensity
        </Text>
        <Slider
          w='50%'
          id='article-promotion-level'
          max={3}
          min={1}
          options={[
            { value: 'organic', label: 'Organic only' },
            { value: 'standard', label: 'Standard push' },
            { value: 'maximum', label: 'Maximum spotlight' },
          ]}
          step={1}
          value={promotionLevel}
          onChange={setPromotionLevel}
        />
      </Flex>

      <Flex>
        <Button size='l' use='primary' theme='success'>
          Launch article
        </Button>
      </Flex>
    </Flex>
  );
}
