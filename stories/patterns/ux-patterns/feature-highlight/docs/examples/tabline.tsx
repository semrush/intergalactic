import { TabLineAF, BadgeAF } from '@semcore/accent-feature';
import { Flex } from '@semcore/base-components';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={4} alignItems='start'>

    <TabLineAF size='m' aria-label='Tabs with highlighted item' defaultValue={1}>
      <TabLineAF.Item value={1}>First option</TabLineAF.Item>
      <TabLineAF.AccentItem value={2}>
        <TabLineAF.AccentItem.Addon animatedSparkleCount={5} />
        <TabLineAF.AccentItem.Text>Second option</TabLineAF.AccentItem.Text>
      </TabLineAF.AccentItem>
      <TabLineAF.Item value={3}>Third option</TabLineAF.Item>
    </TabLineAF>

    <TabLineAF size='l' aria-label='Large tabs with highlighted item' defaultValue={2}>
      <TabLineAF.Item value={1}>First option</TabLineAF.Item>
      <TabLineAF.AccentItem value={2}>
        <TabLineAF.AccentItem.Addon animatedSparkleCount={5} />
        <TabLineAF.AccentItem.Text>Second option</TabLineAF.AccentItem.Text>
        <TabLineAF.Item.Addon><BadgeAF>AI-powered</BadgeAF></TabLineAF.Item.Addon>
      </TabLineAF.AccentItem>
      <TabLineAF.Item value={3}>Third option</TabLineAF.Item>
    </TabLineAF>

  </Flex>
);

export default Demo;
