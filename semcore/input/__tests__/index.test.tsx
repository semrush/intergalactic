import React from 'react';
import Search from '@semcore/icon/Search/m';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import Input from '../src';

import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('Input', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Input);
  shouldSupportRef(Input);

  test.concurrent('Should support sizes', async ({ task }) => {
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
        <InputSize size='m' />
        <InputSize size='l' />
      </snapshot.ProxyProps>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support states', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Input state='normal'>
          <Input.Value />
        </Input>
        <Input state='valid'>
          <Input.Value />
        </Input>
        <Input state='invalid'>
          <Input.Value />
        </Input>
      </snapshot.ProxyProps>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support focus states', async ({ task }) => {
    await expect(
      await snapshot(
        <Input state='normal' focused>
          <Input.Value id='input' />
        </Input>,
        {
          actions: {
            focus: '#input',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Input state='valid' focused>
          <Input.Value id='input' />
        </Input>,
        {
          actions: {
            focus: '#input',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Input state='invalid' focused>
          <Input.Value id='input' />
        </Input>,
        {
          actions: {
            focus: '#input',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support root disabled', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support correctly render', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Input>
          <Input.Value placeholder='Placeholder' />
        </Input>
        <Input>
          <Input.Value readOnly />
        </Input>
        <Input>
          <Input.Value disabled />
        </Input>
      </snapshot.ProxyProps>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support change value when rerender', () => {
    const { getByTestId, rerender } = render(
      <Input>
        <Input.Value data-testid='value' value='' />
      </Input>,
    );

    expect(getByTestId('value').value).toBe('');

    rerender(
      <Input>
        <Input.Value data-testid='value' value='test' />
      </Input>,
    );

    expect(getByTestId('value').value).toBe('test');
  });

  test.concurrent('Should support controlled mod', () => {
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

  shouldSupportClassName(Input.Value);
  shouldSupportRef(Input.Value, Input);

  test.concurrent('Should focus input if additional element click', () => {
    const spy = vi.fn();
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
    const spy = vi.fn();
    const { queryByText } = render(
      <Input>
        <Input.Addon onMouseDown={() => false}>addon</Input.Addon>
        <Input.Value onFocus={spy} />
      </Input>,
    );
    fireEvent.mouseDown(queryByText('addon'));
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test.concurrent('Should support hover interactive', async ({ task }) => {
    const component = (
      <Input>
        <Input.Addon interactive id='addon'>
          Addon
        </Input.Addon>
        <Input.Value />
        <Input.Addon interactive>Addon</Input.Addon>
      </Input>
    );
    await expect(
      await snapshot(component, {
        actions: {
          hover: '#addon',
        },
      }),
    ).toMatchImageSnapshot(task);
  });
});
