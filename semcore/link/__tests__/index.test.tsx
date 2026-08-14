import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
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

  test('Verify data-ui-name', () => {
    const link = (
      <Link href='#'>
        <Link.Addon />
        <Link.Text />
      </Link>
    );

    const { container } = render(link);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('Verify not use ', () => {
    const { getByTestId } = render(
      <Link data-testid='link' title='Link title'>
        Link
      </Link>,
    );
    expect((getByTestId('link').title)).toBe('');
  });
});
