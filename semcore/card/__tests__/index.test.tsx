import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';

import Card from '../src';

describe('Card Dependency imports', () => {
  runDependencyCheckTests('card');
});

describe('Card', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Card,
    expectedDataUiName: 'Card',
    preset: 'root',
  });

  runComponentContractTests({
    Component: Card.Title,
    Wrapper: Card,
    expectedDataUiName: 'Card.Title',
    preset: 'root',
  });

  runComponentContractTests({
    Component: Card.Description,
    Wrapper: Card,
    expectedDataUiName: 'Card.Description',
    preset: 'root',
  });
});
