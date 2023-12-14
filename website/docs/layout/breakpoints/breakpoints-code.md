---
title: Breakpoints
fileSource: breakpoints
tabs: Design('breakpoints'), API('breakpoints-api'), Example('breakpoints-code'), Changelog('breakpoints-changelog')
---

## Simple use

To use breakpoints in your application, you need to wrap it in a `<Breakpoints />` component.
And then you can get the value of the media query in any part of your application through the context.

::: tip
Resize the window to see the changes.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Breakpoints from '@semcore/ui/breakpoints';
import Button from '@semcore/ui/button';

const buttonSizes = ['m', 'l'] as const;

const Example = () => {
  const index = React.useContext(Breakpoints.Context);

  return <Button size={buttonSizes[index]}>Button size {buttonSizes[index]}</Button>;
};

const Demo = () => {
  return (
    <Breakpoints>
      <Example />
    </Breakpoints>
  );
};
</script>

:::

## Manual control

You can use an instance of the `MediaList` class, it has methods `matches`/`addListener`/`removeListener` and `destructor`.

::: sandbox

<script lang="tsx">
import React from 'react';
import Breakpoints from '@semcore/ui/breakpoints';
import Button from '@semcore/ui/button';

const Demo = () => {
  const [index, setIndex] = React.useState(Breakpoints.mediaList.matches());

  React.useEffect(() => {
    const unsubscribe = Breakpoints.mediaList.addListener((index) => {
      setIndex(index);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <Button size={(['m', 'l'] as const)[index]}>Button size {['M', 'L'][index]}</Button>;
};
</script>

:::

## Custom media

If you want to create a custom breakpoint component you need to call the `createBreakpoints()` function and pass an array of media queries.

::: tip
The 'Breakpoints.mediaList.matches()' will return the intex of the first matching media query. From left to right.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { createBreakpoints } from '@semcore/ui/breakpoints';

const MEDIA = [
  '(max-width: 300px)',
  '(max-width: 500px)',
  '(max-width: 700px)',
  '(max-width: 900px)',
  '(max-width: 1100px)',
];
const Breakpoints = createBreakpoints(MEDIA);

const Example = () => {
  const index = React.useContext(Breakpoints.Context);

  return <div>Media matches "{MEDIA[index] || 'ZOOM WINDOW'}"</div>;
};

const Demo = () => {
  return (
    <Breakpoints>
      <Example />
    </Breakpoints>
  );
};
</script>

:::
