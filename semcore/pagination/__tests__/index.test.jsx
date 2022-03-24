import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
const { render, fireEvent, cleanup, axe } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Pagination from '../src';

describe('Pagination', () => {
  afterEach(cleanup);

  shouldSupportRef(Pagination);
  shouldSupportClassName(Pagination);

  test('Renders correctly', async () => {
    const component = <Pagination currentPage={1} totalPages={100} />;
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

  shouldSupportRef(Pagination.FirstPage, Pagination);

  shouldSupportClassName(Pagination.FirstPage, Pagination);

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

  shouldSupportRef(Pagination.PrevPage, Pagination);

  shouldSupportClassName(Pagination.PrevPage, Pagination);

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

  shouldSupportRef(Pagination.PrevPage, Pagination);

  shouldSupportClassName(Pagination.PrevPage, Pagination);

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

  shouldSupportRef(Pagination.TotalPages, Pagination);

  shouldSupportClassName(Pagination.TotalPages, Pagination);

  test('should be disabled if currentPage = totalPages', () => {
    const { getByTestId } = render(
      <Pagination currentPage={100} totalPages={100}>
        <Pagination.TotalPages data-testid="totalPages" />
      </Pagination>,
    );
    expect(getByTestId('totalPages').attributes.disabled).toBeDefined();
  });

  test('should call onCurrentPageChange(totalPages) on click', () => {
    const spy = jest.fn();
    const TOTAL_PAGES = 100;
    const { getByTestId } = render(
      <Pagination currentPage={10} totalPages={TOTAL_PAGES} onCurrentPageChange={spy}>
        <Pagination.TotalPages data-testid="totalPages" />
      </Pagination>,
    );
    expect(spy).toBeCalledTimes(0);
    fireEvent.click(getByTestId('totalPages'));
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(TOTAL_PAGES);
  });
});

describe('Pagination.PageInput', () => {
  afterEach(cleanup);
  shouldSupportRef(Pagination.PageInput, Pagination);
  shouldSupportClassName(Pagination.PageInput, Pagination);

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
});

describe('Pagination.PageInput.Value', () => {
  afterEach(cleanup);

  shouldSupportRef(Pagination.PageInput.Value, Pagination);

  shouldSupportClassName(Pagination.PageInput.Value, Pagination);

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
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(CURRENT_PAGE.CHANGED);
  });

  test('Enter click should call onCurrentPageChange with valid value', () => {
    const spy = jest.fn();
    const TOTAL_PAGES = 100;
    const CURRENT_PAGE = {
      INITIAL: 1,
      NULL: 0,
      INVALID: 1010,
    };
    const { getByTestId } = render(
      <Pagination
        currentPage={CURRENT_PAGE.INITIAL}
        totalPages={TOTAL_PAGES}
        onCurrentPageChange={spy}
      >
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid="value" />
        </Pagination.PageInput>
      </Pagination>,
    );

    const input = getByTestId('value');

    fireEvent.change(input, { target: { value: CURRENT_PAGE.NULL } });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
    // because value not changing
    expect(spy).not.toBeCalled();
    expect(input.value).toBe(CURRENT_PAGE.INITIAL.toString());

    fireEvent.change(input, { target: { value: CURRENT_PAGE.INVALID } });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(TOTAL_PAGES);
  });
});
