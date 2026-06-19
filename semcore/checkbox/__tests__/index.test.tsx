import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi, assertType } from '@semcore/testing-utils/vitest';
import React from 'react';

import Checkbox from '../src';

describe('Checkbox Dependency imports', () => {
  runDependencyCheckTests('checkbox');
});

describe('Checkbox', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const checkbox = (
      <Checkbox>
        <Checkbox.Value>
          <Checkbox.Value.Control />
          <Checkbox.Value.CheckMark />
        </Checkbox.Value>
        <Checkbox.Text />
      </Checkbox>
    );

    const { container } = render(checkbox);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test.concurrent(
    'Verify Control has aria-label, aria-labelledby, aria-describedby from root',
    async () => {
      const { getByTestId } = render(
        <Checkbox
          aria-label='test aria label'
          aria-labelledby='test aria labelledby'
          aria-describedby='test aria describedby'
          data-testid='checkboxContainer'
        >
          <Checkbox.Value>
            <Checkbox.Value.Control data-testid='checkboxControl' />
            <Checkbox.Value.CheckMark data-testid='checkboxCheckMark' />
          </Checkbox.Value>
        </Checkbox>,
      );

      expect(getByTestId('checkboxControl')).toHaveAttribute('aria-label', 'test aria label');
      expect(getByTestId('checkboxControl')).toHaveAttribute(
        'aria-labelledby',
        'test aria labelledby',
      );
      expect(getByTestId('checkboxControl')).toHaveAttribute(
        'aria-describedby',
        'test aria describedby',
      );

      expect(getByTestId('checkboxCheckMark')).not.toHaveAttribute('aria-label', 'test aria label');
      expect(getByTestId('checkboxContainer')).not.toHaveAttribute('aria-label', 'test aria label');

      expect(getByTestId('checkboxCheckMark')).not.toHaveAttribute(
        'aria-labelledby',
        'test aria labelledby',
      );
      expect(getByTestId('checkboxContainer')).not.toHaveAttribute(
        'aria-labelledby',
        'test aria labelledby',
      );

      expect(getByTestId('checkboxCheckMark')).not.toHaveAttribute(
        'aria-describedby',
        'test aria describedby',
      );
      expect(getByTestId('checkboxContainer')).not.toHaveAttribute(
        'aria-describedby',
        'test aria describedby',
      );
    },
  );

  // Checkbox.Value onChange must be typed as (checked: boolean, e?)
  test('Verify Checkbox.Value onChange typing accepts (checked: boolean, event)', () => {
    assertType<JSX.Element>(
      <Checkbox>
        <Checkbox.Value
          onChange={(checked) => {
            const value: boolean = checked;
            void value;
          }}
        />
      </Checkbox>,
    );

    assertType<JSX.Element>(
      <Checkbox>
        <Checkbox.Value
          onChange={(checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => {
            void checked;
            void e;
          }}
        />
      </Checkbox>,
    );

    assertType<JSX.Element>(
      <Checkbox>
        <Checkbox.Value
          // @ts-expect-error first arg of Checkbox.Value onChange is boolean, not a DOM event
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            void e.target;
          }}
        />
      </Checkbox>,
    );
  });

  test.concurrent(
    'Verify Checkbox.Value onChange fires with (checked: boolean, event)',
    async () => {
      const spy = vi.fn();
      const { getByTestId } = render(
        <Checkbox>
          <Checkbox.Value onChange={spy}>
            <Checkbox.Value.Control data-testid='valueOnChangeControl' />
            <Checkbox.Value.CheckMark />
          </Checkbox.Value>
        </Checkbox>,
      );

      await userEvent.click(getByTestId('valueOnChangeControl'));

      expect(spy).toHaveBeenCalledTimes(1);
      const [checked, event] = spy.mock.calls[0];
      expect(checked).toBe(true);
      expect(typeof checked).toBe('boolean');
      expect(event).toBeDefined();

      await userEvent.click(getByTestId('valueOnChangeControl'));

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.mock.calls[1][0]).toBe(false);
    },
  );

  test.concurrent(
    'Verify both Checkbox onChange and Checkbox.Value onChange fire on click',
    async () => {
      const rootSpy = vi.fn();
      const valueSpy = vi.fn();
      const { getByTestId } = render(
        <Checkbox onChange={rootSpy}>
          <Checkbox.Value onChange={valueSpy}>
            <Checkbox.Value.Control data-testid='bothHandlersControl' />
            <Checkbox.Value.CheckMark />
          </Checkbox.Value>
        </Checkbox>,
      );

      await userEvent.click(getByTestId('bothHandlersControl'));

      expect(rootSpy).toHaveBeenCalledTimes(1);
      expect(valueSpy).toHaveBeenCalledTimes(1);
      expect(rootSpy.mock.calls[0][0]).toBe(true);
      expect(valueSpy.mock.calls[0][0]).toBe(true);
      expect(typeof rootSpy.mock.calls[0][0]).toBe('boolean');
      expect(typeof valueSpy.mock.calls[0][0]).toBe('boolean');
    },
  );
});
