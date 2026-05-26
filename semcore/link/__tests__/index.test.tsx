import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Link from '../src';

describe('link Dependency imports', () => {
  runDependencyCheckTests('link');
});

describe('Link', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Link,
    Wrapper: React.Fragment,
    props: { children: 'Link' },
    expectedDataUiName: 'Link',
  });

  test('Verify supports custom tag', () => {
    const { getByTestId } = render(
      <>
        <Link tag='button' type='button' data-testid='button-link'>
          Link
        </Link>
        <Link tag='span' data-testid='span-link'>
          Link
        </Link>
      </>,
    );

    expect(getByTestId('button-link').tagName).toBe('BUTTON');
    expect(getByTestId('span-link').tagName).toBe('SPAN');
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
