import React from 'react';

import textCss from '!!raw-loader!@semcore/email/lib/typography/index.css';
import Color from 'components/Color';
import { bg_100_400, bg_100_300, bg_100_200, bg } from './utils';

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
export default () => (
  <>
    <style>{textCss}</style>
    {bg_100_300.map((name) => shades.map(printColor(name)))}
    {bg_100_400.map((name) => [...shades, '400'].map(printColor(name)))}
    {bg_100_200.map((name) => shades.slice(0, -1).map(printColor(name)))}
    {bg.map((name) => printColor(name)(''))}
  </>
);
