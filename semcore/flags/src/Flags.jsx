import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';
import { createBaseComponent, sstyled } from '@semcore/core';
import { useBox } from '@semcore/flex-box';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import isRetina from '@semcore/utils/lib/isRetina';
import { iso2Name, iso3iso2 } from './countries';

import styles from './style/flags.shadow.css';

// @ts-ignore
const version = preval`
  module.exports = require('../package.json').version
`;
const versionForClassName = version.split('.').join('_');

function setCountryName(countryName) {
  if (typeof countryName !== 'string') return false;
  const name = countryName.replace(/[\s,]/g, '');
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getCapitalLetters(iso2, iso3) {
  if (iso2) {
    return iso2;
  }
  if (iso3) {
    return iso3.slice(0, 2);
  }
  return '__';
}

export const addLinkStyleSprite = (patch) => {
  if (!canUseDOM()) return false;
  const head = window.document.head;
  const prevLink = head.querySelector(`._css-style-flags-${versionForClassName}`);

  if (!prevLink) {
    const link = document.createElement('link');
    link.classList.add(`_css-style-flags-${versionForClassName}`);
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', `${patch}/sprite@${isRetina() ? '2' : '1'}x.css`);
    document.head.appendChild(link);
  }

  return true;
};

let _addedStyle = false;

function calculateName(iso2, iso3) {
  if (iso2) return setCountryName(iso2Name[iso2.toUpperCase()]);
  if (iso3) return setCountryName(iso2Name[iso3iso2[iso3.toUpperCase()]]);
  return false;
}

function Flags(props, ref) {
  const [SFlags, { className, ...other }] = useBox(
    {
      tag: 'span',
      'data-ui-name': 'Flags',
      ...props,
    },
    ref,
  );
  const { iso2, iso3, staticPath = `//static.semrush.com/ui-kit/flags/${version}` } = props;

  if (!_addedStyle) {
    _addedStyle = addLinkStyleSprite(staticPath);
  }

  const countryName = calculateName(iso2, iso3);

  const capitalLetters = countryName ? undefined : getCapitalLetters(iso2, iso3);

  return sstyled(styles)(
    <SFlags
      className={cn(
        {
          [`flag-${versionForClassName}`]: countryName,
          [`flag-${countryName}-${versionForClassName}`]: countryName,
        },
        className,
      )}
      data-capital-letters={capitalLetters}
      {...other}
    />,
  );
}

Flags.displayName = 'Flags';

export { iso2Name, iso3iso2 };
export default createBaseComponent(Flags);
