import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import Counter from '../src';

describe('Counter Dependency imports', () => {
  runDependencyCheckTests('counter');
});

describe('Counter', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const counter = <Counter>42</Counter>;

    const { container } = render(counter);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});
