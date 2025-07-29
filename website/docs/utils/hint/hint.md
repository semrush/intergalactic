---
title: Hint
fileSource: hint
tabs: Design('hint'), API('hint-api')
---

The Hint component provides contextual help or guidance to users by displaying a brief message when they interact with an element.
It can be triggered on hover or focus.
Use it to clarify UI behavior, explain form fields, or provide inline tips.
The component supports customizable placement, and show/hide timeouts.

**Example**:

::: react-view

<script lang="tsx">
import React from 'react';
import { Hint } from '@semcore/base-components';
import Button from '@semcore/button';
import FileExportM from '@semcore/icon/FileExport/m';

const App = () => {
  const ref = React.useRef();

    return (
        <>
            <Button ref={ref}>
              <Button.Addon tag={FileExportM}/>
            </Button>
            <Hint triggerRef={ref} placement="right">Export to PDF</Hint> {/* <=== will be shown when the button is hovered of focused */}
        </>
    );
};
</script>

:::

```javascript
import { Hint } from '@semcore/base-components';
import Button from '@semcore/button';
import FileExportM from '@semcore/icon/FileExport/m';

export default () => {
    const ref = React.useRef();

    return (
        <>
            <Button ref={ref}>
                <Button.Addon tag={FileExportM}/>
            </Button>
            <Hint triggerRef={ref}>Export to PDF</Hint> {/* <=== will be shown when the button is hovered of focused */}
        </>
    );
}
```
