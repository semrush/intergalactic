import { Flex } from '@semcore/base-components';
import { TabLineFH, BadgeFH } from '@semcore/feature-highlight';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={4}>

    <TabLineFH size='m' aria-label='Tabs with highlighted item' defaultValue={1}>
      <TabLineFH.Item value={1}>First option</TabLineFH.Item>
      <TabLineFH.HighlightedItem value={2}>
        <TabLineFH.HighlightedItem.Addon animatedSparkleCount={5} />
        <TabLineFH.HighlightedItem.Text>Second option</TabLineFH.HighlightedItem.Text>
      </TabLineFH.HighlightedItem>
      <TabLineFH.Item value={3}>Third option</TabLineFH.Item>
    </TabLineFH>

    <TabLineFH size='l' aria-label='Large tabs with highlighted item' defaultValue={2}>
      <TabLineFH.Item value={1}>First option</TabLineFH.Item>
      <TabLineFH.HighlightedItem value={2}>
        <TabLineFH.HighlightedItem.Addon animatedSparkleCount={5} />
        <TabLineFH.HighlightedItem.Text>Second option</TabLineFH.HighlightedItem.Text>
        <TabLineFH.HighlightedItem.Addon><BadgeFH>AI-powered</BadgeFH></TabLineFH.HighlightedItem.Addon>
      </TabLineFH.HighlightedItem>
      <TabLineFH.Item value={3}>Third option</TabLineFH.Item>
    </TabLineFH>

  </Flex>
);

export default Demo;
