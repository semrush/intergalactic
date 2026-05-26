import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { describe, test, expect, beforeEach, vi, afterEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Badge from '../src';

describe('Badge Dependency imports', () => {
  runDependencyCheckTests('badge');
});

describe('Badge data-ui-name', () => {
  shouldHaveDataUiName({
    Component: Badge,
    props: { type: 'admin' },
    expectedDataUiName: 'Badge',
  });
});

describe('Badge deprecation warnings', () => {
  beforeEach(cleanup);

  let consoleWarnSpy: ReturnType<typeof vi.spyOn<any, any>>;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  test('Should warn when type prop is not provided', () => {
    render(<Badge>Custom</Badge>);

    expect(consoleWarnSpy).toHaveBeenCalled();
    const warnCall = consoleWarnSpy.mock.calls.find((call) =>
      call.some((arg) => typeof arg === 'string' && arg.includes('type')),
    );
    expect(warnCall).toBeDefined();
  });

  test('Should not warn when type prop is provided', () => {
    render(<Badge type='admin' />);

    const warnCall = consoleWarnSpy.mock.calls.find((call) =>
      call.some((arg) => typeof arg === 'string' && arg.includes('type') && arg.includes('required')),
    );
    expect(warnCall).toBeUndefined();
  });
});

describe('Badge backward compatibility (deprecated props)', () => {
  beforeEach(cleanup);

  test('Should support deprecated children prop', () => {
    const { getByText } = render(<Badge>Custom Text</Badge>);
    expect(getByText('Custom Text')).toBeInTheDocument();
  });

  test('Should prioritize type prop over children', () => {
    const { getByText, queryByText } = render(<Badge type='admin'>Custom Text</Badge>);
    expect(getByText('admin')).toBeInTheDocument();
    expect(queryByText('Custom Text')).not.toBeInTheDocument();
  });
});
