import { Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { PillsFH, BadgeFH } from '@semcore/ui/feature-highlight';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={4} alignItems='start'>
    <ScreenReaderOnly id='pills-aria-desc'>
      Powered by AI
    </ScreenReaderOnly>

    <PillsFH defaultValue={1} aria-label='Pills with highlighted item'>
      <PillsFH.Item value={1}>One</PillsFH.Item>
      <PillsFH.HighlightedItem
        value={2}
        aria-describedby='pills-aria-desc'
      >
        <PillsFH.HighlightedItem.Addon animatedSparkleCount={5} />
        <PillsFH.HighlightedItem.Text>Two</PillsFH.HighlightedItem.Text>
      </PillsFH.HighlightedItem>
      <PillsFH.Item value={3}>Three</PillsFH.Item>
    </PillsFH>

    <PillsFH
      defaultValue={3}
      aria-label='Large pills with highlighted item'
      size='l'
    >
      <PillsFH.Item value={1}>One</PillsFH.Item>
      <PillsFH.Item value={2}>Two</PillsFH.Item>
      <PillsFH.HighlightedItem value={3}>
        <PillsFH.HighlightedItem.Addon animatedSparkleCount={5} />
        <PillsFH.HighlightedItem.Text>Three</PillsFH.HighlightedItem.Text>
        <PillsFH.HighlightedItem.Addon>
          <BadgeFH>AI-powered</BadgeFH>
        </PillsFH.HighlightedItem.Addon>
      </PillsFH.HighlightedItem>
    </PillsFH>
  </Flex>
);

export default Demo;
