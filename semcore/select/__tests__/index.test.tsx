import React from 'react';
import { cleanup, fireEvent, render } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import Select from '../src';
import Checkbox from '@semcore/checkbox/src/Checkbox';

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
});
