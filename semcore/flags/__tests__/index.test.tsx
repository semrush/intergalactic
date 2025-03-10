import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import Flags from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('flags Dependency imports', () => {
  runDependencyCheckTests('flags');
}); 

describe('Flags', () => {
  beforeEach(cleanup);

  test.concurrent('Should support className with name country without space', () => {
    const { getByTestId } = render(<Flags data-testid='flags' iso2='EH' />);

    expect(getByTestId('flags').classList[1]).toMatch(/^flag-western-sahara-/);
  });

  test('Should support className with name country and ,', () => {
    const { getByTestId } = render(<Flags data-testid='flags' iso2='BQ' />);

    expect(getByTestId('flags').classList[1]).toMatch(/flag-bonaire--sint-eustatius-and-saba-/);
  });

  test('Should correctly render', () => {
    const { getByTestId } = render(
      <>
        <Flags data-testid='flags' iso2='af' />
        <Flags data-testid='flags2' iso3='afg' />
        <Flags data-testid='flags3' name='afg' />
      </>,
    );

    expect(getByTestId('flags').classList[1]).toMatch(/flag-afghanistan-/);
    expect(getByTestId('flags2').classList[1]).toMatch(/flag-afghanistan-/);
    expect(getByTestId('flags3').classList[1]).toMatch(/flag-afghanistan-/);
  });

  test('Should set styles', () => {
    render(<Flags data-testid='flags' iso2='af' />);

    const link = document.querySelectorAll('[class*=_css-style-flags]')[0];

    expect(link).toBeTruthy();
    expect(link.tagName).toBe('LINK');
  });

  test.skip('Should support no name country', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Flags />
        <Flags iso2={'AA' as any} />
        <Flags iso3={'AAA' as any} />
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async () => {
    const { container } = render(<Flags />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
