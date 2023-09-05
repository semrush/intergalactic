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

const shades = ['100', '200', '300'];
const styles = `
:root {
  --white: #ffffff;
  --black: #000000;
  --gray-50: #f4f5f9;
  --gray-100: #e0e1e9;
  --gray-200: #c4c7cf;
  --gray-300: #a9abb6;
  --gray-400: #8a8e9b;
  --gray-500: #6c6e79;
  --gray-600: #484a54;
  --gray-700: #2b2e38;
  --gray-800: #191b23;
  --blue-50: #e9f7ff;
  --blue-100: #c4e5fe;
  --blue-200: #8ecdff;
  --blue-300: #2bb3ff;
  --blue-400: #008ff8;
  --blue-500: #006dca;
  --blue-600: #044792;
  --blue-700: #002b5f;
  --blue-800: #001b3d;
  --green-50: #dbfee8;
  --green-100: #9ef2c9;
  --green-200: #59ddaa;
  --green-300: #00c192;
  --green-400: #009f81;
  --green-500: #007c65;
  --green-600: #055345;
  --green-700: #00342d;
  --green-800: #00201e;
  --salad-50: #ecfbcd;
  --salad-100: #c7ee96;
  --salad-200: #9bd85d;
  --salad-300: #66c030;
  --salad-400: #35a21e;
  --salad-500: #0a7e22;
  --salad-600: #005613;
  --salad-700: #003509;
  --salad-800: #002203;
  --orange-50: #fff3d9;
  --orange-100: #ffdca2;
  --orange-200: #ffb26e;
  --orange-300: #ff8c43;
  --orange-400: #ff642d;
  --orange-500: #c33909;
  --orange-600: #8b1500;
  --orange-700: #551200;
  --orange-800: #351000;
  --yellow-50: #fdf7c8;
  --yellow-100: #fce081;
  --yellow-200: #fdc23c;
  --yellow-300: #ef9800;
  --yellow-400: #d87900;
  --yellow-500: #a75800;
  --yellow-600: #743a00;
  --yellow-700: #462500;
  --yellow-800: #2c1600;
  --red-50: #fff0f7;
  --red-100: #ffd7df;
  --red-200: #ffaeb5;
  --red-300: #ff8786;
  --red-400: #ff4953;
  --red-500: #d1002f;
  --red-600: #8e0016;
  --red-700: #58000a;
  --red-800: #410101;
  --pink-50: #fff0ff;
  --pink-100: #ffd3ff;
  --pink-200: #ffa9fa;
  --pink-300: #f67cf2;
  --pink-400: #e14adf;
  --pink-500: #b229b9;
  --pink-600: #7d0480;
  --pink-700: #4d0050;
  --pink-800: #340439;
  --violet-50: #f9f2ff;
  --violet-100: #edd9ff;
  --violet-200: #dcb8ff;
  --violet-300: #c695ff;
  --violet-400: #ab6cfe;
  --violet-500: #8649e1;
  --violet-600: #5925ab;
  --violet-700: #421983;
  --violet-800: #220358;
  --brand-color: #ff642d;
  --pinterest: #bd081c;
  --instagram: #e4405f;
  --youtube: #ff0000;
  --facebook: #3b5998;
  --linkedIn: #1a7ab2;
  --twitter: #2bafeb;
  --google-my-business: #1a73e8;
  --google-blue: #1a0dab;
  --google-green: #016723;

  --keyboard-focus: var(--intergalactic-boxShadow-keyboard-focus);
  --keyborad-focus: var(--intergalactic-boxShadow-keyboard-focus);
  --keyboard-focus-valid: var(--intergalactic-boxShadow-keyboard-focus-valid);
  --keyboard-focus-invalid: var(--intergalactic-boxShadow-keyboard-focus-invalid);

  --rounded-s: 4px;
  --rounded-m: 6px;
  --rounded-l: 12px;

  --form-control-m: 28px;
  --form-control-l: 40px;

  --box-shadow-card: 0px 1px 2px 0px rgba(25, 27, 35, 0.12), 0px 0px 1px 0px rgba(25, 27, 35, 0.16);
  --box-shadow-hover: 3px 3px 30px 0px rgba(25, 27, 35, 0.15);
  --box-shadow-popper: 0px 1px 12px 0px rgba(25, 27, 35, 0.15);
  --box-shadow-modal: 0px 3px 8px 0px rgba(25, 27, 35, 0.2);
  --box-shadow-dnd: 0 0 1px rgba(25, 27, 35, 0.16), 0 12px 40px rgba(25, 27, 35, 0.16);

  --fs-100: 12px;
  --lh-100: 1.33;
  --fs-200: 14px;
  --lh-200: 1.42;
  --fs-300: 16px;
  --lh-300: 1.5;
  --fs-400: 20px;
  --lh-400: 1.2;
  --fs-500: 24px;
  --lh-500: 1.17;
  --fs-600: 32px;
  --lh-600: 1.25;
  --fs-700: 36px;
  --lh-700: 1.1;
  --fs-800: 48px;
  --lh-800: 1.17;

  --disabled-opacity: 0.3;

  --xs-screen: 320px;
  --sm-screen: 768px;
  --md-screen: 1200px;

  /* DEPRECATED START
  */
  --denim-blue: #006dca;
  --light-blue: #008ff8;
  --neon-blue: #8ecdff;
  --cyan: #2bb3ff;
  --green: #009f81;
  --dark-green: #007c65;
  --yellow: #fdc23c;
  --light-orange: #ff8c43;
  --orange: #ff642d;
  --dark-orange: #c33909;
  --red: #ff4953;
  --dark-red: #d1002f;
  --violet: #ab6cfe;
  --dark-violet: #8649e1;
  --pink: #e14adf;
  --asphalt: #6c6e79;
  --wall: #8a8e9b;
  --mist: #a9abb6;
  --mist-light: #c4c7cf;
  --stone: #a9abb6;
  --stone-light: #c4c7cf;
  --gray20: #191b23;
  --gray30: #191b23;
  --gray40: #484a54;
  --gray60: #6c6e79;
  --gray70: #a9abb6;
  --gray80: #c4c7cf;
  --gray94: #e0e1e9;
  --gray96: #f4f5f9;
  --mystic: #f4f5f9;
  --mercury: #e0e1e9;

  --blue50: #e9f7ff;
  --blue100: #c4e5fe;
  --blue400: #008ff8;
  --blue600: #044792;
  --green50: #dbfee8;
  --green100: #9ef2c9;
  --green200: #59ddaa;
  --green300: #00c192;
  --green600: #055345;
  --red50: #fff0f7;
  --red100: #ffd7df;
  --red200: #ffaeb5;
  --red300: #ff8786;
  --red600: #8e0016;
  --orange50: #fff3d9;
  --orange100: #ffdca2;
  --orange200: #ffb26e;
  --yellow100: #fce081;

  --iceberg-blue: #6fafd4;
  --salad: #8bc835;
  --granitic: #2f3439;
  --gray10: #222222;
  --sky: #e1f2ff;
  --lily: #e6f9fd;
  --marble: #f1f6f8;
  --googleplus: #e14b3f;
  --linkedin: #1a7ab2;

  --font-size_-1: 11px;
  --font-size_-2: 10px;
  --font-size_0: 12px;
  --font-size_1: 13px;
  --font-size_11: 33px;
  --font-size_12: 36px;
  --font-size_15: 48px;
  --font-size_2: 14px;
  --font-size_3: 16px;
  --font-size_5: 19px;
  --font-size_6: 21px;
  --font-size_8: 25px;
  /* DEPRECATED END */
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
.link {
  text-decoration-line: underline;
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
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
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
