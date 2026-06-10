import type { Intergalactic } from '@semcore/core';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi, assertType } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import TabLine from '../src';

describe('tab-line Dependency imports', () => {
  runDependencyCheckTests('tab-line');
});

describe('TabLine', () => {
  describe('Types', () => {
    const any: any = null;
    test('Verify props nesting', () => {
      const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;

      assertType<JSX.Element>(<TabLine tag={Link} href='https://google.com' xProp1={1} />);
      // @ts-expect-error
      assertType<JSX.Element>(<TabLine href='https://google.com' />);
    });
    test('Verify value&onChange relation', () => {
      assertType<JSX.Element>(<TabLine value={1} onChange={(value: number) => { }} />);
      // @ts-expect-error
      assertType<JSX.Element>(<TabLine value={1} onChange={(value: string) => { }} />);
    });
  });

  beforeEach(cleanup);

  test('Verify supports onChange callback', async () => {
    const spyChange = vi.fn();
    const spyClick = vi.fn();
    const { getByTestId } = render(
      <TabLine value={1 as number} onChange={spyChange}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3}>Item 3</TabLine.Item>
        <TabLine.Item value={4} onClick={spyClick} data-testid='tab-4'>
          Item 4
        </TabLine.Item>
      </TabLine>,
    );

    await userEvent.click(getByTestId('tab-4'));
    expect(spyClick).lastCalledWith(expect.any(Object));
    expect(spyChange).lastCalledWith(4, expect.any(Object));
  });

  test('Verify not supports clicks on disabled tab', async () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <TabLine value={1 as number} onChange={spy}>
        <TabLine.Item value={1}>Item 1</TabLine.Item>
        <TabLine.Item value={2}>Item 2</TabLine.Item>
        <TabLine.Item value={3}>Item 3</TabLine.Item>
        <TabLine.Item value={4} data-testid='tab-4' disabled>
          Item 4
        </TabLine.Item>
      </TabLine>,
    );

    await expect(userEvent.click(getByTestId('tab-4'))).rejects.toThrow('pointer-events: none');

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
