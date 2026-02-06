# @semcore/process-css-unplugin

[![version](https://img.shields.io/npm/v/@semcore/process-css-unplugin.svg)](https://www.npmjs.com/@semcore/process-css-unplugin)
[![downloads](https://img.shields.io/npm/dt/@semcore/process-css-unplugin.svg)](https://www.npmjs.com/package/@semcore/process-css-unplugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/semrush/intergalactic/blob/HEAD/LICENSE)

> This plugin is part of the Intergalactic Design System

### 🏠 [Design system](https://developer.semrush.com/intergalactic/)

## Install

```sh
npm install @semcore/process-css-unplugin
```

## Options

```ts
type Options = {
  virtualFilePrefix?: string; // Defines the prefix for a virtual CSS file.
  isolationSuffix?: string; // Defines new isolation suffix for CSS classes.
}
```

## Usage

### Vite

```js
import { defineConfig } from 'vite';
import { processCssVitePlugin } from '@semcore/process-css-unplugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    processCssVitePlugin({
      virtualFilesPrefix: 'myprefix', // Optional
      isolationSuffix: '_my-team_', // Optional
    }),
  ],
});
```

### Webpack

```js
import { processCssWebpackPlugin } from '@semcore/process-css-unplugin';

module.exports = {
  // ...
  plugins: [
    processCssWebpackPlugin({
      virtualFilesPrefix: 'myprefix', // Optional
      isolationSuffix: '_my-team_', // Optional
    }),
  ],
  // ...
};

## 👤 Author

[UI-kit team](https://github.com/semrush/intergalactic/blob/HEAD/MAINTAINERS) and [others ❤️](https://github.com/semrush/intergalactic/graphs/contributors)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/semrush/intergalactic/issues). You can also take a look at the [contributing guide](https://github.com/semrush/intergalactic/blob/HEAD/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/semrush/intergalactic/blob/HEAD/LICENSE) licensed.
