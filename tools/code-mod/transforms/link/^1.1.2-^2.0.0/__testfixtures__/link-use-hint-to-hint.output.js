import React from 'react';
import Test from 'test';
import Link from '@semcore/link';

import { Hint } from "@semcore/typography";

export default () => (
  <Hint foo="bar">
    <Hint.Addon><Test /></Hint.Addon>
    <Hint.Text>Link</Hint.Text>
  </Hint>
);
