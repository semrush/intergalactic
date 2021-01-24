import React from 'react';
import { cleanup, fireEvent, render } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import snapshot from 'jest-preset-ui/snapshot';
import Checkbox, { inputProps } from '../src';

describe('Checkbox', () => {
  afterEach(cleanup);

  shouldSupportClassName(Checkbox);
  shouldSupportRef(Checkbox);
  shouldSupportClassName(Checkbox.Value, Checkbox);
  shouldSupportRef(Checkbox.Value, Checkbox);
  shouldSupportClassName(Checkbox.Text, Checkbox);
  shouldSupportRef(Checkbox.Text, Checkbox);

  test('Should support includeInputProps on the input', () => {
    const { getByTestId } = render(
      <Checkbox>
        <Checkbox.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="input"
          name="checkbox"
        />
      </Checkbox>,
    );

    expect(getByTestId('input')).toHaveProperty('checked', false);
    expect(getByTestId('input')).toHaveProperty('name', 'checkbox');
  });

  test('Should support checked', () => {
    const { getByTestId } = render(
      <Checkbox>
        <Checkbox.Value
          checked
          onChange={() => {} /* Hack to prevent warnings */}
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="input"
        />
      </Checkbox>,
    );

    expect(getByTestId('input')).toHaveProperty('checked', true);
  });

  test('Should support defaultChecked', () => {
    const { getByTestId } = render(
      <Checkbox>
        <Checkbox.Value
          defaultChecked
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="input"
        />
      </Checkbox>,
    );

    expect(getByTestId('input')).toHaveProperty('checked', true);
  });

  test('Should support indeterminate', () => {
    const { getByTestId } = render(
      <Checkbox>
        <Checkbox.Value
          indeterminate
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="input"
        />
      </Checkbox>,
    );

    expect(getByTestId('input')).toHaveProperty('indeterminate', true);
  });

  // TODO: не пашет 🤷‍
  // test('Should support defaultIndeterminate', () => {
  //   const { getByTestId } = render(
  //     <Checkbox>
  //       <Checkbox.Value
  //         defaultIndeterminate
  //         includeInputProps={['data-testid', ...inputProps]}
  //         data-testid="input"
  //       />
  //     </Checkbox>,
  //   );
  //
  //   expect(getByTestId('input')).toHaveProperty('indeterminate', true);
  // });

  test(`Should handle onChange on each component's part`, async () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Checkbox data-testid="wrapper">
        <Checkbox.Value data-testid="box" onChange={spy} />
        <Checkbox.Text data-testid="label">Hello</Checkbox.Text>
      </Checkbox>,
    );

    fireEvent.click(getByTestId('wrapper'));
    expect(spy).toHaveBeenCalledTimes(1);
    fireEvent.click(getByTestId('box'));
    expect(spy).toHaveBeenCalledTimes(2);
    fireEvent.click(getByTestId('label'));
    expect(spy).toHaveBeenCalledTimes(3);
  });

  test(`Should handle onChange if disabled`, async () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Checkbox data-testid="wrapper">
        <Checkbox.Value data-testid="box" onChange={spy} disabled />
        <Checkbox.Text data-testid="label">Hello</Checkbox.Text>
      </Checkbox>,
    );

    fireEvent.click(getByTestId('wrapper'));
    expect(spy).toHaveBeenCalledTimes(0);
    fireEvent.click(getByTestId('box'));
    expect(spy).toHaveBeenCalledTimes(0);
    fireEvent.click(getByTestId('label'));
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Should support uncontrolled mod', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Checkbox>
        <Checkbox.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="input"
          onChange={spy}
        />
        <Checkbox.Text data-testid="label">Hello</Checkbox.Text>
      </Checkbox>,
    );

    const label = getByTestId('label');
    const input = getByTestId('input');

    expect(input).toHaveProperty('checked', false);

    fireEvent.click(label);

    expect(spy).toBeCalled();
    expect(input).toHaveProperty('checked', true);
  });

  test('Should support controlled mod', () => {
    let checked = false;
    const spy = jest.fn((value) => {
      checked = value;
    });
    const { getByTestId, rerender } = render(
      <Checkbox>
        <Checkbox.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="input"
          checked={checked}
          onChange={spy}
        />
        <Checkbox.Text data-testid="label">Hello</Checkbox.Text>
      </Checkbox>,
    );

    const label = getByTestId('label');
    const input = getByTestId('input');

    expect(input).toHaveProperty('checked', false);

    fireEvent.click(label);
    expect(spy).toBeCalled();

    rerender(
      <Checkbox>
        <Checkbox.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="input"
          checked={checked}
          onChange={spy}
        />
        <Checkbox.Text data-testid="label">Hello</Checkbox.Text>
      </Checkbox>,
    );

    expect(input).toHaveProperty('checked', true);
  });

  // Screenshot tests
  test('Should support sizes', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Checkbox size="xl">
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox size="l">
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox size="m">
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support normal state', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Checkbox>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value defaultChecked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value defaultChecked disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value defaultChecked keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        {/*<Checkbox>*/}
        {/*  <Checkbox.Value indeterminate />*/}
        {/*  <Checkbox.Text>Label</Checkbox.Text>*/}
        {/*</Checkbox>*/}
        {/*<Checkbox>*/}
        {/*  <Checkbox.Value indeterminate disabled />*/}
        {/*  <Checkbox.Text>Label</Checkbox.Text>*/}
        {/*</Checkbox>*/}
        {/*<Checkbox>*/}
        {/*  <Checkbox.Value indeterminate keyboardFocused />*/}
        {/*  <Checkbox.Text>Label</Checkbox.Text>*/}
        {/*</Checkbox>*/}
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support invalid state', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Checkbox state="invalid">
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state="invalid">
          <Checkbox.Value disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state="invalid">
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state="invalid">
          <Checkbox.Value defaultChecked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state="invalid">
          <Checkbox.Value defaultChecked disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state="invalid">
          <Checkbox.Value defaultChecked keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        {/*<Checkbox state="invalid">*/}
        {/*  <Checkbox.Value indeterminate />*/}
        {/*  <Checkbox.Text>Label</Checkbox.Text>*/}
        {/*</Checkbox>*/}
        {/*<Checkbox state="invalid">*/}
        {/*  <Checkbox.Value indeterminate disabled />*/}
        {/*  <Checkbox.Text>Label</Checkbox.Text>*/}
        {/*</Checkbox>*/}
        {/*<Checkbox state="invalid">*/}
        {/*  <Checkbox.Value indeterminate keyboardFocused />*/}
        {/*  <Checkbox.Text>Label</Checkbox.Text>*/}
        {/*</Checkbox>*/}
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support themes', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Checkbox theme="pink">
          <Checkbox.Value />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme="pink">
          <Checkbox.Value disabled />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme="pink">
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme="pink">
          <Checkbox.Value defaultChecked />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme="pink">
          <Checkbox.Value defaultChecked disabled />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme="pink">
          <Checkbox.Value defaultChecked keyboardFocused />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        {/*<Checkbox theme="pink">*/}
        {/*  <Checkbox.Value indeterminate />*/}
        {/*  <Checkbox.Text>Princess</Checkbox.Text>*/}
        {/*</Checkbox>*/}
        {/*<Checkbox theme="pink">*/}
        {/*  <Checkbox.Value indeterminate disabled />*/}
        {/*  <Checkbox.Text>Princess</Checkbox.Text>*/}
        {/*</Checkbox>*/}
        {/*<Checkbox theme="pink">*/}
        {/*  <Checkbox.Value indeterminate keyboardFocused />*/}
        {/*  <Checkbox.Text>Princess</Checkbox.Text>*/}
        {/*</Checkbox>*/}
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
