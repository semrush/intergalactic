import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, userEvent, cleanup } from '@semcore/testing-utils/testing-library';
import { describe, test, vi, assertType, expect, afterEach, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import BulkTextarea from '../src';

describe('BulkTextarea Dependency imports', () => {
  runDependencyCheckTests('bulk-textarea');
});

describe('BulkTextarea OnChange', () => {
  beforeEach(() => {
    cleanup();
  });
  afterEach(() => {
    cleanup();
  });
  test('Verify value&onChange relation', () => {
    assertType<JSX.Element>(<BulkTextarea value='' onChange={(value: string) => { }} />);
    assertType<JSX.Element>(<BulkTextarea value={[]} onChange={(value: string[]) => { }} />);
    // @ts-expect-error
    assertType<JSX.Element>(<BulkTextarea value={[]} onChange={(value: string) => { }} />);
    // @ts-expect-error
    assertType<JSX.Element>(<BulkTextarea value='' onChange={(value: string[]) => { }} />);
  });

  test('Verify onChange return the same type as value', async () => {
    const changedValue = ['1', '2', '3'];
    const initValue = 'init value';
    let valueInCb: string | string[] | null = null;
    let value: string | string[] = initValue;
    const spy = vi.fn((v) => {
      value = changedValue;
      valueInCb = v;
    });

    const { rerender } = render(
      <BulkTextarea w={400} value={value} onChange={spy}>
        <BulkTextarea.InputField commonErrorMessage='' />
      </BulkTextarea>,
    );

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');

    expect(spy).toHaveBeenCalledWith(initValue, expect.anything());
    expect(typeof valueInCb).toBe('string');

    rerender(
      <BulkTextarea w={400} value={value} onChange={spy}>
        <BulkTextarea.InputField commonErrorMessage='' />
      </BulkTextarea>,
    );

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');

    expect(spy).toHaveBeenCalledWith(changedValue, expect.anything());
    expect(Array.isArray(valueInCb)).toBe(true);
  });
});

describe('BulkTextarea onImmediatelyChange', () => {
  test('Verify onImmediatelyChange calls when character entered', async () => {
    const handleImmediatelyChange = vi.fn();
    const { getByRole } = render(
      <BulkTextarea value='' onImmediatelyChange={handleImmediatelyChange}>
        <BulkTextarea.InputField commonErrorMessage='' />
      </BulkTextarea>,
    );

    const inputField = getByRole('textbox');

    await userEvent.type(inputField, 'O');
    expect(handleImmediatelyChange).toHaveBeenLastCalledWith(['O'], 'O');
  });
});
