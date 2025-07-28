import type { Intergalactic } from '@semcore/core';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { test, describe, beforeEach, vi, assertType } from '@semcore/testing-utils/vitest';
import React from 'react';

import { DataTable, UNIQ_ROW_KEY } from '../src';
import type { CellRenderProps } from '../src/components/Body/Body.types';

describe('data-table Dependency imports', () => {
  runDependencyCheckTests('data-table');
});

describe('DataTable', () => {
  describe('types', () => {
    const any: any = null;
    test('props nesting', () => {
      const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;

      assertType<JSX.Element>(
        // @ts-expect-error
        <DataTable aria-label='table label' tag={Link} href='https://google.com' xProp1={1} />,
      );
      // @ts-expect-error
      assertType<JSX.Element>(<DataTable href='https://google.com' aria-label='table label' />);
    });
    test('typed data', () => {
      assertType<JSX.Element>(
        <DataTable<{ a: number; b: number; c: number }[]>
          data={[{ a: 1, b: 2, c: 3 }]}
          aria-label='table label'
          columns={[]}
        />,
      );
      assertType<JSX.Element>(
        <DataTable<{ a: string; b: string; c: string }[]>
          // @ts-expect-error
          data={[{ a: 1, b: 2, c: 3 }]}
          aria-label='table label'
        />,
      );
    });
    test('sort typing', () => {
      assertType<JSX.Element>(
        <DataTable<{ id: number; name: string }[]>
          data={[{ id: 1, name: 'test' }]}
          aria-label='label'
          columns={[]}
          sort={['name', 'asc']}
          onSortChange={(sort, e) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            sort[0]; // should be 'id' | 'name'
          }}
        />,
      );
    });
    test('selectedRows typing', () => {
      assertType<JSX.Element>(
        <DataTable
          data={[{ id: 1, [UNIQ_ROW_KEY]: 'key' }]}
          aria-label='label'
          columns={[]}
          selectedRows={['key']}
          onSelectedRowsChange={(rows, e, opts) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            rows; // string[]
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            opts?.row.id; // should be number
          }}
        />,
      );
    });
    test('virtualScroll typing', () => {
      assertType<JSX.Element>(
        <DataTable<{ id: number }[]>
          data={[{ id: 1 }]}
          aria-label='label'
          columns={[]}
          virtualScroll
        />,
      );

      assertType<JSX.Element>(
        <DataTable<{ id: number }[]>
          data={[{ id: 1 }]}
          aria-label='label'
          columns={[]}
          virtualScroll={{ rowsBuffer: 5 }}
        />,
      );

      assertType<JSX.Element>(
        <DataTable<{ id: number }[]>
          data={[{ id: 1 }]}
          aria-label='label'
          columns={[]}
          virtualScroll={{ rowHeight: 40, rowsBuffer: 10 }}
        />,
      );
    });
    test('requires aria-label or aria-labelledby or title', () => {
      // @ts-expect-error
      assertType<JSX.Element>(<DataTable data={[]} columns={[]} />);
    });
  });

  beforeEach(cleanup);
});

describe('DataTable.Cell', () => {
  test('Should support ref via renderCell', ({ expect }) => {
    const spy = vi.fn();

    const Test = () => {
      const ref = (el: HTMLElement | null) => {
        if (el) spy(el);
      };

      return (
        <DataTable
          data={[{ keyword: 'test', kd: '1' }]}
          aria-label='table'
          columns={[
            { name: 'keyword', children: 'Keyword' },
            { name: 'kd', children: 'KD' },
          ]}
          renderCell={({ columnName, value }) => {
            if (columnName === 'keyword') {
              return <div ref={ref}>{value}</div>;
            }
            return value;
          }}
        />
      );
    };

    render(<Test />);
    expect(spy).toBeCalled();
  });

  // we have some error with rendering this example
  test.skip('Should support rawData in custom renderCell function', ({ expect }) => {
    const checkRowData = vi.fn();
    const dataItem = { keyword: 'test', kd: '1', vol: null };

    const RawDataTest = () => {
      const customCellRender = (props: CellRenderProps) => {
        checkRowData(props.rawData);

        return props.defaultRender();
      };

      return (
        <DataTable
          data={[dataItem]}
          aria-label='table'
          columns={[
            { name: 'keyword', children: 'Keyword' },
            { name: 'kd', children: 'KD' },
            { name: 'vol', children: 'Vol.' },
          ]}
          renderCell={customCellRender}
        />
      );
    };

    render(<RawDataTest />);
    expect(checkRowData).toBeCalledWith({ ...dataItem });
  });
});
