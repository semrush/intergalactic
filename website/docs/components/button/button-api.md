---
title: API
---

@## Button

Modified button component (`type=button` by default), it can do `loading` and add Addons to itself 💪

```jsx
import Button from '@semcore/button';
<Button />;
```

@interface IButtonProps

@## Button.Addon

The addon is inside the button (most often it is an icon), it sets the correct margins depending on the size. It takes all properties of the `Box`.

```jsx
import Button from '@semcore/button';
<Button.Addon />;
```

@## Button.Text

Plain text, it sets the correct margins depending on the button size. If the button uses just text without addons, it will automatically turn into the `Button.Text`. It takes all properties of the `Box`.

```jsx
import Button from '@semcore/button';
<Button.Text />;
```
