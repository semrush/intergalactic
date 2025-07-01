import { PillsAF } from '@semcore/accent-feature';
import { Flex } from '@semcore/base-components';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={4} alignItems='start'>

    <PillsAF defaultValue={1} aria-label='Pills with highlighted item'>
      <PillsAF.Item value={1}>One</PillsAF.Item>
      <PillsAF.AccentItem value={2}>
        <PillsAF.AccentItem.Addon animatedSparkleCount={5} />
        <PillsAF.AccentItem.Text>Two</PillsAF.AccentItem.Text>
      </PillsAF.AccentItem>
      <PillsAF.Item value={3}>Three</PillsAF.Item>
    </PillsAF>

    <PillsAF defaultValue={3} aria-label='Large pills with highlighted item' size='l'>
      <PillsAF.Item value={1}>One</PillsAF.Item>
      <PillsAF.Item value={2}>Two</PillsAF.Item>
      <PillsAF.AccentItem value={3}>
        <PillsAF.AccentItem.Addon animatedSparkleCount={5} />
        <PillsAF.AccentItem.Text>Three</PillsAF.AccentItem.Text>
      </PillsAF.AccentItem>
    </PillsAF>

  </Flex>
);

export default Demo;
