import Badge from '@semcore/ui/badge';
import { Box } from '@semcore/ui/base-components';
import TabLine from '@semcore/ui/tab-line';
import React from 'react';

import { Dashboard } from './components/Dashboard';
import { FeatureHighlight } from './components/FeatureHighlight';
import { Form } from './components/Form';
import { Tables } from './components/Tables';
import PageHeader from '../../../../components/product-head/docs/examples/extended_example';

// not including:
// - dnd with cards/files
// -

function Demo({ defaultTab = 1 }: { defaultTab?: number }) {
  const [tab, setTab] = React.useState(defaultTab);

  return (
    <Box w='calc(100vw - 64px)' style={{ background: 'var(--intergalactic-bg-secondary-neutral)', overflowX: 'clip' }} p={8}>
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
          Form
        </TabLine.Item>
        <TabLine.Item value={4}>
          Feature highlight
        </TabLine.Item>
      </TabLine>

      {tab === 1 && <Tables />}
      {tab === 2 && <Dashboard />}
      {tab === 3 && <Form />}
      {tab === 4 && <FeatureHighlight />}
    </Box>
  );
}

export default Demo;
