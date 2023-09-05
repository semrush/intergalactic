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

export default () => (
  <>
    {bg_100_300.map((name) => shades.map(printColor(name)))}
    {bg_100_400.map((name) => ['light', 'stroke', '', 'dark'].map(printColor(name)))}
    {bg_100_200.map((name) => shades.slice(0, -1).map(printColor(name)))}
    {bg.map((name) => printColor(name)(''))}
  </>
);
