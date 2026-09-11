import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { describe, test, expect, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Badge from '../src';

describe('Badge Dependency imports', () => {
  runDependencyCheckTests('badge');
});

describe('Badge', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const badge = <Badge type='new' />;

    const { container } = render(badge);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});
