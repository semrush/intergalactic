import React, { useState } from 'react';
import TabLine from '@semcore/ui/tab-line';
import Badge from '@semcore/ui/badge';
import Tooltip from '@semcore/ui/tooltip';
import LinkedInS from '@semcore/ui/icon/LinkedIn/m';

const Demo = () => {
  const [value, setValue] = useState(0);

  return (
    <TabLine onChange={setValue} value={value} aria-label='Page'>
      <TabLine.Item value={0}>Overview</TabLine.Item>
      <TabLine.Item value={1}>Issues</TabLine.Item>
      <TabLine.Item value={2}>
        <TabLine.Item.Addon>
          <LinkedInS />
        </TabLine.Item.Addon>
        <TabLine.Item.Text>LinkedIn</TabLine.Item.Text>
        <TabLine.Item.Addon>
          <Badge bg='green'>new</Badge>
        </TabLine.Item.Addon>
      </TabLine.Item>
      <Tooltip title='Progress is not available during collecting process' placement='top'>
        <TabLine.Item disabled value={3}>
          Progress
        </TabLine.Item>
      </Tooltip>
      <TabLine.Item value={4}>Statistics</TabLine.Item>
    </TabLine>
  );
};

export default Demo;
