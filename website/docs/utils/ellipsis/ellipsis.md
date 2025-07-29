---
title: Ellipsis
fileSource: ellipsis
tabs: Design('ellipsis'), API('ellipsis-api')
---

The useEllipsis hook helps determine whether the content of a referenced DOM element fits within its container.
If the content overflows, the hook can automatically apply a CSS class or inline style (e.g., text-overflow: ellipsis) to visually truncate the text.
This is useful for managing long strings in limited-width containers without manual checks.
The hook listens for changes in size and updates dynamically.

Out of the box, you can use `Text` component with ellipsis settings.

::: react-view

<script lang="tsx">
import React from 'react';
import { Text } from '@semcore/typography';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const App = PlaygroundGeneration((preview) => {
  const { radio, text } = preview('Dropdown');

  const trim = radio({
    key: 'trim',
    defaultValue: 'end',
    label: 'Trimming type',
    options: ['end', 'middle'],
  });

  const maxLine = text({
    key: 'maxLine',
    defaultValue: 1,
    label: 'Number of lines',
  });

  const ellipsisProps = {
    trim,
    maxLine,
  };

  return (
    <Text w={200} display="inline-block" ellipsis={ellipsisProps}>
      Intergalactic, planetary, planetary, intergalactic Intergalactic, planetary, planetary,
      intergalactic Intergalactic, planetary, planetary, intergalactic Intergalactic, planetary,
      planetary, intergalactic Another dimension, another dimension Another dimension, another
      dimension Another dimension, another dimension Another dimension, another dimension
      Another dimension, another dimension Another dimension
    </Text>
  );
});
</script>

:::

**Example**: Hot to use an ellipsis hook on a custom element

```javascript
const ref = React.useRef();
const showHint = useEllipsis(ref, { trim: 'middle', maxLine: 1 }); // returns a boolean, that indicates whether the text is cropped

const text = 'Some long text to test ellipsis';

return (
    <>
        <Box ref={ref} w={'100px'}>{text}</Box>
        {showHint && <Hint triggerRef={ref}>{text}</Hint> }
    </>
);

```
