import React from 'react';
import Test from 'test';
import Link from '@semcore/link';

export default () => (
  <Link foo="bar" use="hint" before={<Test />}>
    Link
  </Link>
);
