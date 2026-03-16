import Button from '@semcore/ui/button';
import TabLine from '@semcore/ui/tab-line';
import type { TextProps } from '@semcore/ui/typography';
import React, { useState } from 'react';

const ellipsisProps = {
  observeChildrenMutations: true,
  cropPosition: 'middle',
} satisfies TextProps['ellipsis'];

const Demo = () => {
  const [label, setLabel] = useState('Tab label');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TabLine value='tab1' onChange={() => { }}>
        <TabLine.Item value='tab1' wMax={100}>
          <TabLine.Item.Text ellipsis={ellipsisProps}>{label}</TabLine.Item.Text>
        </TabLine.Item>
        <TabLine.Item value='tab2'>Static tab</TabLine.Item>
      </TabLine>
      <div>Actual label: {label}</div>
      <Button onClick={() => setLabel(`Tab ${Math.random()}`)}>
        Update tab label
      </Button>
    </div>
  );
};
export default Demo;
