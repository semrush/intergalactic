import React from 'react';

import cn from 'classnames';
import { createBaseComponent, sstyled } from '@semcore/core';
import { useBox } from '@semcore/flex-box';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import isRetina from '@semcore/core/lib/utils/isRetina';
import countries from './countries.json';

import styles from './style/flags.shadow.css';

export const iso2Name = countries.iso2Name;
export const iso3iso2 = countries.iso3iso2;

// @ts-ignore
const version = preval`
  module.exports = require('../package.json').version
`;
const versionForClassName = version.split('.').join('_');

const normalizeName = (name) => {
  if (!name) return name;
  const noExtensions = name.includes('.') ? name.split('.').slice(0, -1).join('.') : name;
  const noApostrophe = noExtensions.split("'").join('');
  const noSpaces = noApostrophe.split(' ').join('-');
  const noComas = noSpaces.split(',').join('-');
  return noComas.toLowerCase();
};

function getCapitalLetters(iso2, iso3, name) {
  if (name) {
    return name;
  }
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

function calculateName(iso2, iso3, name) {
  const iso3Name = Object.fromEntries(
    Object.entries(iso3iso2).map((pair) => [pair[0], iso2Name[pair[1]]]),
  );
  const allNames = { ...iso2Name, ...iso3Name };
  if (name) return normalizeName(allNames[name.toUpperCase()]);
  if (iso2) return normalizeName(iso2Name[iso2.toUpperCase()]);
  if (iso3) return normalizeName(iso2Name[iso3iso2[iso3.toUpperCase()]]);
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
  const flagsBase =
    globalThis?.__intergalacticFlagsBaseUrl ?? '//static.semrush.com/intergalactic/flags/';
  const { iso2, iso3, name, staticPath = `${flagsBase}${version}` } = props;

  if (!_addedStyle) {
    _addedStyle = addLinkStyleSprite(staticPath);
  }

  const countryName = calculateName(iso2, iso3, name);

  const capitalLetters = countryName ? undefined : getCapitalLetters(iso2, iso3, name);

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

export default createBaseComponent(Flags);
