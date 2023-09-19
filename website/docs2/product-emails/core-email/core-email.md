---
title: Core email colors
tabName: Example
deprecated: true
---

::: warning
:rotating_light: Current `@semcore/email` package is deprecated and not recommend for use. New major version is planned and will be released one day.
:::

## CSS variables

::: react-view

<script lang="tsx">
import React from 'react';

import '@semcore/email/src/core/var.css';
const cssVariableFile = `
@custom-media --desktop (min-width: 480px);
@custom-media --mobile (max-width: 479px);

:root {
  --white: #fff;
  --black: #171a22;
  --blue: #0082e6;
  --light-blue: #6edbff;
  --dark-blue: #0070cc;
  --green: #00bc98;
  --light-green: #45e0a8;
  --dark-green: #008275;
  --lime: #84d149;
  --light-lime: #c7fa73;
  --orange: #ff622d;
  --light-orange: #ff9400;
  --dark-orange: #b23300;
  --red: #f71939;
  --light-red: #f27387;
  --dark-red: #b01c3d;
  --pink: #ff7ad1;
  --purple: #6b30c7;
  --light-purple: #b880ff;
  --dark-purple: #421983;
  --yellow: #ffc200;
  --light-yellow: #ffe84d;
  --violet: #820f87;
  --stroke-gray: #d1d4db;
  --dark-gray: #575c66;
  --gray: #898d9a;
  --light-gray: #f6f7f8;
  --font-family: Helvetica, Arial, sans-serif;
  --fs-100: 14px;
  --lh-100: 20px;
  --fs-200: 16px;
  --lh-200: 24px;
  --fs-300: 18px;
  --lh-300: 23px;
  --fs-400: 20px;
  --lh-400: 22px;
  --fs-500: 22px;
  --lh-500: 26px;
  --fs-600: 26px;
  --lh-600: 31px;
  --fs-700: 32px;
  --lh-700: 37px;
}
`;

const cssVariable = Object.fromEntries(
  cssVariableFile
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('--') && line.endsWith(';'))
    .map((line) => {
      const [name, value] = line.split(': ');
      // remove ";"
      return [name, value.slice(0, -1)];
    }),
);

import Color from '@components/Color';
import { bg_100_400, bg_100_300, bg_100_200, bg } from './utils';

const shades = ['light', '', 'dark'];

const printColor = (name) => (shade) => {
  const varName = shade ? `--${shade}-${name}` : `--${name}`;
  return (
    <Color
      key={varName}
      style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
      name={cssVariable[varName]}
    />
  );
};

const App = () => (
  <>
    {bg_100_300.map((name) => shades.map(printColor(name)))}
    {bg_100_400.map((name) => ['light', 'stroke', '', 'dark'].map(printColor(name)))}
    {bg_100_200.map((name) => shades.slice(0, -1).map(printColor(name)))}
    {bg.map((name) => printColor(name)(''))}
  </>
);
</script>

:::

## Background classes

::: react-view

<script lang="tsx">
import React from 'react';

import '@semcore/email/src/core/var.css';
import './base.css';
import Color from '@components/Color';
import { bg_100_400, bg_100_300, bg_100_200, bg } from './utils';

const shades = ['100', '200', '300'];

const printColor = (name) => (shade) => {
  const className = shade ? `bg-${name}-${shade}` : `bg-${name}`;
  return (
    <Color
      key={className}
      style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
      name={className}
      className={className}
    />
  );
};
const App = () => (
  <>
    {bg_100_300.map((name) => shades.map(printColor(name)))}
    {bg_100_400.map((name) => [...shades, '400'].map(printColor(name)))}
    {bg_100_200.map((name) => shades.slice(0, -1).map(printColor(name)))}
    {bg.map((name) => printColor(name)(''))}
  </>
);
</script>

:::

## Text classes

::: react-view

<script lang="tsx">
import React from 'react';

import '@semcore/email/src/core/var.css';
import Color from '@components/Color';
import { bg_100_400, bg_100_300, bg_100_200, bg } from './utils';

