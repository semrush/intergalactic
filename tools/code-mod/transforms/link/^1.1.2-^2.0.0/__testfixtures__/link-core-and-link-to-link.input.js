import React from 'react';
import Link, { LinkCore } from '@semcore/link';

export default () => [
  <Link after="☭">Text</Link>,
  <LinkCore foo="bar" size="m">
    <LinkCore.Addon>✞</LinkCore.Addon>
    <LinkCore.Text>Text</LinkCore.Text>
    <LinkCore.Addon>✞</LinkCore.Addon>
  </LinkCore>
];
