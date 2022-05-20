---
title: Local theme
---

If you need to change the style of a component in one specific case, then you should use local customization of styles.

### Step one

You've installed our `component` and our plugin `@semcore/babel-plugin-styles` to properly transpile the code.

```bash
npm i @semcore/button @semcore/babel-plugin-styles
```

### Step two

Add a new rule to your `webpack-config`:

```javascript
    {
      test: /\.js$/,
      include: /\/node_modules\/@semcore\//,
      enforce: 'pre',
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@semcore/babel-plugin-styles']
            ],
          },
        },
      ]
    }
```

### Step three

You wrote your own styles for our components using one of the following methods:

- css-in-js

```jsx
import { sstyled } from '@semcore/core';
const styles = sstyled.css`
  SWhatever {
    some-styles: 'Cool';
  }
`;
```

- good old CSS

```jsx
import styles from './custom.shadow.css';
```

> ⚠️ The extension `.shadow.css` is required

### Step four

Pass the new styles to the `styles` property of our component:

```jsx
import Button from '@semcore/Button';
export default (props) => <Button styles={styles} {...props} />;
```

👯‍ **Congratulations, you've changed the styles of the component!**

### Note

**Rules for writing styles**

Look at the source of styles in GitHub, styles are written in the same format.

- You do not write styles with the `.button` classes, you use the tag names `SButton`.
- By convention, all of our styled tags are capitalized `S + ComponentName`.
- If you need to access the properties of a component, then use `SButton[keybordFocus]` or properties with the value `SButton[size="m"]`.
- If you need properties `:hover` and others, then they are available as usual `SButton:hover`.

**You can use variables as properties.**

```jsx
import { sstyled } from '@semcore/core';
import Button from '@semcore/button';

const styles = sstyled.css`
  SButton {
    background: var(--myCustomProp);
  }
`;

const Demo = () => <Button styles={styles} myCustomProp="red" />;
```

@example sellerly
