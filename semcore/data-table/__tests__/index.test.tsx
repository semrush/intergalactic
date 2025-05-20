import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React, { useRef } from 'react';
import { assertType } from 'vitest';
import { Intergalactic } from '@semcore/core';
import { DataTable } from '../src';
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
        // @ts-expect-error
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
          columns={[]}
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
    test('sort typing', () => {
      assertType<JSX.Element>(
        <DataTable<{ id: number; name: string }[]>
          data={[{ id: 1, name: 'test' }]}
          aria-label='label'
          columns={[]}
          sort={['name', 'asc']}
          onSortChange={(sort, e) => {
            sort[0]; // should be 'id' | 'name'
          }}
        />,
      );
    });
    test('selectedRows typing', () => {
      assertType<JSX.Element>(
        <DataTable<{ id: number }[]>
          data={[{ id: 1 }]}
          aria-label='label'
          columns={[]}
          selectedRows={[0]}
          onSelectedRowsChange={(rows, e, opts) => {
            rows; // number[]
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
  test('Should support ref via renderCell', () => {
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
});
