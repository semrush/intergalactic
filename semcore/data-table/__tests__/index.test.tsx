import type { Intergalactic } from '@semcore/core';
import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, fireEvent, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, describe, beforeEach, vi, assertType, afterEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import { ACCORDION, DataTable } from '../src';
import type { CellRenderProps } from '../src/components/Body/Body.types';

describe('data-table Dependency imports', () => {
  runDependencyCheckTests('data-table');
});

describe('DataTable', (test) => {
  test('Verify data-ui-name', ({ expect }) => {
    const dataTable = (
      <DataTable
        aria-label='Table'
        data={[{ keyword: 'test', kd: '1' }]}
        columns={[
          {
            name: 'metrics',
            children: 'Metrics',
            columns: [
              { name: 'keyword', children: 'Keyword' },
              { name: 'kd', children: 'KD' },
            ],
          },
        ]}
      />
    );

    const { container } = render(dataTable);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('accordion chevron rotates a wrapper around the icon', ({ expect }) => {
    const { getByRole } = render(
      <DataTable
        aria-label='accordion chevron'
        data={[{ keyword: 'ebay', [ACCORDION]: <div>details</div> }]}
        columns={[{ name: 'keyword', children: 'Keyword' }]}
      />,
    );

    const toggle = getByRole('button', { name: 'Show details' });
    const svg = toggle.querySelector('svg');
    expect(svg).toBeTruthy();
    const icon = svg?.parentElement;
    expect(icon?.tagName).toBe('SPAN');
    expect(icon).not.toBe(toggle);

    const css = [...document.querySelectorAll('style')].map((node) => node.textContent ?? '').join('\n');
    const iconClass = [...(icon?.classList ?? [])].find((className) => css.includes(`.${className}`));
    expect(iconClass).toBeTruthy();
    const iconRule = css.split('}').find((rule) => rule.includes(`.${iconClass}`) && rule.includes('transition'));
    expect(iconRule).toMatch(/transition:[^;}]*transform/);

    const svgTransition = [...(svg?.classList ?? [])].some((className) => {
      const rule = css.split('}').find((part) => part.includes(`.${className}`) && part.includes('transition'));
      return rule?.includes('transform');
    });
    expect(svgTransition).toBe(false);
  });

  test('clicking the chevron icon toggles once, without waiting out the close timer', async ({ expect }) => {
    const toggles: Array<'open' | 'close'> = [];
    const { getByRole, queryByText } = render(
      <DataTable
        aria-label='accordion click'
        accordionDuration={0}
        onAccordionToggle={(type) => {
          toggles.push(type);
        }}
        data={[{ keyword: 'ebay', [ACCORDION]: <div>details</div> }]}
        columns={[{ name: 'keyword', children: 'Keyword' }]}
      />,
    );

    const toggle = getByRole('button', { name: 'Show details' });
    const icon = toggle.querySelector('svg');
    expect(icon).toBeTruthy();

    fireEvent.click(icon!);
    expect(toggles).toEqual(['open']);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(queryByText('details')).toBeTruthy();

    // The duplicate handlers of one click are ignored until the event's microtask.
    // A later click is a new event.
    await Promise.resolve();
    fireEvent.click(icon!);
    expect(toggles).toEqual(['open', 'close']);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    await Promise.resolve();
    fireEvent.click(icon!);
    expect(toggles).toEqual(['open', 'close', 'open']);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  test('zero accordionDuration does not animate collapse height', async ({ expect }) => {
    const { container, getByRole } = render(
      <DataTable
        aria-label='accordion duration'
        accordionDuration={0}
        data={[{ keyword: 'ebay', [ACCORDION]: <div>details</div> }]}
        columns={[{ name: 'keyword', children: 'Keyword' }]}
      />,
    );

    await userEvent.click(getByRole('button', { name: 'Show details' }));

    const collapse = container.querySelector('[data-ui-name="Collapse"]') as HTMLElement | null;
    expect(collapse).toBeTruthy();
    const style = collapse?.getAttribute('style') ?? '';
    expect(style).toContain('0ms');
    expect(style).not.toContain('200ms');
    expect(collapse?.style.height).toBe('');
  });

  test('a positive accordionDuration still animates collapse height', async ({ expect }) => {
    const { container, getByRole } = render(
      <DataTable
        aria-label='accordion duration animated'
        accordionDuration={200}
        data={[{ keyword: 'ebay', [ACCORDION]: <div>details</div> }]}
        columns={[{ name: 'keyword', children: 'Keyword' }]}
      />,
    );

    await userEvent.click(getByRole('button', { name: 'Show details' }));

    const collapse = container.querySelector('[data-ui-name="Collapse"]') as HTMLElement | null;
    expect(collapse).toBeTruthy();
    expect(collapse?.getAttribute('style') ?? '').toContain('200ms');
    // Opening writes the animation's start height. scrollHeight is applied on animationstart.
    expect(collapse?.style.height).toBe('0px');
  });

  test('closed accordion rows are not sized from scrollHeight', async ({ expect }) => {
    const { container, getByRole } = render(
      <DataTable
        aria-label='accordion rows'
        data={[{
          keyword: 'ebay',
          [ACCORDION]: [{ keyword: 'nested' }],
        }]}
        columns={[{ name: 'keyword', children: 'Keyword' }]}
      />,
    );

    const group = container.querySelector('[role="rowgroup"]') as HTMLElement | null;
    expect(group).toBeTruthy();
    expect(group?.getAttribute('aria-hidden')).toBe('true');
    expect(group?.style.maxHeight).toBe('');
    expect(container.textContent).not.toContain('nested');

    await userEvent.click(getByRole('button', { name: 'Show details' }));

    expect(container.textContent).toContain('nested');
    expect(container.querySelector('[role="rowgroup"]')?.style.maxHeight).toBe('');
  });

  test('horizontal scroll does not stamp a shadow onto body cells', async ({ expect }) => {
    const { container } = render(
      <DataTable
        aria-label='sticky shadow'
        headerProps={{ sticky: true }}
        data={[{ keyword: 'ebay', kd: '1' }]}
        columns={[
          { name: 'keyword', children: 'Keyword', fixed: 'left' },
          { name: 'kd', children: 'KD' },
        ]}
      />,
    );

    const markScrollable = (node: Element | null) => {
      if (!node) return;
      Object.defineProperty(node, 'scrollWidth', { configurable: true, value: 800 });
      Object.defineProperty(node, 'clientWidth', { configurable: true, value: 200 });
      Object.defineProperty(node, 'scrollLeft', { configurable: true, value: 40 });
    };
    const scroller = container.querySelector('[id$="scroll-container"]');
    markScrollable(scroller);
    markScrollable(container.querySelector('[role="grid"]'));

    fireEvent.scroll(scroller!);
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(container.innerHTML).not.toContain('shadowVertical');
    // The sticky header draws its own shadow: the body strip lies under it.
    const header = container.querySelector('[role="row"]');
    expect(header?.getAttribute('data-vertical-shadow')).toBe('median');
    expect(header?.querySelectorAll('[class*="SHeadShadow"]')).toHaveLength(1);
  });

  test('fixed header columns get their sticky offset after mount', ({ expect }) => {
    const { getAllByRole } = render(
      <DataTable
        aria-label='fixed header'
        headerProps={{ sticky: true }}
        data={[{ keyword: 'ebay', kd: '1', cpc: '2' }]}
        columns={[
          { name: 'keyword', children: 'Keyword', fixed: 'left' },
          { name: 'kd', children: 'KD', fixed: 'left' },
          { name: 'cpc', children: 'CPC' },
        ]}
      />,
    );

    const [keyword, kd, cpc] = getAllByRole('columnheader');
    expect(keyword.style.left).toBe('0px');
    expect(kd.style.left).toMatch(/px$/);
    expect(cpc.style.left).toBe('');
  });

  describe('types', (test) => {
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
        <DataTable<{ a: number; b: number; c: number }[], never, never>
          data={[{ a: 1, b: 2, c: 3 }]}
          aria-label='table label'
          columns={[]}
        />,
      );
      assertType<JSX.Element>(
        <DataTable<{ a: string; b: string; c: string }[], never, never>
          // @ts-expect-error
          data={[{ a: 1, b: 2, c: 3 }]}
          aria-label='table label'
        />,
      );
    });
    test('sort typing', () => {
      assertType<JSX.Element>(
        <DataTable<{ id: number; name: string }[], never, never>
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
    test('selectedRows/onSelectedRowsChange typing', () => {
      const onSelectedRowsChange = (rows: string) => {};

      assertType<JSX.Element>(
        <DataTable
          data={[{ id: 1 }]}
          aria-label='label'
          columns={[]}
          selectedRows={[1]}
          uniqueRowKey='id'
          onSelectedRowsChange={(rows, e, opts) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            rows; // number[]
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            opts?.row.id; // should be number
          }}
        />,
      );
      assertType<JSX.Element>(
        <DataTable
          data={[{ id: 1 }]}
          aria-label='label'
          columns={[]}
          // @ts-expect-error
          selectedRows={['1']}
          uniqueRowKey='id'
          // @ts-expect-error
          onSelectedRowsChange={onSelectedRowsChange}
        />,
      );
    });
    test('virtualScroll typing', () => {
      assertType<JSX.Element>(
        <DataTable<{ id: number }[], never, never>
          data={[{ id: 1 }]}
          aria-label='label'
          columns={[]}
          virtualScroll
        />,
      );

      assertType<JSX.Element>(
        <DataTable<{ id: number }[], never, never>
          data={[{ id: 1 }]}
          aria-label='label'
          columns={[]}
          virtualScroll={{ rowsBuffer: 5 }}
        />,
      );

      assertType<JSX.Element>(
        <DataTable<{ id: number }[], 'id', number>
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

describe('DataTable.Cell', (test) => {
  beforeEach(() => {
    cleanup();
  });
  afterEach(() => {
    cleanup();
  });
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

  test('Should support rawData in custom renderCell function', () => {
    const checkRowData = vi.fn();
    const dataItem = { keyword: 'test', kd: '1', vol: null };

    const RawDataTest = () => {
      const customCellRender = (props: CellRenderProps<typeof dataItem, string | null>) => {
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

  test('Should not call renderCell and rowProps functions on the data is empty', () => {
    const renderCell = vi.fn();
    const rowProps = vi.fn();

    const CbTest = () => {
      return (
        <DataTable
          data={[]}
          aria-label='table'
          columns={[
            { name: 'keyword', children: 'Keyword' },
            { name: 'kd', children: 'KD' },
            { name: 'vol', children: 'Vol.' },
          ]}
          renderCell={renderCell}
          rowProps={rowProps}
        />
      );
    };

    render(<CbTest />);
    expect(renderCell).not.toBeCalled();
    expect(rowProps).not.toBeCalled();
  });
});
