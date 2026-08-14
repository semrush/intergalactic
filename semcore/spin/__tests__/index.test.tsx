import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render } from '@semcore/testing-utils/testing-library';
import { describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import Spin from '../src';

describe('spin Dependency imports', () => {
  runDependencyCheckTests('spin');
});

describe('Spin', () => {
  test('Verify data-ui-name', () => {
    const { container } = render(<Spin />);
    expect(extractUIName(container)).toMatchSnapshot();
  });
});
