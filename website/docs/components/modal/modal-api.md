---
title: Modal
fileSource: modal
tabs: Design('modal'), A11y('modal-a11y'), API('modal-api'), Example('modal-code'), Changelog('modal-changelog')
---

## Modal

```jsx
import Modal from '@semcore/ui/modal';
<Modal />;
```

<TypesView type="ModalProps" :types={...types} />

## Modal.Overlay

Component which represents the background. Has all properties as [BoxProps](/layout/box-system/box-system-api) prop does.

```jsx
import Modal from '@semcore/ui/modal';
<Modal.Overlay />;
```

## Modal.Window

Component which represents the modal window itself. Has all properties as [BoxProps](/layout/box-system/box-system-api) prop does.

```jsx
import Modal from '@semcore/ui/modal';
<Modal.Window />;
```

## Modal.Close

Component which represents the closing icon. The component is the `CloseS` icon with the configured styles. Has all properties as [BoxProps](/layout/box-system/box-system-api) prop and [IconProps](/style/icon/icon-api) prop does.

```jsx
import Modal from '@semcore/ui/modal';
<Modal.Close />;
```

## Modal.Title

Component which represents the title. It adds `aria-labelledby` attribute to modal window. Has all properties as [TextProps](/style/typography/typography-api) prop does.

```jsx
import Modal from '@semcore/ui/modal';
<Modal.Title />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
