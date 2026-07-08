import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Radio, { RadioGroup, inputProps } from '../src/Radio';

describe('radio Dependency imports', () => {
  runDependencyCheckTests('radio');
});

describe('Radio', () => {
  beforeEach(cleanup);

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

    expect((getByTestId('input') as HTMLInputElement).name).toBe('radio');
  });

  test('Verify state  changes to "checked" by click on label', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Radio data-testid='label'>
        <Radio.Value onChange={spy} />
      </Radio>,
    );

    await userEvent.click(getByTestId('label'));
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

    expect((getByTestId('radio') as HTMLInputElement).name).toContain('test');
  });

  test('Verify supports onChange', async () => {
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

    await userEvent.click(getByTestId('radio'));
    expect(onChangeRadio).toHaveBeenCalledWith(expect.anything());
    expect(onChange).toHaveBeenCalledWith(value, expect.anything());
  });

  test('Verify supports cancel chain of onChanges', async () => {
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

    await userEvent.click(getByTestId('radio'));
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

    expect((getByTestId('radio') as HTMLInputElement).checked).toBeTruthy();
    expect((getByTestId('radioSecond') as HTMLInputElement).checked).toBeFalsy();
  });

  test.concurrent('Verify supports initial value in Radio', () => {
    const { getByTestId } = render(
      <RadioGroup name='test' value='2'>
        <Radio value='1'>
          <Radio.Value>
            <Radio.Value.Control data-testid='radioControl' />
          </Radio.Value>
        </Radio>
        <Radio value='2'>
          <Radio.Value>
            <Radio.Value.Control data-testid='radioControlSecond' />
          </Radio.Value>
        </Radio>
      </RadioGroup>,
    );

    expect((getByTestId('radioControl') as HTMLInputElement).checked).toBeFalsy();
    expect((getByTestId('radioControlSecond') as HTMLInputElement).checked).toBeTruthy();
  });

  test('Verify supports disabled prop', async () => {
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

  test('Verify supports different types of value', async () => {
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

    expect((getByTestId('r2') as HTMLInputElement).checked).toBe(true);

    await userEvent.click(getByTestId('r1'));
    expect(onChange).toHaveBeenCalledWith('1', expect.anything());
    expect((getByTestId('r1') as HTMLInputElement).checked).toBe(true);
  });

  test('Verify disabled priority: group vs item', () => {
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

    expect((getByTestId('rFalse') as HTMLInputElement).disabled).toBe(false);
    expect((getByTestId('rGroupDisabled') as HTMLInputElement).disabled).toBe(true);

    spyWarn.mockRestore();
  });
});
