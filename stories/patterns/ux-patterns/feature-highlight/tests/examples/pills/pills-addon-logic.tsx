import { PillsFH } from '@semcore/ui/feature-highlight';
import React from 'react';

const Demo = () => (
  <PillsFH defaultValue={1}>
    <PillsFH.Item value={1}>One</PillsFH.Item>
    <PillsFH.HighlightedItem value={2}>
      <PillsFH.HighlightedItem.Addon animatedSparkleCount={5} />
      <PillsFH.HighlightedItem.Text>Two</PillsFH.HighlightedItem.Text>
      <PillsFH.HighlightedItem.Addon>{0}</PillsFH.HighlightedItem.Addon>
    </PillsFH.HighlightedItem>
    <PillsFH.Item value={3}>Three</PillsFH.Item>
  </PillsFH>
);

export default Demo;
