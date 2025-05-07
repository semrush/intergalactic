import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { render, fireEvent, cleanup, userEvent } from '@semcore/testing-utils/testing-library';

import Return from '@semcore/icon/Return/m';
import Pagination from '../src';
import Button from '@semcore/button';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('pagination Dependency imports', () => {
  runDependencyCheckTests('pagination');
});

describe('Pagination', () => {
  beforeEach(cleanup);

  test.concurrent('Verify correctly renders for different locales', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <div>
          EN (default):
          <Pagination currentPage={12345} totalPages={222333}>
            <Pagination.PageInput />
            <Pagination.TotalPages />
          </Pagination>
        </div>
        <div>
          DE:
          <Pagination locale={'de'} currentPage={12345} totalPages={222333}>
            <Pagination.PageInput />
            <Pagination.TotalPages />
          </Pagination>
        </div>
      </snapshot.ProxyProps>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('Pagination.FirstPage', () => {
  beforeEach(cleanup);

  test('Verify first page disabled when currentPage = 1', () => {
    const { getByTestId } = render(
      <Pagination currentPage={1} totalPages={100}>
        <Pagination.FirstPage data-testid='firstPage' />
      </Pagination>,
    );
    expect(getByTestId('firstPage')).toHaveProperty('disabled', true);
  });

  test('Verify first page not disabled if currentPage > 1', () => {
    const { getByTestId } = render(
      <Pagination currentPage={10} totalPages={100}>
        <Pagination.FirstPage data-testid='firstPage' />
      </Pagination>,
    );
    expect(getByTestId('firstPage')).toHaveProperty('disabled', false);
  });

  test('Verify calls onCurrentPageChange(1) on click', () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <Pagination onCurrentPageChange={spy} currentPage={10} totalPages={100}>
        <Pagination.FirstPage data-testid='firstPage' />
      </Pagination>,
    );

    expect(spy).toBeCalledTimes(0);
    fireEvent.click(getByTestId('firstPage'));
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(1);
  });
});

describe('Pagination.PrevPage', () => {
  beforeEach(cleanup);

  test('Verify Prev Page disabled if currentPage = 1', () => {
    const { getByTestId } = render(
      <Pagination currentPage={1} totalPages={100}>
        <Pagination.PrevPage data-testid='prevPage' />
      </Pagination>,
    );
    expect((getByTestId('prevPage').attributes as any)['disabled']).toBeDefined();
  });

  test('Verify Prev Page not disabled if currentPage > 1', () => {
    const { getByTestId } = render(
      <Pagination currentPage={10} totalPages={100}>
        <Pagination.PrevPage data-testid='prevPage' />
      </Pagination>,
    );
    expect((getByTestId('prevPage').attributes as any)['disabled']).toBeUndefined();
  });

  test('Verify calls onCurrentPageChange(currentPage - 1) by one on click', () => {
    const spy = vi.fn();
    const CURRENT_PAGE = 10;

    const { getByTestId } = render(
      <Pagination onCurrentPageChange={spy} currentPage={CURRENT_PAGE} totalPages={100}>
        <Pagination.PrevPage data-testid='firstPage' />
      </Pagination>,
    );

    expect(spy).toBeCalledTimes(0);
    fireEvent.click(getByTestId('firstPage'));
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(CURRENT_PAGE - 1);
  });
});

describe('Pagination.NextPage', () => {
  beforeEach(cleanup);

  test('Verify Next Page disabled if currentPage = totalPages', () => {
    const PAGES = 100;
    const { getByTestId } = render(
      <Pagination currentPage={PAGES} totalPages={PAGES}>
        <Pagination.NextPage data-testid='nextPage' />
      </Pagination>,
    );
    expect((getByTestId('nextPage').attributes as any)['disabled']).toBeDefined();
  });

  test('Verify Next Page not disabled if currentPage < totalPages', () => {
    const { getByTestId } = render(
      <Pagination currentPage={10} totalPages={100}>
        <Pagination.NextPage data-testid='nextPage' />
      </Pagination>,
    );
    expect((getByTestId('nextPage').attributes as any)['disabled']).toBeUndefined();
  });

  test('Verify Next Page calls onCurrentPageChange(currentPage + 1) by one on click', () => {
    const spy = vi.fn();
    const CURRENT_PAGE = 10;

    const { getByTestId } = render(
      <Pagination onCurrentPageChange={spy} currentPage={CURRENT_PAGE} totalPages={100}>
        <Pagination.NextPage data-testid='firstPage' />
      </Pagination>,
    );

    expect(spy).toBeCalledTimes(0);
    fireEvent.click(getByTestId('firstPage'));
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(CURRENT_PAGE + 1);
  });
});

describe('Pagination.TotalPages', () => {
  beforeEach(cleanup);

  test('Verify Total Pages call onCurrentPageChange(totalPages) on click', () => {
    const spy = vi.fn();
    const totalPages = 100;
    const { getByTestId } = render(
      <Pagination currentPage={10} totalPages={totalPages} onCurrentPageChange={spy}>
        <Pagination.TotalPages data-testid='totalPages' />
      </Pagination>,
    );
    expect(spy).toBeCalledTimes(0);
    fireEvent.click(getByTestId('totalPages'));
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(totalPages);
  });
});

describe('Pagination.PageInput', () => {
  beforeEach(cleanup);

  test.concurrent('Verify input not cut up to 3 digits', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Pagination currentPage={1234} totalPages={1234}>
          <Pagination.PageInput {...{ focused: true }}>
            <Pagination.PageInput.Value id='page-number' />
          </Pagination.PageInput>
        </Pagination>
      </snapshot.ProxyProps>
    );
    await expect(
      await snapshot(component, {
        actions: {
          focus: '#page-number',
        },
      }),
    ).toMatchImageSnapshot(task);
  });
});