const textCss = `
@custom-media --desktop (min-width: 480px);
@custom-media --mobile (max-width: 479px);

:root {
  --white: #fff;
  --black: #171a22;
  --blue: #0082e6;
  --light-blue: #6edbff;
  --dark-blue: #0070cc;
  --green: #00bc98;
  --light-green: #45e0a8;
  --dark-green: #008275;
  --lime: #84d149;
  --light-lime: #c7fa73;
  --orange: #ff622d;
  --light-orange: #ff9400;
  --dark-orange: #b23300;
  --red: #f71939;
  --light-red: #f27387;
  --dark-red: #b01c3d;
  --pink: #ff7ad1;
  --purple: #6b30c7;
  --light-purple: #b880ff;
  --dark-purple: #421983;
  --yellow: #ffc200;
  --light-yellow: #ffe84d;
  --violet: #820f87;
  --stroke-gray: #d1d4db;
  --dark-gray: #575c66;
  --gray: #898d9a;
  --light-gray: #f6f7f8;
  --font-family: Helvetica, Arial, sans-serif;
  --fs-100: 14px;
  --lh-100: 20px;
  --fs-200: 16px;
  --lh-200: 24px;
  --fs-300: 18px;
  --lh-300: 23px;
  --fs-400: 20px;
  --lh-400: 22px;
  --fs-500: 22px;
  --lh-500: 26px;
  --fs-600: 26px;
  --lh-600: 31px;
  --fs-700: 32px;
  --lh-700: 37px;
}

.text-size-100 {
  font-size: var(--fs-100);
  line-height: var(--lh-100);
}
.text-size-200 {
  font-size: var(--fs-200);
  line-height: var(--lh-200);
}
.text-size-300 {
  font-size: var(--fs-300);
  line-height: var(--lh-300);
}
.text-size-400 {
  font-size: var(--fs-400);
  line-height: var(--lh-400);
}
.text-size-500 {
  font-size: var(--fs-500);
  line-height: var(--lh-500);
}
.text-size-600 {
  font-size: var(--fs-600);
  line-height: var(--lh-600);
}
.text-size-700 {
  font-size: var(--fs-700);
  line-height: var(--lh-700);
}
.text-black {
  color: var(--black);
}
.text-white {
  color: var(--white);
}
.text-red-100 {
  color: var(--light-red);
}
.text-red-200 {
  color: var(--red);
}
.text-red-300 {
  color: var(--dark-red);
}
.text-lime-100 {
  color: var(--light-lime);
}
.text-lime-200 {
  color: var(--lime);
}
.text-orange-100 {
  color: var(--light-orange);
}
.text-orange-200 {
  color: var(--orange);
}
.text-orange-300 {
  color: var(--dark-orange);
}
.text-purple-100 {
  color: var(--light-purple);
}
.text-purple-200 {
  color: var(--purple);
}
.text-purple-300 {
  color: var(--dark-purple);
}
.text-blue-100 {
  color: var(--light-blue);
}
.text-blue-200 {
  color: var(--blue);
}
.text-blue-300 {
  color: var(--dark-blue);
}
.text-gray-100 {
  color: var(--light-gray);
}
.text-gray-200 {
  color: var(--stroke-gray);
}
.text-gray-300 {
  color: var(--gray);
}
.text-gray-400 {
  color: var(--dark-gray);
}
.text-green-100 {
  color: var(--light-green);
}
.text-green-200 {
  color: var(--green);
}
.text-green-300 {
  color: var(--dark-green);
}
.text-pink {
  color: var(--pink);
}
.bg-black {
  background-color: #171a22;
}
.bg-white {
  background-color: #fff;
}
.bg-lime-100 {
  background-color: #c7fa73;
}
.bg-lime-200 {
  background-color: #84d149;
}
.bg-red-100 {
  background-color: #f27387;
}
.bg-red-200 {
  background-color: #f71939;
}
.bg-red-300 {
  background-color: #b01c3d;
}
.bg-orange-100 {
  background-color: #ff9400;
}
.bg-orange-200 {
  background-color: #ff622d;
}
.bg-orange-300 {
  background-color: #b23300;
}
.bg-blue-100 {
  background-color: #6edbff;
}
.bg-blue-200 {
  background-color: #0082e6;
}
.bg-blue-300 {
  background-color: #0070cc;
}
.bg-gray-100 {
  background-color: #f6f7f8;
}
.bg-gray-200 {
  background-color: #d1d4db;
}
.bg-gray-300 {
  background-color: #898d9a;
}
.bg-gray-400 {
  background-color: #575c66;
}
.bg-purple-100 {
  background-color: #b880ff;
}
.bg-purple-200 {
  background-color: #6b30c7;
}
.bg-purple-300 {
  background-color: #421983;
}
.bg-green-100 {
  background-color: #45e0a8;
}
.bg-green-200 {
  background-color: #00bc98;
}
.bg-green-300 {
  background-color: #008275;
}
.bg-pink {
  background-color: #ff7ad1;
}

.link-theme-default {
  color: var(--blue);
}
.link-theme-default:hover {
  color: #0070cc !important;
}

.link-theme-dark {
  color: var(--dark-gray);
}
.link-theme-dark:hover {
  color: var(--black) !important;
}

`;
const shades = ['100', '200', '300'];

const printColor = (name) => (shade) => {
  const className = shade ? `text-${name}-${shade}` : `text-${name}`;
  return (
    <Color
      key={className}
      style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
      name={className}
      className={className}
    >
      TEXT
    </Color>
  );
};

const App = () => {
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = textCss;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <>
      {bg_100_300.map((name) => shades.map(printColor(name)))}
      {bg_100_400.map((name) => [...shades, '400'].map(printColor(name)))}
      {bg_100_200.map((name) => shades.slice(0, -1).map(printColor(name)))}
      {bg.map((name) => printColor(name)(''))}
    </>
  );
};
</script>

:::
