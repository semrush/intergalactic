---
title: Root reference
tabName: Design
---

> All our components are wrapped in ForwardRef and this component is deprecated.

Root reference is a component for getting the root DOM node of a component.

Sometimes you need to get a node to set focus or apply a third-party plugin. In order not to produce props of the `inputRef/rootRef` type, this utility is created.

**Example**: Get input and set focus manually.

```jsx
import React from 'react';
import Input from '@semcore/input';
import RootRef from '@semcore/root-ref';

const Demo = () => {
  return (
    <Input>
      <RootRef
        rootRef={(input) => {
          if (input) input.focus();
        }}
      >
        <Input.Value placeholder="Set manual focus" />
      </RootRef>
    </Input>
  );
};

export default Demo;
```
