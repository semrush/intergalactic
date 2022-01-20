import React from 'react';
import { FilterTrigger } from '@semcore/base-trigger';
import { cleanup, fireEvent, render, axe } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import snapshot from 'jest-preset-ui/snapshot';
import Select from '../src';
import InputSearch from '../src/InputSearch';

describe('Select Trigger', () => {
  afterEach(cleanup);

  test('Trigger renders correctly', async () => {
    const component = (
      <Select>
        <Select.Trigger />
      </Select>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Trigger disabled', async () => {
    const component = (
      <Select>
        <Select.Trigger disabled />
      </Select>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Trigger with placeholder renders correctly', async () => {
    const component = (
      <Select placeholder="Placeholder">
        <Select.Trigger />
      </Select>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Trigger with selected option renders correctly', async () => {
    const component = (
      <Select value={1}>
        <Select.Trigger />
      </Select>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Trigger with selected option ellipsis text renders correctly', async () => {
    const component = (
      <Select value={'English burashka gpq 1'}>
        <Select.Trigger w={100} />
      </Select>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('MultiSelect trigger with selected options renders correctly', async () => {
    const component = (
      <Select multiselect value={[1, 2, 3]}>
        <Select.Trigger />
      </Select>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('MultiSelect trigger with selected options renders correctly in unconrol mode', async () => {
    const spy = jest.fn();

    const { getByTestId } = render(
      <Select multiselect onChange={spy} visible value={['1']}>
        <Select.Trigger />
        <Select.Popper>
          <Select.Option value="1" />
          <Select.Option data-testid="option" value="2" />
        </Select.Popper>
      </Select>,
    );

    fireEvent.click(getByTestId('option'));
    expect(spy).toHaveBeenCalledWith(['1', '2'], expect.anything());
  });

  test('Call onVisibleChange for click in Option when value selected', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Select visible onVisibleChange={spy}>
        <Select.Trigger />
        <Select.Popper>
          <Select.Option data-testid="option" value="test" />
        </Select.Popper>
      </Select>,
    );

    fireEvent.click(getByTestId('option'));
    expect(spy).toHaveBeenCalledTimes(1);
    fireEvent.click(getByTestId('option'));
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('Trigger renders correctly with FilterTrigger', async () => {
    const component = (
      <Select defaultValue="Test">
        <Select.Trigger tag={FilterTrigger} />
      </Select>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support tag as string', async () => {
    const component = (
      <Select defaultValue="Test">
        <Select.Trigger tag="button" />
      </Select>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support call render function for custom tag', () => {
    const spy = jest.fn();
    const Tag = React.forwardRef(({ children }, ref) => <button ref={ref}>{children}</button>);

    render(
      <Select>
        <Select.Trigger tag={Tag}>
          {() => {
            spy();
            return null;
          }}
        </Select.Trigger>
      </Select>,
    );
    expect(spy).toBeCalledTimes(1);
  });

  test('a11y', async () => {
    const { container } = render(
      <Select visible value={['2']}>
        <Select.Trigger />
        <Select.Popper>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Popper>
      </Select>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('InputSearch', () => {
  afterEach(cleanup);

  shouldSupportClassName(Select.Option.Checkbox, Select);
  shouldSupportRef(Select.Option.Checkbox, Select);
});

describe('Select.Option.Checkbox', () => {
  afterEach(cleanup);

  shouldSupportClassName(InputSearch, Select);
  shouldSupportRef(InputSearch, Select);

  test('should renders correctly', async () => {
    const component = (
      <>
        <Select>
          <InputSearch />
        </Select>
        <Select>
          <InputSearch defaultValue="test" />
        </Select>
        <Select size="l">
          <InputSearch />
        </Select>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
