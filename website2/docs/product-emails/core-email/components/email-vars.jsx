import React from 'react';

import '@semcore/email/core/var.css';
import cssVariableFile from '!!raw-loader!@semcore/email/core/var.css';

const cssVariable = Object.fromEntries(
  cssVariableFile
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('--') && line.endsWith(';'))
    .map((line) => line.split(': ')),
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
