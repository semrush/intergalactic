import { useBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, sstyled } from '@semcore/core';
import React from 'react';

import countries from './countries.json';
import type { NSFlags } from './Flags.type';
import styles from './style/flags.shadow.css';

// leave it for the upcoming plugin implementation.
declare const __SEMCORE_FLAGS_STATIC_PATH__: string | undefined;
declare const preval: any;

export const iso2Name = countries.iso2Name;
export const iso3iso2 = countries.iso3iso2;
export const nonIsoName = countries.noneIsoName;

const version = preval`
  module.exports = require('../package.json').version
`;

const defaultStaticPath =
  typeof __SEMCORE_FLAGS_STATIC_PATH__ !== 'undefined'
    ? __SEMCORE_FLAGS_STATIC_PATH__
    : `//static.semrush.com/intergalactic/flags/${version}`;

function resolveFileName(
  iso2?: NSFlags.Props['iso2'],
  iso3?: NSFlags.Props['iso3'],
  name?: NSFlags.Props['name'],
): string | null {
  const code = name ?? iso3 ?? iso2;

  if (code === undefined) return null;

  const upperCode = code.toUpperCase();

  if (upperCode in iso3iso2) {
    return iso3iso2[upperCode as keyof typeof iso3iso2];
  }

  if (upperCode in iso2Name || upperCode in nonIsoName) {
    return upperCode;
  }

  return null;
}

function Flags(
  props: Intergalactic.InternalTypings.InferComponentProps<NSFlags.Component>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { iso2, iso3, name, staticPath = defaultStaticPath, ...restProps } = props;

  const [SFlags, { className, ...other }] = useBox(
    {
      'tag': 'img',
      'data-ui-name': 'Flags',
      ...restProps,
    },
    ref,
  );

  const fileName = resolveFileName(iso2, iso3, name);

  if (fileName === null) return null;

  return sstyled(styles)(
    <SFlags
      src={`${staticPath}/${fileName}.svg`}
      {...other}
    />,
  );
}

Flags.displayName = 'Flags';

export default createBaseComponent<NSFlags.Component>(Flags);
