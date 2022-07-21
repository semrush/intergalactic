import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach } from 'vitest';
const { render, fireEvent, cleanup, axe } = testing;
import Return from '@semcore/icon/Return/m';
import Pagination from '../src';

const { render, fireEvent, cleanup, axe } = testing;

describe('Pagination', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = <Pagination currentPage={1} totalPages={100} />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support not render button if totalPage 1', async () => {
    const component = <Pagination currentPage={1} totalPages={1} />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should render correctly if current page is last page', async () => {
    const component = <Pagination currentPage={10} totalPages={10} />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(<Pagination currentPage={1} totalPages={100} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Pagination.FirstPage', () => {
  afterEach(cleanup);

  test('should be disabled if currentPage = 1', () => {
    const { getByTestId } = render(
      <Pagination currentPage={1} totalPages={100}>
        <Pagination.FirstPage data-testid="firstPage" />
      </Pagination>,
    );
    expect(getByTestId('firstPage')).toHaveProperty('disabled', true);
  });

  test('should not be disabled if currentPage > 1', () => {
    const { getByTestId } = render(
      <Pagination currentPage={10} totalPages={100}>
        <Pagination.FirstPage data-testid="firstPage" />
      </Pagination>,
    );
    expect(getByTestId('firstPage')).toHaveProperty('disabled', false);
  });

  test('should call onCurrentPageChange(1) on click', () => {
    const spy = jest.fn();

    const { getByTestId } = render(
      <Pagination onCurrentPageChange={spy} currentPage={10} totalPages={100}>
        <Pagination.FirstPage data-testid="firstPage" />
      </Pagination>,
    );

    expect(spy).toBeCalledTimes(0);
    fireEvent.click(getByTestId('firstPage'));
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(1);
  });
});

describe('Pagination.PrevPage', () => {
  afterEach(cleanup);

  test('should be disabled if currentPage = 1', () => {
    const { getByTestId } = render(
      <Pagination currentPage={1} totalPages={100}>
        <Pagination.PrevPage data-testid="prevPage" />
      </Pagination>,
    );
    expect(getByTestId('prevPage').attributes.disabled).toBeDefined();
  });

  test('should not be disabled if currentPage > 1', () => {
    const { getByTestId } = render(
      <Pagination currentPage={10} totalPages={100}>
        <Pagination.PrevPage data-testid="prevPage" />
      </Pagination>,
    );
    expect(getByTestId('prevPage').attributes.disabled).toBeUndefined();
  });

  test('should call onCurrentPageChange(currentPage - 1) by one on click', () => {
    const spy = jest.fn();
    const CURRENT_PAGE = 10;

    const { getByTestId } = render(
      <Pagination onCurrentPageChange={spy} currentPage={CURRENT_PAGE} totalPages={100}>
        <Pagination.PrevPage data-testid="firstPage" />
      </Pagination>,
    );

    expect(spy).toBeCalledTimes(0);
    fireEvent.click(getByTestId('firstPage'));
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(CURRENT_PAGE - 1);
  });
});

describe('Pagination.NextPage', () => {
  afterEach(cleanup);

  test('should be disabled if currentPage = totalPages', () => {
    const PAGES = 100;
    const { getByTestId } = render(
      <Pagination currentPage={PAGES} totalPages={PAGES}>
        <Pagination.NextPage data-testid="nextPage" />
      </Pagination>,
    );
    expect(getByTestId('nextPage').attributes.disabled).toBeDefined();
  });

  test('should not be disabled if currentPage < totalPages', () => {
    const { getByTestId } = render(
      <Pagination currentPage={10} totalPages={100}>
        <Pagination.NextPage data-testid="nextPage" />
      </Pagination>,
    );
    expect(getByTestId('nextPage').attributes.disabled).toBeUndefined();
  });

  test('should call onCurrentPageChange(currentPage + 1) by one on click', () => {
    const spy = jest.fn();
    const CURRENT_PAGE = 10;

    const { getByTestId } = render(
      <Pagination onCurrentPageChange={spy} currentPage={CURRENT_PAGE} totalPages={100}>
        <Pagination.NextPage data-testid="firstPage" />
      </Pagination>,
    );

    expect(spy).toBeCalledTimes(0);
    fireEvent.click(getByTestId('firstPage'));
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(CURRENT_PAGE + 1);
  });
});

describe('Pagination.TotalPages', () => {
  afterEach(cleanup);

  test('should call onCurrentPageChange(totalPages) on click', () => {
    const spy = jest.fn();
    const totalPages = 100;
    const { getByTestId } = render(
      <Pagination currentPage={10} totalPages={totalPages} onCurrentPageChange={spy}>
        <Pagination.TotalPages data-testid="totalPages" />
      </Pagination>,
    );
    expect(spy).toBeCalledTimes(0);
    fireEvent.click(getByTestId('totalPages'));
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(totalPages);
  });
});

