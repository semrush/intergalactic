import React from 'react';
import { cleanup, fireEvent, render } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import snapshot from 'jest-preset-ui/snapshot';
import Input from '../src';

describe('Input', () => {
  afterEach(cleanup);

  shouldSupportClassName(Input);
  shouldSupportRef(Input.Value, Input);

  test('Should support additional elements', () => {
    const { queryAllByText } = render(
      <Input>
        <Input.Addon>addon</Input.Addon>
      </Input>,
    );
    const before = queryAllByText('addon');
    expect(before).toHaveLength(1);
  });

  // TODO: какая то проблема с тестами и 17 реактом( руками работает
  xtest('Should focus input on additional element click.', () => {
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

  test('Should not focus input on additional elements propagation stopped click.', () => {
    const spy = jest.fn();
    const { queryByText } = render(
      <Input>
        <Input.Addon onMouseDown={() => false}>addon</Input.Addon>
        <Input.Value onFocus={spy} />
      </Input>,
    );
    expect(spy).toHaveBeenCalledTimes(0);
    fireEvent.mouseDown(queryByText('addon'));
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Should support Input.Addon', async () => {
    const component = (
      <Input>
        <Input.Addon>1</Input.Addon>
        <Input.Value />
        <Input.Addon>2</Input.Addon>
      </Input>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Input.Addon should support interactive prop', async () => {
    const component = (
      <Input>
        <Input.Value />
        <Input.Addon interactive>1</Input.Addon>
      </Input>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support sizes', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Input size="s" />
        <Input size="m" />
        <Input size="l" />
        <Input size="xl" />
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

  test('Should support placeholder color', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Input>
          <Input.Value placeholder="Placeholder" />
        </Input>
        <Input>
          <Input.Value disabled placeholder="Placeholder" />
        </Input>
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support change value when rerender', () => {
    const { getByTestId, rerender } = render(
      <Input>
        <Input.Value readOnly data-testid="value" value="" />
      </Input>,
    );

    expect(getByTestId('value').value).toBe('');

    rerender(
      <Input>
        <Input.Value readOnly data-testid="value" value="test" />
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
