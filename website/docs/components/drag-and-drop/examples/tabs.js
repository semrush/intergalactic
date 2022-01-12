import React from 'react';
import DnD from '@semcore/drag-and-drop';
import Badge from '@semcore/badge';
import LinkedInS from '@semcore/icon/LinkedIn/m';
import TabPanel from '@semcore/tab-panel';

function Demo() {
  return (
    <DnD tag={TabPanel} defaultValue={0}>
      <TabPanel.Item placement="bottom" tag={DnD.Draggable} value={0} pb={0}>
        Overview
      </TabPanel.Item>
      <TabPanel.Item placement="bottom" tag={DnD.Draggable} value={1} pb={0}>
        <TabPanel.Item.Addon>
          <LinkedInS />
        </TabPanel.Item.Addon>
        <TabPanel.Item.Text>Issues</TabPanel.Item.Text>
      </TabPanel.Item>
      <TabPanel.Item placement="bottom" tag={DnD.Draggable} value={2} pb={0}>
        <TabPanel.Item.Text>LinkedIn</TabPanel.Item.Text>
        <TabPanel.Item.Addon>
          <Badge bg="green">new</Badge>
        </TabPanel.Item.Addon>
      </TabPanel.Item>
    </DnD>
  );
}

export default Demo;
