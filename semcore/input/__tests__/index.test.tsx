import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Input from '../src';

describe('input Dependency imports', () => {
  runDependencyCheckTests('input');
});

describe('Input', () => {
  beforeEach(cleanup);

  test.concurrent('Verify value changes when rerender', () => {
    const { getByTestId, rerender } = render(
      <Input>
        <Input.Value data-testid='value' value='' />
      </Input>,
    );

    expect((getByTestId('value') as HTMLInputElement).value).toBe('');

    rerender(
      <Input>
        <Input.Value data-testid='value' value='test' />
      </Input>,
    );

    expect((getByTestId('value') as HTMLInputElement).value).toBe('test');
  });

  test.concurrent('Verify controlled mod', () => {
    let value = '';
    const spy = vi.fn((v) => {
      value = v;
    });

    const { getByTestId, rerender } = render(
      <Input>
        <Input.Value data-testid='input' value={value} onChange={spy} />
      </Input>,
    );

    const input = getByTestId('input');

    expect(input).toHaveProperty('value', '');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(spy).toBeCalled();

    rerender(
      <Input>
        <Input.Value data-testid='input' value={value} onChange={spy} />
      </Input>,
    );

    expect(input).toHaveProperty('value', 'test');
  });
});

describe('Input.Addon', () => {
  beforeEach(cleanup);

  test.concurrent('Verify input focused if click additional element', () => {
    const spy = vi.fn();
    const { queryByText } = render(
      <Input>
        <Input.Addon>addon</Input.Addon>
        <Input.Value onFocus={spy} />
      </Input>,
    );
    expect(spy).toHaveBeenCalledTimes(0);
    fireEvent.mouseDown(queryByText('addon')!);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Verify input focused of onMouseDown on additional return false', () => {
    const spy = vi.fn();
    const { queryByText } = render(
      <Input>
        <Input.Addon onMouseDown={() => false}>addon</Input.Addon>
        <Input.Value onFocus={spy} />
      </Input>,
    );
    fireEvent.mouseDown(queryByText('addon')!);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
