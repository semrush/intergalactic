import type { Intergalactic } from '@semcore/core';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi, assertType } from '@semcore/testing-utils/vitest';
import React from 'react';

import Pills from '../src';

describe('pills Dependency imports', () => {
  runDependencyCheckTests('pills');
});

describe('PillGroup', () => {
  describe('Types', () => {
    const any: any = null;
    test('Verify props nesting', () => {
      const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;

      assertType<JSX.Element>(<Pills tag={Link} href='https://google.com' xProp1={1} />);
      // @ts-expect-error
      assertType<JSX.Element>(<Pills href='https://google.com' />);
    });
    test('Verify value&onChange relation', () => {
      assertType<JSX.Element>(<Pills value={1} onChange={(value: number) => {}} />);
      // @ts-expect-error
      assertType<JSX.Element>(<Pills value={1} onChange={(value: string) => {}} />);
    });
  });

  beforeEach(cleanup);

  test.concurrent('Verify supports onChange callback', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Pills value={1 as number} onChange={spy}>
        <Pills.Item value={1}>1</Pills.Item>
        <Pills.Item value={2}>1</Pills.Item>
        <Pills.Item value={3}>1</Pills.Item>
        <Pills.Item value={4} data-testid='tab-4'>
          1
        </Pills.Item>
      </Pills>,
    );

    await userEvent.click(getByTestId('tab-4'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Verify supports onClick on Pill', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Pills value={1}>
        <Pills.Item value={1}>1</Pills.Item>
        <Pills.Item value={2}>1</Pills.Item>
        <Pills.Item value={3}>1</Pills.Item>
        <Pills.Item value={4} onClick={spy} data-testid='tab-4'>
          1
        </Pills.Item>
      </Pills>,
    );

    await userEvent.click(getByTestId('tab-4'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Verify not calls PillGroup onChange after falsy onClick on Pill', async () => {
    const spy = vi.fn();
    const spyClick = vi.fn(() => false);
    const { getByTestId } = render(
      <Pills value={1} onChange={spy}>
        <Pills.Item value={1}>1</Pills.Item>
        <Pills.Item value={2}>2</Pills.Item>
        <Pills.Item value={3}>3</Pills.Item>
        <Pills.Item value={4} data-testid='tab-4' onClick={spyClick}>
          4
        </Pills.Item>
      </Pills>,
    );

    await userEvent.click(getByTestId('tab-4'));
    expect(spy).toHaveBeenCalledTimes(0);
    expect(spyClick).toHaveBeenCalledTimes(1);
  });

  test('Verify not supports clicks on disabled tab', async () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <Pills value={1} onChange={spy}>
        <Pills.Item value={1}>1</Pills.Item>
        <Pills.Item value={2}>3</Pills.Item>
        <Pills.Item value={3}>4</Pills.Item>
        <Pills.Item value={3} data-testid='tab-4' disabled>
          4
        </Pills.Item>
      </Pills>,
    );

    await expect(userEvent.click(getByTestId('tab-4'))).rejects.toThrow('pointer-events: none');

    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Verify behavior=manual', async () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <Pills behavior='manual' defaultValue={1} onChange={spy}>
        <Pills.Item value={1} data-testid='behavior=manual_pill1'>
          1
        </Pills.Item>
        <Pills.Item value={2} data-testid='behavior=manual_pill2'>
          2
        </Pills.Item>
        <Pills.Item value={3}>3</Pills.Item>
      </Pills>,
    );

    await userEvent.keyboard('[Tab]');
    expect(getByTestId('behavior=manual_pill1')).toHaveFocus();

    await userEvent.keyboard('[ArrowRight]');
    expect(getByTestId('behavior=manual_pill2')).toHaveFocus();
    expect(spy).not.toBeCalled();

    await userEvent.keyboard('[ArrowRight]');
    await userEvent.keyboard('[Enter]');
    expect(spy).toBeCalledWith(3, expect.anything());
  });

  test('Verify behavior=auto', async () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <Pills behavior='auto' defaultValue={1} onChange={spy}>
        <Pills.Item value={1} data-testid='behavior=auto_pill1'>
          1
        </Pills.Item>
        <Pills.Item value={2} data-testid='behavior=auto_pill2'>
          2
        </Pills.Item>
        <Pills.Item value={3}>3</Pills.Item>
      </Pills>,
    );

    await userEvent.keyboard('[Tab]');
    expect(getByTestId('behavior=auto_pill1')).toHaveFocus();

    await userEvent.keyboard('[ArrowRight]');
    expect(getByTestId('behavior=auto_pill2')).toHaveFocus();
    expect(spy).toBeCalledWith(2, expect.anything());

    await userEvent.keyboard('[ArrowRight]');
    await userEvent.keyboard('[Enter]');
    expect(spy).toBeCalledWith(3, expect.anything());
  });
});
