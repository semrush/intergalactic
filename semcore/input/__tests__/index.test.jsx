import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
const { cleanup, fireEvent, render } = testing;
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Input from '../src';

describe('Input', () => {
  afterEach(cleanup);

  shouldSupportClassName(Input);
  shouldSupportRef(Input);

  test('Should support sizes', async () => {
    const InputSize = (props) => (
      <Input {...props}>
        <Input.Addon>Addon</Input.Addon>
        <Input.Value />
      </Input>
    );
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <InputSize size="s" />
        <InputSize size="m" />
        <InputSize size="l" />
        <InputSize size="xl" />
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support states', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Input state="normal" />
        <Input state="valid" />
        <Input state="invalid" />
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support correctly render', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Input>
          <Input.Value placeholder="Placeholder" />
        </Input>
        <Input>
          <Input.Value readOnly />
        </Input>
        <Input>
          <Input.Value disabled />
        </Input>
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support change value when rerender', () => {
    const { getByTestId, rerender } = render(
      <Input>
        <Input.Value data-testid="value" value="" />
      </Input>,
    );

    expect(getByTestId('value').value).toBe('');

    rerender(
      <Input>
        <Input.Value data-testid="value" value="test" />
      </Input>,
    );

    expect(getByTestId('value').value).toBe('test');
  });

  test('Should support controlled mod', () => {
    let value = '';
    const spy = jest.fn((v) => {
      value = v;
    });

    const { getByTestId, rerender } = render(
      <Input>
        <Input.Value data-testid="input" value={value} onChange={spy} />
      </Input>,
    );

    const input = getByTestId('input');

    expect(input).toHaveProperty('value', '');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(spy).toBeCalled();

    rerender(
      <Input>
        <Input.Value data-testid="input" value={value} onChange={spy} />
      </Input>,
    );

    expect(input).toHaveProperty('value', 'test');
  });
});

describe('Input.Addon', () => {
  afterEach(cleanup);

  shouldSupportClassName(Input.Value);
  shouldSupportRef(Input.Value, Input);

  test('Should focus input if additional element click', () => {
    const spy = jest.fn();
    const { queryByText } = render(
      <Input>
        <Input.Addon>addon</Input.Addon>
        <Input.Value onFocus={spy} />
      </Input>,
    );
    expect(spy).toHaveBeenCalledTimes(0);
    fireEvent.mouseDown(queryByText('addon'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test(`Should't focus input if onMouseDown additional return false`, () => {
    const spy = jest.fn();
    const { queryByText } = render(
      <Input>
        <Input.Addon onMouseDown={() => false}>addon</Input.Addon>
        <Input.Value onFocus={spy} />
      </Input>,
    );
    fireEvent.mouseDown(queryByText('addon'));
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Should correctly render', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Input>
          <Input.Addon>1</Input.Addon>
          <Input.Value />
          <Input.Addon>2</Input.Addon>
        </Input>
        <Input>
          <Input.Addon interactive>1</Input.Addon>
          <Input.Value />
        </Input>
        <Input>
          <Input.Addon disabled>1</Input.Addon>
          <Input.Value />
        </Input>
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
