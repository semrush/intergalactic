import React from 'react';
import Link from '@semcore/link';
import Icon from '@semcore/icon';

export default () => [
  <Link other="prop">
    <Link.Addon><Icon test="test" test2={() => 'test2'} /></Link.Addon>
    <Link.Text>Text</Link.Text>
    <Link.Addon>whatever u want</Link.Addon>
  </Link>,
  <Link>
    <Link.Text>Text</Link.Text>
    <Link.Addon>{"Test"}</Link.Addon>
  </Link>,
  <Link>
    <Link.Addon><Icon /></Link.Addon>
    <Link.Text>Text</Link.Text>
  </Link>,
  <Link>Text</Link>,
];
