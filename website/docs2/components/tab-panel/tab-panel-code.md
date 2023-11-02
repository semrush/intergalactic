---
title: TabPanel
fileSource: tab-panel
tabs: Design('tab-panel'), A11y('tab-panel-a11y'), API('tab-panel-api'), Example('tab-panel-code'), Changelog('tab-panel-changelog')
---

## Basic usage

Try changing the page size to observe how the tabs are compressed. Additionally, you have the flexibility to wrap the `<TabPanel.Item />` in other components.

::: tip
Make sure to provide a tooltip with full text for tabs with text truncated with an `ellipsis`.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import TabPanel from '@semcore/ui/tab-panel';
import Badge from '@semcore/ui/badge';
import Tooltip from '@semcore/ui/tooltip';
import LinkedInM from '@semcore/ui/icon/LinkedIn/m';

const Demo = () => {
  const [value, setValue] = React.useState(0);
  return (
    <TabPanel onChange={setValue} value={value} aria-label='Page'>
      <TabPanel.Item value={0}>Overview</TabPanel.Item>
      <TabPanel.Item value={1}>Issues</TabPanel.Item>
      <TabPanel.Item value={2}>
        <TabPanel.Item.Addon>
          <LinkedInM />
        </TabPanel.Item.Addon>
        <TabPanel.Item.Text>LinkedIn</TabPanel.Item.Text>
        <TabPanel.Item.Addon>
          <Badge bg='bg-primary-success'>new</Badge>
        </TabPanel.Item.Addon>
      </TabPanel.Item>
      <Tooltip title="Progress isn't available during collecting process" placement='top'>
        <TabPanel.Item disabled value={3}>
          Progress
        </TabPanel.Item>
      </Tooltip>
      <TabPanel.Item value={4}>Statistics</TabPanel.Item>
    </TabPanel>
  );
};


</script>

:::

## Custom indents and occupying the entire space

As you may have noticed, the TabPanel doesn't have default margins at the edges. To make the TabPanel span the entire width of its parent block (which may have its own margins), you need to set the desired `padding` and `margin` for it.

```typescript
<Box p={5}>
  <TabPanel px={5} mx="-20px" />
</Box>
```

## Example of accessible TabPanel

::: sandbox

<script lang="tsx">
import React from 'react';
import TabPanel from '@semcore/ui/tab-panel';

const Demo = () => {
  const [value, onChange] = React.useState(1);
  return (
    <>
      <TabPanel value={value} onChange={onChange} aria-label='Page'>
        <TabPanel.Item value={1} aria-controls='tab-panel-1'>
          Overview
        </TabPanel.Item>
        <TabPanel.Item value={2} aria-controls='tab-panel-2'>
          Issues
        </TabPanel.Item>
        <TabPanel.Item value={3} aria-controls='tab-panel-3'>
          Progress
        </TabPanel.Item>
        <TabPanel.Item value={4} disabled>
          Disabled
        </TabPanel.Item>
      </TabPanel>
      {
        [
          <div id='tab-panel-1' role='tabpanel' aria-labelledby='tab-label-1' tabIndex={-1}>
            <h3>Overview</h3>
            <p>
              The important achievement of Apollo was demonstrating that humanity isn't forever
              chained to this planet and our visions go rather further than that and our
              opportunities are unlimited.
            </p>
          </div>,
          <div
            id='tab-panel-2'
            aria-hidden='true'
            role='tabpanel'
            aria-labelledby='tab-label-2'
            tabIndex={-1}
          >
            <h3>Issues</h3>
            <p>
              Never limit yourself because of others' limited imagination; never limit others
              because of your own limited imagination.
            </p>
          </div>,
          <div
            id='tab-panel-3'
            aria-hidden='true'
            role='tabpanel'
            aria-labelledby='tab-label-3'
            tabIndex={-1}
          >
            <h3>Progress</h3>
            <p>
              After Apollo 17, America stopped looking towards the next horizon. The United States
              had become a space-faring nation, but threw it away. We have sacrificed space
              exploration for space exploitation, which is interesting but scarcely visionary.
            </p>
          </div>,
        ][value - 1]
      }
    </>
  );
};
</script>

:::
