import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, userEvent, cleanup, waitFor } from '@semcore/testing-utils/testing-library';
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

  test('Verify data-ui-name', () => {
    const bulkTextarea = (
      <BulkTextarea
        defaultValue='first line'
        errors={[{ lineIndex: 0, errorMessage: '' }]}
        showErrors={true}
        maxLines={10}
      >
        <BulkTextarea.Counter />
        <BulkTextarea.InputField commonErrorMessage='Please enter valid values.' />
        <BulkTextarea.ErrorsNavigation />
        <BulkTextarea.ClearAll />
      </BulkTextarea>
    );

    const { container } = render(bulkTextarea);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
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

  test('Verify Clear all clears uncontrolled textarea with empty defaultValue', async () => {
    const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    try {
      const { getByRole, findByRole, queryByRole, container } = render(
        <BulkTextarea
          defaultValue=''
          linesDelimiters={[',']}
          maxLines={10}
          validateOn={['paste']}
          pasteProps={{
            delimiter: '\n',
            skipEmptyLines: true,
            lineProcessing: (line) => line.replace(/http:\/\//, ''),
          }}
          lineProcessing={(line) => line.replace(/http:\/\//, '')}
        >
          <BulkTextarea.Counter />
          <BulkTextarea.InputField commonErrorMessage='Please enter correct movie names.' />
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAll />
        </BulkTextarea>,
      );

      const inputField = getByRole('textbox');

      await userEvent.type(inputField, 'Test');
      expect(inputField.textContent).not.toBe('');

      await userEvent.click(await findByRole('button', { name: 'Clear all' }));

      expect(inputField.innerHTML).toBe('');
      await waitFor(() => expect(queryByRole('button', { name: 'Clear all' })).toBeNull());
      expect(
        container.querySelector('[data-ui-name="BulkTextarea.Counter"]')?.textContent,
      ).toContain('0/10');
    } finally {
      window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    }
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
