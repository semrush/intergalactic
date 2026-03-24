import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Card from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('Card Dependency imports', () => {
  runDependencyCheckTests('card');
});

describe('Card', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Card);
  shouldSupportRef(Card);

  shouldSupportClassName(Card.Title, Card);
  shouldSupportRef(Card.Title, Card);

  shouldSupportClassName(Card.Description, Card);
  shouldSupportRef(Card.Description, Card);
});
