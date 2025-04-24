import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import Radio, { RadioGroup, inputProps } from '../src/Radio';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('radio Dependency imports', () => {
  runDependencyCheckTests('radio');
});

describe('Radio', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Radio);
  shouldSupportRef(Radio);
  shouldSupportClassName(Radio.Value, Radio);
  shouldSupportRef(Radio.Value, Radio);
  shouldSupportClassName(Radio.Text, Radio);
  shouldSupportRef(Radio.Text, Radio);

  test.concurrent('Verify supports custom attributes on the input', () => {
    const { getByTestId } = render(
      <Radio>
        <Radio.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid='input'
          name='radio'
        />
      </Radio>,
    );

    expect(getByTestId('input').attributes['name'].value).toBe('radio');
  });

  test('Verify state  changes to "checked" by click on label', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Radio data-testid='label'>
        <Radio.Value onChange={spy} />
      </Radio>,
    );

    fireEvent.click(getByTestId('label'));
    expect(spy).toHaveBeenCalled();
  });
});

describe('RadioGroup', () => {
  beforeEach(cleanup);

  test.concurrent('Verify name transfers to Radio', () => {
    const { getByTestId } = render(
      <RadioGroup name='test'>
        <Radio>
          <Radio.Value includeInputProps={['data-testid', ...inputProps]} data-testid='radio' />
        </Radio>
      </RadioGroup>,
    );

    expect(getByTestId('radio').name).toContain('test');
  });

  test('Verify supports onChange', () => {
    const onChange = vi.fn();
    const onChangeRadio = vi.fn();
    const value = 'test';
    const { getByTestId } = render(
      <RadioGroup onChange={onChange}>
        <Radio>
          <Radio.Value
            includeInputProps={['data-testid', ...inputProps]}
            data-testid='radio'
            value={value}
            onChange={onChangeRadio}
          />
        </Radio>
      </RadioGroup>,
    );

    fireEvent.click(getByTestId('radio'));
    expect(onChangeRadio).toHaveBeenCalledWith(expect.anything());
    expect(onChange).toHaveBeenCalledWith(value, expect.anything());
  });

  test('Verify supports cancel chain of onChanges', () => {
    const onChange = vi.fn();
    const onChangeRadio = vi.fn(() => false);
    const value = 'test';
    const { getByTestId } = render(
      <RadioGroup onChange={onChange}>
        <Radio>
          <Radio.Value
            includeInputProps={['data-testid', ...inputProps]}
            data-testid='radio'
            value={value}
            onChange={onChangeRadio}
          />
        </Radio>
      </RadioGroup>,
    );

    fireEvent.click(getByTestId('radio'));
    expect(onChangeRadio).toHaveBeenCalledWith(expect.anything());
    expect(onChange).not.toHaveBeenCalled();
  });

  test.concurrent('Verify supports initial value in Radio.Value', () => {
    const { getByTestId } = render(
      <RadioGroup name='test' value='1'>
        <Radio>
          <Radio.Value
            value='1'
            includeInputProps={['data-testid', ...inputProps]}
            data-testid='radio'
          />
          <Radio.Value
            value='2'
            includeInputProps={['data-testid', ...inputProps]}
            data-testid='radioSecond'
          />
        </Radio>
      </RadioGroup>,
    );

    expect(getByTestId('radio').checked).toBeTruthy();
    expect(getByTestId('radioSecond').checked).toBeFalsy();
  });

  test.concurrent('Verify supports initial value in Radio', () => {
    const { getByTestId } = render(
      <RadioGroup name='test' value='2'>
        <Radio value={'1'}>
          <Radio.Value>
            <Radio.Value.Control data-testid='radioControl' />
          </Radio.Value>
        </Radio>
        <Radio value={'2'}>
          <Radio.Value>
            <Radio.Value.Control data-testid='radioControlSecond' />
          </Radio.Value>
        </Radio>
      </RadioGroup>,
    );

    expect(getByTestId('radioControl').checked).toBeFalsy();
    expect(getByTestId('radioControlSecond').checked).toBeTruthy();
  });

  test('Verify supports disabled prop', async ({ expect }) => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <RadioGroup onChange={spy}>
        {[1, 2, 3].map((i) => {
          return (
            <Radio
              key={i}
              disabled={i % 2 === 0}
              value={String(i)}
              label={`Value - ${i}`}
              data-testid={`radio_${i}`}
            />
          );
        })}
      </RadioGroup>,
    );

    const firstRadio = getByTestId('radio_1');

    firstRadio.click();

    expect(spy).toBeCalledWith('1', expect.anything());

    const disabledRadio = getByTestId('radio_2');

    disabledRadio.click();

    expect(spy).not.toBeCalledWith('2', expect.anything());
  });

  test('Verify supports different types of value', async ({ expect }) => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <RadioGroup onChange={spy}>
        {[1, '2', true].map((i, index) => {
          return (
            <Radio
              key={index}
              value={i}
              label={`Value - ${index}`}
              data-testid={`radio_${index}`}
            />
          );
        })}
      </RadioGroup>,
    );

    const numberRadio = getByTestId('radio_0');
    numberRadio.click();
    expect(spy).toBeCalledWith(1, expect.anything());

    const stringRadio = getByTestId('radio_1');
    stringRadio.click();
    expect(spy).toBeCalledWith('2', expect.anything());

    const booleanRadio = getByTestId('radio_2');
    booleanRadio.click();
    expect(spy).toBeCalledWith(true, expect.anything());
  });

  test('Verify Uncontrolled defaultValue behavior', async () => {
    const onChange = vi.fn();
    const { getByTestId } = render(
      <RadioGroup defaultValue='2' onChange={onChange}>
        <Radio>
          <Radio.Value
            data-testid='r1'
            includeInputProps={['data-testid', ...inputProps]}
            value='1'
          />
        </Radio>
        <Radio>
          <Radio.Value
            data-testid='r2'
            includeInputProps={['data-testid', ...inputProps]}
            value='2'
          />
        </Radio>
      </RadioGroup>,
    );

    expect(getByTestId('r2').checked).toBe(true);

    fireEvent.click(getByTestId('r1'));
    expect(onChange).toHaveBeenCalledWith('1', expect.anything());
    expect(getByTestId('r1').checked).toBe(true);
  });

  test('Verofy disabled priority: group vs item', () => {
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { getByTestId } = render(
      <RadioGroup disabled>
        <Radio disabled={false}>
          <Radio.Value
            includeInputProps={['data-testid', ...inputProps]}
            data-testid='rFalse'
            value='1'
          />
        </Radio>
        <Radio>
          <Radio.Value
            includeInputProps={['data-testid', ...inputProps]}
            data-testid='rGroupDisabled'
            value='2'
          />
        </Radio>
      </RadioGroup>,
    );

    expect(getByTestId('rFalse').disabled).toBe(false);
    expect(getByTestId('rGroupDisabled').disabled).toBe(true);
  });
});
