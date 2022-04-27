import React from 'react';
import Search from '@semcore/icon/Search/m';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
import Input from '../src';

const { cleanup, fireEvent, render } = testing;
const { shouldSupportClassName, shouldSupportRef } = testsShared;

describe('Input', () => {
  afterEach(cleanup);

  shouldSupportClassName(Input);
  shouldSupportRef(Input);

  test('Should support sizes', async () => {
    const InputSize = (props) => (
      <>
        <Input {...props}>
          <Input.Addon tag={Search} />
          <Input.Value />
          <Input.Addon>
            <Search />
          </Input.Addon>
        </Input>
        <Input {...props}>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value />
        </Input>
        <Input {...props}>
          <Input.Value />
          <Input.Addon>
            <Search />
          </Input.Addon>
        </Input>
        <Input {...props}>
          <Input.Value />
        </Input>
      </>
    );
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 150 }}>
        <InputSize size="m" />
        <InputSize size="l" />
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support states', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Input state="normal">
          <Input.Value />
        </Input>
        <Input state="valid">
          <Input.Value />
        </Input>
        <Input state="invalid">
          <Input.Value />
        </Input>
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support focus states', async () => {
    expect(
      await snapshot(
        <Input state="normal">
          <Input.Value id="input" />
        </Input>,
        {
          actions: {
            focus: '#input',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Input state="valid">
          <Input.Value id="input" />
        </Input>,
        {
          actions: {
            focus: '#input',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Input state="invalid">
          <Input.Value id="input" />
        </Input>,
        {
          actions: {
            focus: '#input',
          },
        },
      ),
    ).toMatchImageSnapshot();
  });

  test('Should support root disabled', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Input disabled>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value />
        </Input>
        <Input>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value disabled />
        </Input>
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

  test('Should support hover interactive', async () => {
    const component = (
      <Input>
        <Input.Addon interactive id="addon">
          Addon
        </Input.Addon>
        <Input.Value />
        <Input.Addon interactive>Addon</Input.Addon>
      </Input>
    );
    expect(
      await snapshot(component, {
        actions: {
          hover: '#addon',
        },
      }),
    ).toMatchImageSnapshot();
  });
});
