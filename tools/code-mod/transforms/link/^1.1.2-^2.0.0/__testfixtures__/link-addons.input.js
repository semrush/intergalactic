import React from 'react';
import Link from '@semcore/link';
import Icon from '@semcore/icon';

export default () => [
  <Link before={<Icon test="test" test2={() => 'test2'} />} after={'whatever u want'} other="prop">
    Text
  </Link>,
  <Link after="Test">Text</Link>,
  <Link before={<Icon />}>Text</Link>,
  <Link>Text</Link>,
];
