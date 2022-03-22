import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup, fireEvent, render, axe } = testing;

import { snapshot } from '@semcore/jest-preset-ui';
import Radio, { RadioGroup, inputProps } from '../src';
import { shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;

describe('Radio', () => {
  afterEach(cleanup);

  shouldSupportClassName(Radio);
  shouldSupportRef(Radio);
  shouldSupportClassName(Radio.Value, Radio);
  shouldSupportRef(Radio.Value, Radio);
  shouldSupportClassName(Radio.Text, Radio);
  shouldSupportRef(Radio.Text, Radio);

  test('Should support custom attributes on the input', () => {
    const { getByTestId } = render(
      <Radio>
        <Radio.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="input"
          name="radio"
        />
      </Radio>,
    );

    expect(getByTestId('input').attributes['name'].value).toBe('radio');
  });

  test('Should support sizes', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Radio size="xl">
          <Radio.Value />
        </Radio>
        <Radio size="l">
          <Radio.Value />
        </Radio>
        <Radio size="m">
          <Radio.Value />
        </Radio>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support normal state', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Radio>
          <Radio.Value />
        </Radio>
        <Radio>
          <Radio.Value disabled />
        </Radio>
        <Radio>
          <Radio.Value keyboardFocused />
        </Radio>
        <Radio>
          <Radio.Value checked />
        </Radio>
        <Radio>
          <Radio.Value checked disabled />
        </Radio>
        <Radio>
          <Radio.Value checked keyboardFocused />
        </Radio>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support invalid state', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Radio state="invalid">
          <Radio.Value />
        </Radio>
        <Radio state="invalid">
          <Radio.Value disabled />
        </Radio>
        <Radio state="invalid">
          <Radio.Value keyboardFocused />
        </Radio>
        <Radio state="invalid">
          <Radio.Value checked />
        </Radio>
        <Radio state="invalid">
          <Radio.Value checked disabled />
        </Radio>
        <Radio state="invalid">
          <Radio.Value checked keyboardFocused />
        </Radio>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support change of state "checked" on click in label', async () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Radio data-testid="label">
        <Radio.Value onChange={spy} />
      </Radio>,
    );

    fireEvent.click(getByTestId('label'));
    expect(spy).toHaveBeenCalled();
  });
});

describe('RadioGroup', () => {
  afterEach(cleanup);

  test('Should transfer name to Radio', () => {
    const { getByTestId } = render(
      <RadioGroup name="test">
        <Radio>
          <Radio.Value includeInputProps={['data-testid', ...inputProps]} data-testid="radio" />
        </Radio>
      </RadioGroup>,
    );

    expect(getByTestId('radio').name).toContain('test');
  });

  test('Should support onChange', () => {
    const onChange = jest.fn();
    const onChangeRadio = jest.fn();
    const value = 'test';
    const { getByTestId } = render(
      <RadioGroup onChange={onChange}>
        <Radio>
          <Radio.Value
            includeInputProps={['data-testid', ...inputProps]}
            data-testid="radio"
            value={value}
            onChange={onChangeRadio}
          />
        </Radio>
      </RadioGroup>,
    );

    fireEvent.click(getByTestId('radio'));
    expect(onChange).toHaveBeenCalledWith(value, expect.anything());
    expect(onChangeRadio).toHaveBeenCalled();
  });

  test('Should support initial value', () => {
    const { getByTestId } = render(
      <RadioGroup name="test" value="1">
        <Radio>
          <Radio.Value
            value="1"
            includeInputProps={['data-testid', ...inputProps]}
            data-testid="radio"
          />
          <Radio.Value
            value="2"
            includeInputProps={['data-testid', ...inputProps]}
            data-testid="radioSecond"
          />
        </Radio>
      </RadioGroup>,
    );

    expect(getByTestId('radio').checked).toBeTruthy();
    expect(getByTestId('radioSecond').checked).toBeFalsy();
  });

  test('Should support sizes', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <RadioGroup size="xl">
          <Radio>
            <Radio.Value />
          </Radio>
          <Radio>
            <Radio.Value />
          </Radio>
        </RadioGroup>
        <RadioGroup size="l">
          <Radio>
            <Radio.Value />
          </Radio>
          <Radio>
            <Radio.Value />
          </Radio>
        </RadioGroup>
        <RadioGroup size="m">
          <Radio>
            <Radio.Value />
          </Radio>
          <Radio>
            <Radio.Value />
          </Radio>
        </RadioGroup>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support change size when set property in Radio.Value', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <RadioGroup>
          <Radio>
            <Radio.Value />
          </Radio>
          <Radio size="xl">
            <Radio.Value />
          </Radio>
        </RadioGroup>
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <RadioGroup name="radio" value="1">
        <Radio>
          <Radio.Value value="1" />
          <Radio.Text>1</Radio.Text>
        </Radio>
        <Radio>
          <Radio.Value value="2" />
          <Radio.Text>2</Radio.Text>
        </Radio>
      </RadioGroup>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
