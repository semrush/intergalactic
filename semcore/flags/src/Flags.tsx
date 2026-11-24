import { useBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import isRetina from '@semcore/core/lib/utils/isRetina';
import cn from 'classnames';
import React from 'react';

import countries from './countries.json';
import type { NSFlags } from './Flags.type';
import styles from './style/flags.shadow.css';

export const iso2Name = countries.iso2Name;
export const iso3iso2 = countries.iso3iso2;

// @ts-ignore
const version = preval`
  module.exports = require('../package.json').version
`;
const versionForClassName = version.split('.').join('_');

const normalizeName = (name: string) => {
  if (!name) return name;
  const noExtensions = name.includes('.') ? name.split('.').slice(0, -1).join('.') : name;
  const noApostrophe = noExtensions.split('\'').join('');
  const noSpaces = noApostrophe.split(' ').join('-');
  const noComas = noSpaces.split(',').join('-');
  return noComas.toLowerCase();
};

function getCapitalLetters(iso2?: NSFlags.Iso2, iso3?: NSFlags.Iso3, name?: NSFlags.Iso2 | NSFlags.Iso3) {
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

export const addLinkStyleSprite = (patch: string) => {
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

function calculateName(iso2?: NSFlags.Iso2, iso3?: NSFlags.Iso3, name?: NSFlags.Iso2 | NSFlags.Iso3) {
  const iso2NameMap: Record<string, string> = iso2Name;
  const iso3iso2Map: Record<string, string> = iso3iso2;
  const iso3Name = Object.fromEntries(Object.entries(iso3iso2Map).map((pair) => [pair[0], iso2NameMap[pair[1]]]));
  const allNames: Record<string, string> = { ...iso2NameMap, ...iso3Name };
  if (name) return normalizeName(allNames[name.toUpperCase()]);
  if (iso2) return normalizeName(iso2NameMap[iso2.toUpperCase()]);
  if (iso3) return normalizeName(iso2NameMap[iso3iso2Map[iso3.toUpperCase()]]);
  return false;
}

function Flags(
  props: Intergalactic.InternalTypings.InferComponentProps<NSFlags.Component>,
  ref: React.Ref<HTMLDivElement>,
) {
  const [SFlags, { className, ...other }] = useBox(
    // @ts-ignore
    {
      'tag': 'span',
      'data-ui-name': 'Flags',
      ...props,
    },
    ref,
  );
  const flagsBase =
    (globalThis as { __intergalacticFlagsBaseUrl?: string })?.__intergalacticFlagsBaseUrl ??
    '//static.semrush.com/intergalactic/flags/';
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

export default createBaseComponent<NSFlags.Component>(Flags);
