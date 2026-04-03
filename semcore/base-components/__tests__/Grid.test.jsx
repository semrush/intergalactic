import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import { Col, Row } from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('Grid', () => {
  beforeEach(cleanup);
  shouldSupportClassName(Row);
  shouldSupportRef(Row);

  shouldSupportClassName(Col, Row);
  shouldSupportRef(Col, Row);
});
