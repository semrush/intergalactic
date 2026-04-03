import ThumbUpM from '@semcore/icon/ThumbUp/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
import { PillsFH, BadgeFH } from '@semcore/ui/feature-highlight';
import Pills from '@semcore/ui/pills';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <>
    <PillsFH defaultValue={1}>
      <PillsFH.HighlightedItem value={1}>
        <PillsFH.HighlightedItem.Addon animatedSparkleCount={5} />
        <PillsFH.HighlightedItem.Text m={0}>
          Starts
        </PillsFH.HighlightedItem.Text>
        <PillsFH.HighlightedItem.Addon animatedSparkleCount={5} />
      </PillsFH.HighlightedItem>

      <PillsFH.HighlightedItem value={2}>
        <PillsFH.HighlightedItem.Addon animatedSparkleCount={5}>{0}</PillsFH.HighlightedItem.Addon>
        <PillsFH.HighlightedItem.Text>Number</PillsFH.HighlightedItem.Text>
        <PillsFH.HighlightedItem.Addon>{0}</PillsFH.HighlightedItem.Addon>
      </PillsFH.HighlightedItem>

      <PillsFH.HighlightedItem value={3}>
        <PillsFH.HighlightedItem.Addon animatedSparkleCount={5} tag={ThumbUpM} />
        <PillsFH.HighlightedItem.Text>Icon </PillsFH.HighlightedItem.Text>
        <PillsFH.HighlightedItem.Addon tag={ThumbUpM} />
      </PillsFH.HighlightedItem>

      <PillsFH.HighlightedItem value={4}>
        <PillsFH.HighlightedItem.Addon animatedSparkleCount={4}><BadgeFH>AI-powered</BadgeFH></PillsFH.HighlightedItem.Addon>
        <PillsFH.HighlightedItem.Text>Badge </PillsFH.HighlightedItem.Text>
        <PillsFH.HighlightedItem.Addon animatedSparkleCount={0}><BadgeFH>AI-powered</BadgeFH></PillsFH.HighlightedItem.Addon>
      </PillsFH.HighlightedItem>

      <PillsFH.HighlightedItem value={5}>
        <PillsFH.HighlightedItem.Addon animatedSparkleCount={4}>Test</PillsFH.HighlightedItem.Addon>
        <PillsFH.HighlightedItem.Text>Text </PillsFH.HighlightedItem.Text>
        <PillsFH.HighlightedItem.Addon animatedSparkleCount={0}>Test</PillsFH.HighlightedItem.Addon>

      </PillsFH.HighlightedItem>
    </PillsFH>

  </>
);

export default Demo;
