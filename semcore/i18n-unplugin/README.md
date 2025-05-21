# @semcore/i18n-unplugin

[![version](https://img.shields.io/npm/v/@semcore/i18n-unplugin.svg)](https://www.npmjs.com/@semcore/i18n-unplugin)
[![downloads](https://img.shields.io/npm/dt/@semcore/i18n-unplugin.svg)](https://www.npmjs.com/package/@semcore/i18n-unplugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/semrush/intergalactic/blob/master/LICENSE)

> This component is part of the Intergalactic Design System

### 📖 [Component documentation](https://developer.semrush.com/intergalactic/utils/i18n/#locale-bundle-extracting)

### 🏠 [Design system](https://developer.semrush.com/intergalactic/)

## Install

```sh
npm install intergalactic
```

## Usage

### Vite

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { intergalacticI18nVitePlugin } from 'intergalactic/i18n-unplugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intergalacticI18nVitePlugin({
      bundleLocales: ['es'],
      includeLocales: ['en', 'es'],
    }),
  ],
});
```

### Webpack

```js
var { intergalacticI18nWebpackPlugin } = require('intergalactic/i18n-unplugin');

module.exports = {
  // ...
  plugins: [intergalacticI18nWebpackPlugin()],
  // ...
};
```

### Rollup & esbuild

```js
import { intergalacticI18nRollupPlugin, intergalacticI18nEsbuildPlugin } from 'intergalactic/i18n-unplugin';
// ...
```

## 👤 Author

[UI-kit team](https://github.com/semrush/intergalactic/blob/master/MAINTAINERS) and [others ❤️](https://github.com/semrush/intergalactic/graphs/contributors)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/semrush/intergalactic/issues). You can also take a look at the [contributing guide](https://github.com/semrush/intergalactic/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/semrush/intergalactic/blob/master/LICENSE) licensed.
