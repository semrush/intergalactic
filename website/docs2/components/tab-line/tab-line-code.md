---
title: TabLine
fileSource: tab-line
tabs: Design('tab-line'), A11y('tab-line-a11y'), API('tab-line-api'), Example('tab-line-code'), Changelog('tab-line-changelog')
---

## Automatic tab activation

Try changing the page size to observe how the tabs are compressed. If the text inside a tab is too long, it will be truncated with an `ellipsis`. You can also place the `<TabLine.Item />` within other components.

::: sandbox

<script lang="tsx">
import React from 'react';
import TabLine from '@semcore/ui/tab-line';
import Badge from '@semcore/ui/badge';
import Tooltip from '@semcore/ui/tooltip';
import LinkedInM from '@semcore/ui/icon/LinkedIn/m';

const Demo = () => {
  const [value, setValue] = React.useState(0);

  return (
    <TabLine onChange={setValue} value={value} aria-label='Page'>
      <TabLine.Item value={0}>Overview</TabLine.Item>
      <TabLine.Item value={1}>Issues</TabLine.Item>
      <TabLine.Item value={2}>
        <TabLine.Item.Addon>
          <LinkedInM />
        </TabLine.Item.Addon>
        <TabLine.Item.Text>LinkedIn</TabLine.Item.Text>
        <TabLine.Item.Addon>
          <Badge bg='green-400'>new</Badge>
        </TabLine.Item.Addon>
      </TabLine.Item>
      <Tooltip title="Progress isn't available during collecting process" placement='top'>
        <TabLine.Item disabled value={3}>
          Progress
        </TabLine.Item>
      </Tooltip>
      <TabLine.Item value={4}>Statistics</TabLine.Item>
    </TabLine>
  );
};


</script>

:::

## Manual tab activation

::: sandbox

<script lang="tsx">
import React from 'react';
import TabLine from '@semcore/ui/tab-line';

const Demo = () => {
  const [value, onChange] = React.useState(1);
  return (
    <>
      <TabLine value={value} onChange={onChange} behavior='manual' aria-label='Page'>
        <TabLine.Item value={1} aria-controls='tab-panel-1'>
          Overview
        </TabLine.Item>
        <TabLine.Item value={2} aria-controls='tab-panel-2'>
          Issues
        </TabLine.Item>
        <TabLine.Item value={3} aria-controls='tab-panel-3'>
          Progress
        </TabLine.Item>
        <TabLine.Item value={4} disabled>
          Disabled
        </TabLine.Item>
      </TabLine>
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


## Custom indents and occupying the entire space

As you might have noticed, the TabLine component doesn't have default margins at the edges. To make the TabLine span the entire width of its parent block (which might have its own margins), you can set the desired `padding` and `margin` for the TabLine component.

```typescript
<Box p={5}>
  <TabLine px={5} mx="-20px" />
</Box>
```
