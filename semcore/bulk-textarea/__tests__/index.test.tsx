import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import BulkTextarea from '../src';

import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

describe('BulkTextarea', () => {
  beforeEach(cleanup);
});
