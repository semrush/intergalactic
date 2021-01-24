import React from 'react';
import DnD from '@semcore/drag-and-drop';
import Badge from '@semcore/badge';
import LinkedInS from '@semcore/icon/lib/LinkedIn/s';
import TabPanel from '@semcore/tab-panel';

function Demo() {
  return (
    <DnD tag={TabPanel} defaultValue={0}>
      <DnD.Draggable placement="bottom" tag={TabPanel.Item} value={0} pb={0}>
        Overview
      </DnD.Draggable>
      <DnD.Draggable placement="bottom" tag={TabPanel.Item} value={1} pb={0}>
        <TabPanel.Item.Addon>
          <LinkedInS />
        </TabPanel.Item.Addon>
        <TabPanel.Item.Text>Issues</TabPanel.Item.Text>
      </DnD.Draggable>
      <DnD.Draggable placement="bottom" tag={TabPanel.Item} value={2} pb={0}>
        <TabPanel.Item.Text>LinkedIn</TabPanel.Item.Text>
        <TabPanel.Item.Addon>
          <Badge bg="green">new</Badge>
        </TabPanel.Item.Addon>
      </DnD.Draggable>
    </DnD>
  );
}

export default Demo;