describe('Pagination.PageInput.Value', () => {
  beforeEach(cleanup);

  test('Verify currentPage displays correct value and updates on property change', () => {
    const CURRENT_PAGE = {
      INITIAL: 10,
      CHANGED: 20,
    };

    const { getByTestId, rerender } = render(
      <Pagination currentPage={1} totalPages={100}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid='value' />
        </Pagination.PageInput>
      </Pagination>,
    );

    fireEvent.change(getByTestId('value') as HTMLInputElement, {
      target: { value: String(CURRENT_PAGE.INITIAL) },
    });
    expect((getByTestId('value') as HTMLInputElement).value).toBe(CURRENT_PAGE.INITIAL.toString());

    rerender(
      <Pagination currentPage={CURRENT_PAGE.CHANGED} totalPages={100}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid='value' />
        </Pagination.PageInput>
      </Pagination>,
    );

    expect((getByTestId('value') as HTMLInputElement).value).toBe(CURRENT_PAGE.CHANGED.toString());
  });

  test('Verify not calls onCurrentPageChange on input value change', () => {
    const spy = vi.fn();
    const CURRENT_PAGE = 10;
    const { getByTestId } = render(
      <Pagination currentPage={CURRENT_PAGE} totalPages={100} onCurrentPageChange={spy}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid='value' />
        </Pagination.PageInput>
      </Pagination>,
    );
    fireEvent.change(getByTestId('value'), { target: { value: '105' } });
    expect(spy).toBeCalledTimes(0);
  });

  test('Verify input value resets on blur without onCurrentPageChange call', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Pagination currentPage={10} totalPages={100} onCurrentPageChange={spy}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid='value' />
        </Pagination.PageInput>
      </Pagination>,
    );

    const input = getByTestId('value') as HTMLInputElement;

    vi.useFakeTimers();

    fireEvent.change(input, { target: { value: '100' } });
    expect(input.value).toBe('100');
    expect(spy).toBeCalledTimes(0);
    fireEvent.blur(input);
    await vi.runAllTimersAsync();
    expect(spy).toBeCalledTimes(0);
    expect(input.value).toBe('10');

    vi.useRealTimers();
  });

  test('Verify calls onCurrentPageChange on Enter click', () => {
    const spy = vi.fn();
    const CURRENT_PAGE = {
      INITIAL: 10,
      CHANGED: 100,
    };
    const { getByTestId } = render(
      <Pagination currentPage={CURRENT_PAGE.INITIAL} totalPages={100} onCurrentPageChange={spy}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid='value' />
        </Pagination.PageInput>
      </Pagination>,
    );

    const input = getByTestId('value');

    fireEvent.change(input, { target: { value: String(CURRENT_PAGE.CHANGED) } });
    expect(spy).toBeCalledTimes(0);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(CURRENT_PAGE.CHANGED);
  });

  test('Verify enter click should call onCurrentPageChange with valid value', () => {
    const spy = vi.fn();
    const totalPages = 100;
    const currentPage = {
      initial: 1,
      null: 0,
      invalid: 1010,
    };
    const { getByTestId } = render(
      <Pagination
        currentPage={currentPage.initial}
        totalPages={totalPages}
        onCurrentPageChange={spy}
      >
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid='value' />
        </Pagination.PageInput>
      </Pagination>,
    );

    const input = getByTestId('value') as HTMLInputElement;

    fireEvent.change(input, { target: { value: String(currentPage.null) } });
    fireEvent.keyDown(input, { keyCode: 13, key: 'Enter' });
    // because value not changing
    expect(spy).not.toBeCalled();
    expect(input.value).toBe(currentPage.initial.toString());

    fireEvent.change(input, { target: { value: String(currentPage.invalid) } });
    fireEvent.keyDown(input, { keyCode: 13, key: 'Enter' });
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(totalPages);
  });

  test('Verify typed valu keept in input when focus moves to Addon, resets to currentPage when focus moves outside', async () => {
    const { getByTestId } = render(
      <>
        <Pagination currentPage={1} totalPages={100}>
          <Pagination.PageInput>
            <Pagination.PageInput.Value data-testid='value' />
            {/* @ts-ignore */}
            <Pagination.PageInput.Addon data-testid={'selectPageButton'} tag={Return} interactive />
          </Pagination.PageInput>
        </Pagination>
        <Button data-testid={'testButton'}>test button</Button>
      </>,
    );

    const InputValue = getByTestId('value') as HTMLInputElement;

    await userEvent.keyboard('[Tab]');
    expect(InputValue).toHaveFocus();

    await userEvent.keyboard('123');
    expect(InputValue.value).toBe('123');

    await userEvent.keyboard('[Tab]');
    expect(getByTestId('selectPageButton')).toHaveFocus();
    expect(InputValue.value).toBe('123');

    await userEvent.keyboard('[Tab]');
    expect(getByTestId('testButton')).toHaveFocus();
    expect(InputValue.value).toBe('1');

    await userEvent.click(InputValue);
    expect(InputValue).toHaveFocus();

    await userEvent.keyboard('23');
    expect(InputValue.value).toBe('123'); // because we already has 1 in input

    await userEvent.keyboard('{Shift>}[Tab]');
    expect(InputValue.value).toBe('1');
  });

  test('Verify value changes in input after change it in input and click to total pages', async () => {
    const Component = () => {
      const [currentPage, setCurrentPage] = React.useState(1);

      return (
        <>
          <Pagination
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            totalPages={100}
          >
            <Pagination.PageInput>
              <Pagination.PageInput.Value data-testid='paginationValue' />
            </Pagination.PageInput>
            <Pagination.TotalPages data-testid={'totalPagesValue'} />
          </Pagination>
        </>
      );
    };

    const { getByTestId } = render(<Component />);

    const InputValue = getByTestId('paginationValue') as HTMLInputElement;
    const TotalPages = getByTestId('totalPagesValue') as HTMLElement;

    await userEvent.keyboard('[Tab]');
    expect(InputValue).toHaveFocus();

    await userEvent.keyboard('13');
    expect(InputValue.value).toBe('13');

    await userEvent.keyboard('[Enter]');
    expect(InputValue.value).toBe('13');

    await userEvent.click(TotalPages);
    expect(InputValue.value).toBe('100');
  });
});
