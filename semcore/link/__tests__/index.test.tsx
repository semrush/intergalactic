import React from 'react';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import Link from '../src';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('link Dependency imports', () => {
  runDependencyCheckTests('link');
});

describe('Link', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Link, React.Fragment, { children: 'Link' });
  shouldSupportRef(Link, React.Fragment, { children: 'Link' });

  test('Verify supports custom attributes', () => {
    const { getByTestId } = render(
      <Link data-testid='link' data-name='test'>
        Link
      </Link>,
    );
    expect((getByTestId('link').attributes as any)['data-name'].value).toBe('test');
  });

  test('Verify supports children', async () => {
    const component = (
      <Link>
        <p data-testid='child'>Test</p>
      </Link>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('child')).toBeTruthy();
  });

  test('Verify supports change tag name', () => {
    const { getByTestId } = render(
      <Link data-testid='link' tag='span'>
        Link
      </Link>,
    );
    expect(getByTestId('link').tagName).toBe('SPAN');
  });

  test.sequential('Verify supports inline property', () => {
    const { rerender, getByTestId } = render(<Link data-testid='link'>Link</Link>);
    expect(getByTestId('link').className).not.toContain('inline');
    rerender(
      <Link data-testid='link' inline>
        Link
      </Link>,
    );
    expect(getByTestId('link').className).toContain('inline');
  });

  test('Verify supports noWrap property', () => {
    const { rerender, getByTestId } = render(<Link data-testid='link'>Link</Link>);
    expect(getByTestId('link').className).contains('noWrap');
    rerender(
      <Link data-testid='link' noWrap={false}>
        Link
      </Link>,
    );
    expect(getByTestId('link').className).not.contains('noWrap');
  });
});
