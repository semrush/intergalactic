import React from 'react';
import DnD from '@semcore/drag-and-drop';
import TabPanel from '@semcore/tab-panel';
import Counter from '@semcore/counter';
import Flag from '@semcore/flags';

const renderTab = (tab: string) => {
  if (tab === 'overview') {
    return <TabPanel.Item.Text>Overview</TabPanel.Item.Text>;
  } else if (tab === 'activity') {
    return (
      <>
        <TabPanel.Item.Text>Activity</TabPanel.Item.Text> <Counter>23</Counter>
      </>
    );
  } else if (tab === 'users') {
    return <TabPanel.Item.Text>Users</TabPanel.Item.Text>;
  } else if (tab === 'query-log') {
    return <TabPanel.Item.Text>Query Log</TabPanel.Item.Text>;
  } else if (tab === 'geolocation') {
    return (
      <>
        <TabPanel.Item.Addon>
          <Flag iso2='US' />
        </TabPanel.Item.Addon>
        <TabPanel.Item.Text>Geolocation</TabPanel.Item.Text>
      </>
    );
  } else if (tab === 'disabled-tab') {
    return <TabPanel.Item.Text>Disabled Tab</TabPanel.Item.Text>;
  } else {
    return <TabPanel.Item.Text>{tab}</TabPanel.Item.Text>;
  }
};

const disabledTabs = ['disabled-tab'];

const Demo = () => {
  const [tabs, setTabs] = React.useState([
    'overview',
    'activity',
    'users',
    'query-log',
    'geolocation',
    'disabled-tab',
  ]);
  const [currentTab, setCurrentTab] = React.useState('overview');
  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setTabs((tabs) => {
        const newTabs = [...tabs];
        const shift = fromIndex < toIndex ? 1 : -1;
        for (let i = fromIndex; i !== toIndex; i += shift) {
          newTabs[i] = tabs[i + shift];
        }
        newTabs[toIndex] = tabs[fromIndex];
        return newTabs;
      });
    },
    [],
  );

  return (
    <DnD
      tag={TabPanel}
      value={currentTab}
      onChange={(tab: string | number | boolean) => setCurrentTab(tab.toString())}
      onDnD={handleDnD}
      aria-label={'drag-and-drop container'}
    >
      {tabs.map((tab) => (
        <DnD.Draggable
          placement='bottom'
          tag={TabPanel.Item}
          value={tab}
          key={tab}
          pb={0}
          disabled={disabledTabs.includes(tab)}
          aria-label={`${tab} panel`}
        >
          {renderTab(tab)}
        </DnD.Draggable>
      ))}
    </DnD>
  );
};

export default Demo;
