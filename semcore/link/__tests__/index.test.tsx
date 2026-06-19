import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Link from '../src';

describe('link Dependency imports', () => {
  runDependencyCheckTests('link');
});

describe('Link', () => {
  beforeEach(cleanup);

  test('Verify not use ', () => {
    const { getByTestId } = render(
      <Link data-testid='link' title='Link title'>
        Link
      </Link>,
    );
    expect((getByTestId('link').title)).toBe('');
  });
});
