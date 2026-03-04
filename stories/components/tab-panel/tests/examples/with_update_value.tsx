import Button from '@semcore/ui/button';
import TabPanel from '@semcore/ui/tab-panel';
import React, { useState } from 'react';

const Demo = () => {
  const [label, setLabel] = useState('Tab label');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TabPanel value='tab1' onChange={() => { }}>
        <TabPanel.Item value='tab1'>{label}</TabPanel.Item>
        <TabPanel.Item value='tab2'>Static tab</TabPanel.Item>
      </TabPanel>
      <div>Actual label: {label}</div>
      <Button onClick={() => setLabel(`Panel ${Math.random()}`)}>
        Update panel label
      </Button>
    </div>
  );
};
export default Demo;
