import React from 'react';
import { cleanup, fireEvent, render } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import InputNumber from '../src';

describe('InputNumber', () => {
  afterEach(cleanup);

  test('Should accept int numbers', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid="input" value="" onChange={spy} />
      </InputNumber>,
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: '123' } });
    expect(spy).toBeCalledWith('123', expect.anything());
  });

  test('Should accept float numbers', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid="input" value="" onChange={spy} />
      </InputNumber>,
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: '123.4' } });
    expect(spy).toBeCalledWith('123.4', expect.anything());
  });

  test('Should not accept letters', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid="input" value="" onChange={spy} />
      </InputNumber>,
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'YOU SHELL NOT PASS' } });
    expect(spy).not.toBeCalled();
  });

  test('Should not accept value which is bigger than max prop', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid="input" value={'100000'} max={10} onChange={spy} />
      </InputNumber>,
    );
    const input = getByTestId('input');
    fireEvent.blur(input);
    expect(spy).toBeCalledWith('10', expect.anything());
  });

  test('Should not accept value which is smaller than min prop', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid="input" value={'199'} min={200} onChange={spy} />
      </InputNumber>,
    );
    const input = getByTestId('input');
    fireEvent.blur(input);
    expect(spy).toBeCalledWith('200', expect.anything());
  });

  test('Should support inputs up/down buttons click', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid="input" defaultValue={'0'} onChange={spy} />
        <InputNumber.Controls data-testid="controls" />
      </InputNumber>,
    );
    const controls = getByTestId('controls');

    const arrowUp = controls.querySelectorAll('button')[0];
    fireEvent.click(arrowUp);
    expect(spy).lastCalledWith('1', expect.anything());
    const arrowDown = controls.querySelectorAll('button')[1];
    fireEvent.click(arrowDown); // 0
    fireEvent.click(arrowDown); // -1
    expect(spy).lastCalledWith('-1', expect.anything());
  });

  test('Should support sizes', async () => {
    const component = (
      <React.Fragment>
        <InputNumber size="m">
          <InputNumber.Value />
        </InputNumber>
        <InputNumber size="l">
          <InputNumber.Value />
        </InputNumber>
        <InputNumber size="xl">
          <InputNumber.Value />
        </InputNumber>
      </React.Fragment>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support disabled prop', async () => {
    const component = (
      <React.Fragment>
        <InputNumber>
          <InputNumber.Value disabled />
        </InputNumber>
        <InputNumber>
          <InputNumber.Value disabled />
          <InputNumber.Controls showControls />
        </InputNumber>
      </React.Fragment>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support showControls prop', async () => {
    const component = (
      <React.Fragment>
        <InputNumber>
          <InputNumber.Value />
        </InputNumber>
        <InputNumber>
          <InputNumber.Value />
          <InputNumber.Controls showControls />
        </InputNumber>
      </React.Fragment>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
