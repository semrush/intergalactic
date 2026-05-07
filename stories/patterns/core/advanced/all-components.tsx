import Badge from '@semcore/ui/badge';
import { Box } from '@semcore/ui/flex-box';
import TabLine from '@semcore/ui/tab-line';
import React from 'react';

import { Components } from './components/Components';
import { Graphics } from './components/Graphics';
import { PopupsDialogs } from './components/PopupsDialogs';
import PageHeader from '../../../components/product-head/docs/examples/extended_example';
import { Dashboard } from '../tests/all-components/components/Dashboard';

function Demo({ defaultTab = 1 }: { defaultTab?: number }) {
  const [tab, setTab] = React.useState(defaultTab);

  return (
    <Box w='calc(100vw - 64px)' style={{ background: 'var(--intergalactic-bg-secondary-neutral)' }} p={8}>
      <PageHeader />

      <TabLine size='l' mx={-8} px={8} mt={8} value={tab} onChange={setTab}>
        <TabLine.Item value={1}>
          <TabLine.Item.Text>
            Dashboard
          </TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Badge>new</Badge>
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item value={2}>
          Components
        </TabLine.Item>
        <TabLine.Item value={3}>
          Popups & Dialogs
        </TabLine.Item>
        <TabLine.Item value={4}>
          Graphics
        </TabLine.Item>
      </TabLine>

      {tab === 1 && <Dashboard showPrimaryTableFooter />}
      {tab === 2 && <Components />}
      {tab === 3 && <PopupsDialogs />}
      {tab === 4 && <Graphics />}
    </Box>
  );
}

export default Demo;
