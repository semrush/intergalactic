---
title: Example
fileSource: drag-and-drop
tabs: Drag and drop('drag-and-drop'), A11y('drag-and-drop-a11y'), API('drag-and-drop-api'), Example('drag-and-drop-code'), Changelog('drag-and-drop-changelog')
---

## Use in the DropdownMenu

::: sandbox

<script lang="tsx">
import React from 'react';
import Select from '@semcore/ui/select';
import DnD from '@semcore/ui/drag-and-drop';

const initialOptions = Array(6)
  .fill(0)
  .map((i, idx) => ({
    value: idx,
    title: `Awesome option ${idx}`,
  }));

const Demo = () => {
  const [options, setOptions] = React.useState(initialOptions);

  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }) => {
      const newOptions = [...options];
      newOptions[fromIndex] = options[toIndex];
      newOptions[toIndex] = options[fromIndex];
      setOptions(newOptions);
    },
    [options],
  );

  return (
    <Select multiselect>
      <Select.Trigger />
      <DnD tag={Select.Menu} onDnD={handleDnD}>
        {options.map((option, idx) => {
          const { value, title } = option;
          return (
            <DnD.Draggable tag={Select.Option} value={value} key={idx} pr={5}>
              {title}
            </DnD.Draggable>
          );
        })}
      </DnD>
    </Select>
  );
};


</script>

:::

## Use in TabPanel

::: sandbox

<script lang="tsx">
import React from 'react';
import DnD from '@semcore/ui/drag-and-drop';
import Badge from '@semcore/ui/badge';
import LinkedInM from '@semcore/ui/icon/LinkedIn/m';
import TabPanel from '@semcore/ui/tab-panel';

const icons = {
  social: (
    <TabPanel.Item.Addon>
      <LinkedInM />
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
    <DnD
      tag={TabPanel}
      value={currentTab}
      onChange={(tab) => setCurrentTab(tab as string)}
      onDnD={handleDnD}
    >
      {tabs.map((tab) => (
        <DnD.Draggable placement='bottom' tag={TabPanel.Item} value={tab} key={tab} pb={0}>
          {icons[tab] ?? null}
          <TabPanel.Item.Text>{titles[tab]}</TabPanel.Item.Text>
        </DnD.Draggable>
      ))}
    </DnD>
  );
};


</script>

:::

## Example with use of the drop zone

::: sandbox

<script lang="tsx">
import React from 'react';
import DnD from '@semcore/ui/drag-and-drop';
import Card from '@semcore/ui/card';
import { Row, Col } from '@semcore/ui/grid';

const titles = { backlink: 'Backlink', keyword: 'Keyword', seo: 'On Page SEO' };
const Demo = () => {
  const [items, setItems] = React.useState(['backlink', 'keyword', 'seo']);
  const [saved, setSaved] = React.useState({});
  const handleDnD = React.useCallback(({ fromId, toId }) => {
    if (toId === 'drop-zone') {
      setSaved((saved) => ({ ...saved, [fromId]: true }));
    } else {
      setItems((items) => {
        const newItems = [...items];
        const fromIndex = items.indexOf(fromId);
        const toIndex = items.indexOf(toId);
        newItems[fromIndex] = items[toIndex];
        newItems[toIndex] = items[fromIndex];
        return newItems;
      });
    }
  }, []);

  return (
    <DnD tag={Row} gutter={4} onDnD={handleDnD}>
      <Col span={12} mb={4}>
        <DnD.DropZone h={73} style={{ display: 'flex' }} id='drop-zone'>
          {items
            .filter((item) => saved[item])
            .map((item) => (
              <Card key={item} mr={4}>
                <Card.Title tag='h4' inline my={0}>
                  {titles[item]}
                </Card.Title>
              </Card>
            ))}
        </DnD.DropZone>
      </Col>

      {items
        .filter((item) => !saved[item])
        .map((item) => (
          <Col span={4} mb={4} key={item}>
            <DnD.Draggable placement='top' id={item}>
              <Card>
                <Card.Title tag='h4' inline my={0}>
                  {titles[item]}
                </Card.Title>
              </Card>
            </DnD.Draggable>
          </Col>
        ))}
    </DnD>
  );
};


</script>

:::
