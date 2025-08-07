import { Flex } from '@semcore/flex-box';
import SettingsM from '@semcore/icon/Settings/m';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { cleanup, render, screen, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { Text } from '@semcore/typography';
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
