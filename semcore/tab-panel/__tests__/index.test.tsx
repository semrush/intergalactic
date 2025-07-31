import type { Intergalactic } from '@semcore/core';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi, assertType } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import TabPanel from '../src';

describe('tab-panel Dependency imports', () => {
  runDependencyCheckTests('tab-panel');
});

describe('TabPanel', () => {
  describe('Types', () => {
    const any: any = null;
    test('Verify props nesting', () => {
      const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;

      assertType<JSX.Element>(<TabPanel tag={Link} href='https://google.com' xProp1={1} />);
      // @ts-expect-error
      assertType<JSX.Element>(<TabPanel href='https://google.com' />);
    });
    test('Verify value&onChange relation', () => {
      assertType<JSX.Element>(<TabPanel value={1} onChange={(value: number) => {}} />);
      // @ts-expect-error
      assertType<JSX.Element>(<TabPanel value={1} onChange={(value: string) => {}} />);
    });
  });

  beforeEach(cleanup);

  test('Verify supports onChange callback', () => {
    const spyChange = vi.fn();
    const spyClick = vi.fn();
    const { getByTestId } = render(
      <TabPanel value={1 as number} onChange={spyChange}>
        <TabPanel.Item value={1}>Item 1</TabPanel.Item>
        <TabPanel.Item value={2}>Item 2</TabPanel.Item>
        <TabPanel.Item value={3}>Item 3</TabPanel.Item>
        <TabPanel.Item value={4} onClick={spyClick} data-testid='tab-4'>
          Item 4
        </TabPanel.Item>
      </TabPanel>,
    );

    fireEvent.click(getByTestId('tab-4'));
    expect(spyClick).lastCalledWith(expect.any(Object));
    expect(spyChange).lastCalledWith(4, expect.any(Object));
  });

  test('Verify not support clicks on disabled tab', () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <TabPanel value={1 as number} onChange={spy}>
        <TabPanel.Item value={1}>Item 1</TabPanel.Item>
        <TabPanel.Item value={2}>Item 2</TabPanel.Item>
        <TabPanel.Item value={3}>Item 3</TabPanel.Item>
        <TabPanel.Item value={3} data-testid='tab-4' disabled>
          Item 4
        </TabPanel.Item>
      </TabPanel>,
    );

    fireEvent.click(getByTestId('tab-4'));

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
