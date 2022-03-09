import React from 'react';
import { LinkCore as Foo } from '@semcore/link';

export default () => (
  <Foo size="xl" theme="invert">
    <Foo.Addon>test</Foo.Addon>
    <Foo.Text>Text</Foo.Text>
    <Foo.Addon>!</Foo.Addon>
  </Foo>
);
