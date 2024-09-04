---
title: Portal
fileSource: portal
tabs: Design('portal'), API('portal-api'), Changelog('portal-changelog')
---

The component is child element rendering in a DOM node that exists outside of the parent component's DOM hierarchy (portal).

"Under the hood" `ReactDOM.createPortal(child, container)` is used with the ability to cancel the portal creation and to render the child component side by side in the parent. You can also specify the DOM-node to which you want to render the “children".

**Example**: select inside a modal window

```javascript
<Modal>
  <Select disablePortal>Content</Portal>
</Modal>
```

Or

```javascript
const $ref = React.useRef(null)
<Modal ref={$ref}>
  <PortalProvider value={$ref}>
    <Select/>
  </PortalProvider>
<Modal>
```

