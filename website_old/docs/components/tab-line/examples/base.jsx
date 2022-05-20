import React, { useState } from 'react';
import TabLine from '@semcore/tab-line';
import Badge from '@semcore/badge';
import Tooltip from '@semcore/tooltip';
import LinkedInS from '@semcore/icon/LinkedIn/m';

const Demo = () => {
  const [value, updateValue] = useState(0);

  return (
    <TabLine onChange={updateValue} value={value}>
      <TabLine.Item value={0}>Overview</TabLine.Item>
      <TabLine.Item value={1}>Issues</TabLine.Item>
      <TabLine.Item value={2}>
        <TabLine.Item.Addon>
          <LinkedInS />
        </TabLine.Item.Addon>
        <TabLine.Item.Text>LinkedIn</TabLine.Item.Text>
        <TabLine.Item.Addon>
          <Badge bg="green">new</Badge>
        </TabLine.Item.Addon>
      </TabLine.Item>
      <Tooltip title="Progress is not available during collecting process" placement="top">
        <TabLine.Item disabled value={3}>
          Progress
        </TabLine.Item>
      </Tooltip>
      <TabLine.Item value={4}>Statistics</TabLine.Item>
    </TabLine>
  );
};

export default Demo;
