import { runComponentContractTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';

import { Col, Row } from '../src';

describe('Grid', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Row,
    expectedDataUiName: 'Row',
    preset: 'root',
  });

  runComponentContractTests({
    Component: Col,
    Wrapper: Row,
    expectedDataUiName: 'Row.Col',
    preset: 'root',
  });
});