describe('Pagination.PageInput', () => {
  afterEach(cleanup);

  test('Should correctly render', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Pagination currentPage={1} totalPages={10}>
          <Pagination.PageInput>
            <Pagination.PageInput.Value />
          </Pagination.PageInput>
        </Pagination>
        <Pagination currentPage={1} totalPages={10}>
          <Pagination.PageInput />
        </Pagination>
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support view icon', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Pagination currentPage={1} totalPages={1234}>
          <Pagination.PageInput>
            <Pagination.PageInput.Value />
            <Pagination.PageInput.Addon tag={Return} interactive aria-label="Confirm page number" />
          </Pagination.PageInput>
        </Pagination>
        <Pagination currentPage={1} totalPages={1234}>
          <Pagination.PageInput focused>
            <Pagination.PageInput.Value id="page-number" />
            <Pagination.PageInput.Addon tag={Return} interactive aria-label="Confirm page number" />
          </Pagination.PageInput>
        </Pagination>
      </snapshot.ProxyProps>
    );
    expect(
      await snapshot(component, {
        actions: {
          focus: '#page-number',
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('Should not cut up to 3 digits', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Pagination currentPage={1234} totalPages={1234}>
          <Pagination.PageInput focused>
            <Pagination.PageInput.Value id="page-number" />
            <Pagination.PageInput.Addon tag={Return} interactive aria-label="Confirm page number" />
          </Pagination.PageInput>
        </Pagination>
      </snapshot.ProxyProps>
    );
    expect(
      await snapshot(component, {
        actions: {
          focus: '#page-number',
        },
      }),
    ).toMatchImageSnapshot();
  });
});

describe('Pagination.PageInput.Value', () => {
  afterEach(cleanup);

  test('should display currentPage value and update on property change', () => {
    const CURRENT_PAGE = {
      INITIAL: 10,
      CHANGED: 20,
    };

    const { getByTestId, rerender } = render(
      <Pagination currentPage={1} totalPages={100}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid="value" />
        </Pagination.PageInput>
      </Pagination>,
    );

    fireEvent.change(getByTestId('value'), { target: { value: CURRENT_PAGE.INITIAL } });
    expect(getByTestId('value').value).toBe(CURRENT_PAGE.INITIAL.toString());

    rerender(
      <Pagination currentPage={CURRENT_PAGE.CHANGED} totalPages={100}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid="value" />
        </Pagination.PageInput>
      </Pagination>,
    );

    expect(getByTestId('value').value).toBe(CURRENT_PAGE.CHANGED.toString());
  });

  test('should not call onCurrentPageChange on input value change', () => {
    const spy = jest.fn();
    const CURRENT_PAGE = 10;
    const { getByTestId } = render(
      <Pagination currentPage={CURRENT_PAGE} totalPages={100} onCurrentPageChange={spy}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid="value" />
        </Pagination.PageInput>
      </Pagination>,
    );
    fireEvent.change(getByTestId('value'), { target: { value: '105' } });
    expect(spy).toBeCalledTimes(0);
  });

  test('should reset input value on blur without onCurrentPageChange call', () => {
    const spy = jest.fn();
    const CURRENT_PAGE = {
      INITIAL: 10,
      CHANGED: 100,
    };
    const { getByTestId } = render(
      <Pagination currentPage={CURRENT_PAGE.INITIAL} totalPages={100} onCurrentPageChange={spy}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid="value" />
        </Pagination.PageInput>
      </Pagination>,
    );

    const input = getByTestId('value');

    fireEvent.change(input, { target: { value: CURRENT_PAGE.CHANGED } });
    expect(input.value).toBe(CURRENT_PAGE.CHANGED.toString());
    expect(spy).toBeCalledTimes(0);
    fireEvent.blur(input);
    expect(spy).toBeCalledTimes(0);
    expect(input.value).toBe(CURRENT_PAGE.INITIAL.toString());
  });

  test('should call onCurrentPageChange on Enter click', () => {
    const spy = jest.fn();
    const CURRENT_PAGE = {
      INITIAL: 10,
      CHANGED: 100,
    };
    const { getByTestId } = render(
      <Pagination currentPage={CURRENT_PAGE.INITIAL} totalPages={100} onCurrentPageChange={spy}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid="value" />
        </Pagination.PageInput>
      </Pagination>,
    );

    const input = getByTestId('value');

    fireEvent.change(input, { target: { value: CURRENT_PAGE.CHANGED } });
    expect(spy).toBeCalledTimes(0);
    fireEvent.keyDown(input, { code: 'Enter' });
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(CURRENT_PAGE.CHANGED);
  });

  test('Enter click should call onCurrentPageChange with valid value', () => {
    const spy = jest.fn();
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
          <Pagination.PageInput.Value data-testid="value" />
        </Pagination.PageInput>
      </Pagination>,
    );

    const input = getByTestId('value');

    fireEvent.change(input, { target: { value: currentPage.null } });
    fireEvent.keyDown(input, { code: 'Enter' });
    // because value not changing
    expect(spy).not.toBeCalled();
    expect(input.value).toBe(currentPage.initial.toString());

    fireEvent.change(input, { target: { value: currentPage.invalid } });
    fireEvent.keyDown(input, { code: 'Enter' });
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(totalPages);
  });
});
