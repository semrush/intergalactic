import { InputAF, BadgeAF } from '@semcore/accent-feature';
import { Flex } from '@semcore/base-components';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={4}>

    <InputAF w={250}>
      <InputAF.AccentAddon />
      <InputAF.Value placeholder='Your domain' aria-label='Highlighted input' />
      <InputAF.Addon><BadgeAF>AI powered</BadgeAF></InputAF.Addon>
    </InputAF>

    <InputAF w={300} size='l'>
      <InputAF.AccentAddon />
      <InputAF.Value placeholder='Your domain' aria-label='Large highlighted input' />
      <InputAF.Addon><BadgeAF>AI powered</BadgeAF></InputAF.Addon>
    </InputAF>

  </Flex>
);

export default Demo;
