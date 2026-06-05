import '@semcore/testing-utils/mockCanvasContext';
import { shouldHaveDataUiName } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';

import { Col, Row } from '../src';

describe('Grid', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Row,
    expectedDataUiName: 'Row',
  });

  shouldHaveDataUiName({
    Component: Col,
    Wrapper: Row,
    expectedDataUiName: 'Row.Col',
  });
});
