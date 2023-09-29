import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import Radio, { RadioGroup, inputProps } from '../src/Radio';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('Radio', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Radio);
  shouldSupportRef(Radio);
  shouldSupportClassName(Radio.Value, Radio);
  shouldSupportRef(Radio.Value, Radio);
  shouldSupportClassName(Radio.Text, Radio);
  shouldSupportRef(Radio.Text, Radio);

  test.concurrent('Should support custom attributes on the input', () => {
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

  test.concurrent('Should support sizes', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Radio size='l'>
          <Radio.Value />
          <Radio.Text>Test quest</Radio.Text>
        </Radio>
        <Radio size='m'>
          <Radio.Value />
          <Radio.Text>Test quest</Radio.Text>
        </Radio>
        <Radio size='l'>
          <Radio.Value checked />
          <Radio.Text>Test quest</Radio.Text>
        </Radio>
        <Radio size='m'>
          <Radio.Value checked />
          <Radio.Text>Test quest</Radio.Text>
        </Radio>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support normal state', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Radio>
          <Radio.Value />
        </Radio>
        <Radio disabled>
          <Radio.Value />
        </Radio>
        <Radio>
          <Radio.Value keyboardFocused />
        </Radio>
        <Radio checked>
          <Radio.Value />
        </Radio>
        <Radio>
          <Radio.Value checked disabled />
        </Radio>
        <Radio>
          <Radio.Value checked keyboardFocused />
        </Radio>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support invalid state', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Radio state='invalid'>
          <Radio.Value />
        </Radio>
        <Radio state='invalid'>
          <Radio.Value disabled />
        </Radio>
        <Radio state='invalid'>
          <Radio.Value keyboardFocused />
        </Radio>
        <Radio state='invalid'>
          <Radio.Value checked />
        </Radio>
        <Radio state='invalid'>
          <Radio.Value checked disabled />
        </Radio>
        <Radio state='invalid'>
          <Radio.Value checked keyboardFocused />
        </Radio>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support theme', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Radio theme='yellow-400'>
          <Radio.Value />
        </Radio>
        <Radio theme='yellow-400'>
          <Radio.Value checked />
        </Radio>
        <Radio state='invalid' theme='yellow-400'>
          <Radio.Value />
        </Radio>
        <Radio state='invalid' theme='yellow-400'>
          <Radio.Value checked />
        </Radio>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should support change of state "checked" on click in label', async () => {
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

  test.concurrent('Should transfer name to Radio', () => {
    const { getByTestId } = render(
      <RadioGroup name='test'>
        <Radio>
          <Radio.Value includeInputProps={['data-testid', ...inputProps]} data-testid='radio' />
        </Radio>
      </RadioGroup>,
    );

    expect(getByTestId('radio').name).toContain('test');
  });

  test('Should not call group onChange if no value in context', () => {
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
    expect(onChange).not.toHaveBeenCalled(value, expect.anything());
    expect(onChangeRadio).toHaveBeenCalled();
  });

  test('Should not call value onChange if value exist in context', () => {
    const onChange = vi.fn();
    const onChangeRadio = vi.fn();
    const value = 'test';
    const { getByTestId } = render(
      <RadioGroup value={'someValue'} onChange={onChange}>
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
    expect(onChange).toHaveBeenCalled(value, expect.anything());
    expect(onChangeRadio).not.toHaveBeenCalled();
  });

  test.concurrent('Should support initial value in Radio.Value', () => {
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

  test.concurrent('Should support initial value in Radio', () => {
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

  test.concurrent('Should support sizes', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <RadioGroup size='l'>
          <Radio>
            <Radio.Value />
          </Radio>
          <Radio>
            <Radio.Value />
          </Radio>
        </RadioGroup>
        <RadioGroup size='m'>
          <Radio>
            <Radio.Value />
          </Radio>
          <Radio>
            <Radio.Value />
          </Radio>
        </RadioGroup>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent(
    'Should support change size when set property in Radio.Value',
    async ({ task }) => {
      const component = (
        <snapshot.ProxyProps m='5px'>
          <RadioGroup>
            <Radio>
              <Radio.Value />
            </Radio>
            <Radio size='l'>
              <Radio.Value />
            </Radio>
          </RadioGroup>
        </snapshot.ProxyProps>
      );
      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    },
  );

  test('a11y', async () => {
    const { container } = render(
      <RadioGroup name='radio' value='1'>
        <Radio>
          <Radio.Value value='1' />
          <Radio.Text>1</Radio.Text>
        </Radio>
        <Radio>
          <Radio.Value value='2' />
          <Radio.Text>2</Radio.Text>
        </Radio>
      </RadioGroup>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
