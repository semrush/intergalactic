import React from 'react';

import cssVariable from '!css-variables-loader!@semcore/email/lib/core/var.css';
import Color from 'components/Color';
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
