---
title: API
fileSource: modal
---

@## Modal

```jsx
import Modal from '@semcore/ui/modal';
<Modal />;
```

@typescript IModalProps

@## Modal.Overlay

Component which represents the background. Takes all properties of the `Box`.

```jsx
import Modal from '@semcore/ui/modal';
<Modal.Overlay />;
```

@## Modal.Window

Component which represents the modal window itself. Takes all properties of the `Box`.

```jsx
import Modal from '@semcore/ui/modal';
<Modal.Window />;
```

@## Modal.Close

Component which represents the closing icon. The component is the `CloseS` icon with the configured styles. It takes all `Box` and `Icon` properties.

```jsx
import Modal from '@semcore/ui/modal';
<Modal.Close />;
```

@## Modal.Title

Component which represents the title. It adds `aria-labelledby` attribute to modal window. Takes all properties of the `Text`.

```jsx
import Modal from '@semcore/ui/modal';
<Modal.Title />;
```
