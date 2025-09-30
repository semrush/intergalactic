import TabPanel from '@semcore/ui/tab-panel';
import React from 'react';

const Demo = () => {
  return (
    <>

      <TabPanel defaultValue='instagram' onChange={(val: any) => console.log('Tab changed to', val)}>
        <TabPanel.Item value='facebook'>Facebook</TabPanel.Item>
        <TabPanel.Item value='instagram'>Instagram</TabPanel.Item>
        <TabPanel.Item value='twitter'>Twitter</TabPanel.Item>
      </TabPanel>
    </>
  );
};

export default Demo;
