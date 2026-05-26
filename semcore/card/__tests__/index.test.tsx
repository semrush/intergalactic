import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';

import Card from '../src';

describe('Card Dependency imports', () => {
  runDependencyCheckTests('card');
});

describe('Card', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Card,
    expectedDataUiName: 'Card',
  });

  shouldHaveDataUiName({
    Component: Card.Title,
    Wrapper: Card,
    expectedDataUiName: 'Card.Title',
  });

  shouldHaveDataUiName({
    Component: Card.Description,
    Wrapper: Card,
    expectedDataUiName: 'Card.Description',
  });

  shouldHaveDataUiName({
    Component: Card.Header,
    Wrapper: Card,
    expectedDataUiName: 'Card.Header',
  });

  shouldHaveDataUiName({
    Component: Card.Body,
    Wrapper: Card,
    expectedDataUiName: 'Card.Body',
  });
});
