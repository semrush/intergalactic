import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Notice, { NoticeSmart } from '../src';

describe('notice Dependency imports', () => {
  runDependencyCheckTests('notice');
});

describe('Notice', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Notice,
    expectedDataUiName: 'Notice',
    preset: 'root',
  });

  test('Verify supports custom close icon', () => {
    const component = (
      <Notice>
        <Notice.Close data-testid='close'>Close Icon</Notice.Close>
      </Notice>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('close')).toBeTruthy();
  });

  test('Verify non-muted theme sets role="region"', () => {
    const { getByTestId } = render(<Notice data-testid='notice' theme='info' />);
    expect(getByTestId('notice').getAttribute('role')).toBe('region');
  });

  test('Verify muted theme does not set role', () => {
    const { getByTestId } = render(<Notice data-testid='notice' theme='muted' />);
    expect(getByTestId('notice').getAttribute('role')).toBeNull();
  });

  test('Verify danger theme sets role="region"', () => {
    const { getByTestId } = render(<Notice data-testid='notice' theme='danger' />);
    expect(getByTestId('notice').getAttribute('role')).toBe('region');
  });

  test('Verify muted theme does not set aria-label', () => {
    const { getByTestId } = render(<Notice data-testid='notice' theme='muted' />);
    expect(getByTestId('notice').getAttribute('aria-label')).toBeNull();
  });

  test('Verify non-muted theme sets aria-label', () => {
    const { getByTestId } = render(<Notice data-testid='notice' theme='info' />);
    expect(getByTestId('notice').getAttribute('aria-label')).toBeTruthy();
  });
});

describe('NoticeSmart', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: NoticeSmart,
    expectedDataUiName: 'NoticeSmart',
    preset: 'leaf',
  });

  test('Verify renders title and text from props', () => {
    const { container } = render(
      <NoticeSmart title='Test Title' text='Test Text' />,
    );
    expect(container.textContent).toContain('Test Title');
    expect(container.textContent).toContain('Test Text');
  });

  test('Verify onClose callback fires', () => {
    const onClose = vi.fn();
    const { container } = render(
      <NoticeSmart text='Content' closable onClose={onClose} />,
    );
    const closeBtn = container.querySelector('[data-ui-name="Notice.Close"]');
    closeBtn.click();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Verify renders actions from prop', () => {
    const { container } = render(
      <NoticeSmart text='Content' actions={<button data-testid='action'>Act</button>} />,
    );
    const action = container.querySelector('[data-testid="action"]');
    expect(action).toBeTruthy();
  });
});
