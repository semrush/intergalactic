import Badge from '@semcore/ui/badge';
import { Box } from '@semcore/ui/base-components';
import TabLine from '@semcore/ui/tab-line';
import React from 'react';

import { Carousel } from './components/Carousel';
import { Controls } from './components/Controls';
import { Dashboard } from './components/Dashboard';
import { FeatureHighlight } from './components/FeatureHighlight';
import { Tables } from './components/Tables';
import PageHeader from '../../../../components/product-head/docs/examples/extended_example';

// not including:
// - dnd with cards/files
// -

function Demo() {
  const [tab, setTab] = React.useState(1);

  return (
    <Box w='calc(100vw - 64px)' style={{ background: 'var(--intergalactic-bg-secondary-neutral)' }} p={8}>
      <PageHeader />

      <TabLine size='l' mx={-8} px={8} mt={8} value={tab} onChange={setTab}>
        <TabLine.Item value={1}>
          Tables
        </TabLine.Item>
        <TabLine.Item value={2}>
          <TabLine.Item.Text>
            Dashboard
          </TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Badge type='new' />
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item value={3}>
          Controls
        </TabLine.Item>
        <TabLine.Item value={4}>
          Carousel
        </TabLine.Item>
        <TabLine.Item value={5}>
          Feature highlight
        </TabLine.Item>
      </TabLine>

      {tab === 1 && <Tables />}
      {tab === 2 && <Dashboard />}
      {tab === 3 && <Controls />}
      {tab === 4 && <Carousel />}
      {tab === 5 && <FeatureHighlight />}
    </Box>
  );
}

export default Demo;
