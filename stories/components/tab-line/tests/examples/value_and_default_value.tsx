import TabLine from '@semcore/ui/tab-line';
import React from 'react';

const Demo = () => {
  return (
    <>

      <TabLine defaultValue='instagram' onChange={(val: any) => console.log('Tab changed to', val)}>
        <TabLine.Item value='facebook'>Facebook</TabLine.Item>
        <TabLine.Item value='instagram'>Instagram</TabLine.Item>
        <TabLine.Item value='twitter'>Twitter</TabLine.Item>
      </TabLine>
    </>
  );
};

export default Demo;
