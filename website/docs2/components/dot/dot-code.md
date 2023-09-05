---
title: Example
fileSource: dot
tabs: Dot('index'), A11y('dot-a11y'), API('dot-api'), Example('dot-code'), Changelog('dot-changelog')
---

## Example of dot animation

For the animation of appearance and hiding, it is correct not to delete an element from DOM, but to pass the `hidden` value.

::: sandbox

<script lang="tsx">
import React from 'react';
import NotificationM from '@semcore/ui/icon/Notification/m';
import Button from '@semcore/ui/button';
import Dot from '@semcore/ui/dot';

const Demo = () => {
  const [dotVisible, setDotVisible] = React.useState(true);

  React.useEffect(() => {
    if (dotVisible) return;
    const timeoutId = setTimeout(() => setDotVisible(true), 3000);
    return () => clearTimeout(timeoutId);
  }, [dotVisible]);
  const handleClick = React.useCallback(() => setDotVisible(false), []);

  return (
    <Button onClick={handleClick} aria-label='Read notifications'>
      <NotificationM />
      <Dot up hidden={!dotVisible} size='l' aria-label='You have notifications to read' />
    </Button>
  );
};
</script>

:::
