import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Link from '../src';

describe('link Dependency imports', () => {
  runDependencyCheckTests('link');
});

describe('Link', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Link,
    Wrapper: React.Fragment,
    props: { children: 'Link' },
    expectedDataUiName: 'Link',
    preset: 'root',
    include: ['tag'],
    tagCases: [
      { tag: 'button', expectedTagName: 'BUTTON', props: { type: 'button' } },
      { tag: 'span', expectedTagName: 'SPAN' },
    ],
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
