import React from 'react';
import DnD from '@semcore/ui/drag-and-drop';
import Badge from '@semcore/ui/badge';
import LinkedInS from '@semcore/ui/icon/LinkedIn/m';
import TabPanel from '@semcore/ui/tab-panel';

const icons = {
  social: (
    <TabPanel.Item.Addon>
      <LinkedInS />
    </TabPanel.Item.Addon>
  ),
  issues: (
    <TabPanel.Item.Addon>
      <Badge bg='red'>new</Badge>
    </TabPanel.Item.Addon>
  ),
};
const titles = {
  overview: 'Overview',
  issues: 'Issues',
  social: 'LinkedIn',
};

const Demo = () => {
  const [tabs, setTabs] = React.useState(['overview', 'issues', 'social']);
  const [currentTab, setCurrentTab] = React.useState('overview');
  const handleDnD = React.useCallback(({ fromIndex, toIndex }) => {
    setTabs((tabs) => {
      const from = tabs[fromIndex];
      tabs[fromIndex] = tabs[toIndex];
      tabs[toIndex] = from;
      return [...tabs];
    });
  }, []);

  return (
    <DnD tag={TabPanel} value={currentTab} onChange={setCurrentTab} onDnD={handleDnD}>
      {tabs.map((tab) => (
        <DnD.Draggable placement='bottom' tag={TabPanel.Item} value={tab} key={tab} pb={0}>
          {icons[tab] ?? null}
          <TabPanel.Item.Text>{titles[tab]}</TabPanel.Item.Text>
        </DnD.Draggable>
      ))}
    </DnD>
  );
};

export default Demo;
