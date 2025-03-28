import { render, cleanup, act, userEvent } from '@semcore/testing-utils/testing-library';

import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';

import React from 'react';
import { assertType } from 'vitest';
import { Intergalactic } from '@semcore/core';
import DataTable from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('data-table Dependency imports', () => {
  runDependencyCheckTests('data-table');
});

describe('DataTable', () => {
  describe('types', () => {
    const any: any = null;
    test('props nesting', () => {
      const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;

      assertType<JSX.Element>(
        <DataTable aria-label={'table label'} tag={Link} href='https://google.com' xProp1={1} />,
      );
      // @ts-expect-error
      assertType<JSX.Element>(<DataTable href='https://google.com' aria-label={'table label'} />);
    });
    test('typed data', () => {
      assertType<JSX.Element>(
        <DataTable<{ a: number; b: number; c: number }[]>
          data={[{ a: 1, b: 2, c: 3 }]}
          aria-label={'table label'}
        />,
      );
      assertType<JSX.Element>(
        <DataTable<{ a: string; b: string; c: string }[]>
          // @ts-expect-error
          data={[{ a: 1, b: 2, c: 3 }]}
          aria-label={'table label'}
        />,
      );
    });
    test('data&uniqueKey relation', () => {
      assertType<JSX.Element>(
        <DataTable data={[{ a: 1, b: 2, c: 3 }]} uniqueKey='a' aria-label={'table label'} />,
      );
      assertType<JSX.Element>(
        // @ts-expect-error
        <DataTable data={[{ a: 1, b: 2, c: 3 }]} uniqueKey='f' aria-label={'table label'} />,
      );
    });
  });

  beforeEach(cleanup);

  shouldSupportClassName(DataTable);
  shouldSupportRef(DataTable);
});

describe('DataTable.Column', () => {
  test.concurrent('Should support set flex after rerender', () => {
    const { getByTestId, rerender } = render(
      <DataTable data={[]} aria-label={'table label'}>
        <DataTable.Head>
          <DataTable.Column name='keyword' data-testid='column' flex={0} />
          <DataTable.Column name='kd' />
        </DataTable.Head>
      </DataTable>,
    );
    expect(getByTestId('column').style.flex).toBe('0 0px');
    rerender(
      <DataTable data={[]} aria-label={'table label'}>
        <DataTable.Head>
          <DataTable.Column name='keyword' data-testid='column' flex={0} />
        </DataTable.Head>
      </DataTable>,
    );
    expect(getByTestId('column').style.flex).toBe('0 0px');
  });

  test.concurrent('Should support ref', () => {
    const spy = vi.fn();
    render(
      <DataTable data={[]} aria-label={'table label'}>
        <DataTable.Head>
          <DataTable.Column name='keyword' ref={spy} />
          <DataTable.Column name='kd' />
        </DataTable.Head>
      </DataTable>,
    );
    expect(spy).toBeCalled();
  });
});
