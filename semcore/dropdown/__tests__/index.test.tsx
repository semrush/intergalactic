import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, render, fireEvent, userEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import Dropdown from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('dropdown Dependency imports', () => {
  runDependencyCheckTests('dropdown');
});

describe('Dropdown', () => {
  beforeEach(cleanup);

  test.concurrent('Should correct enter space in input', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Dropdown onVisibleChange={spy} interaction='focus'>
        <Dropdown.Trigger tag='input' data-testid='input' />
      </Dropdown>,
    );

    const input = getByTestId('input');

    fireEvent.keyDown(input, { key: ' ', which: 32, keyCode: 32 });
    //TODO, because input.value all time print empty string
    expect(spy).not.toHaveBeenCalled();
  });

  test.concurrent('correct style', async ({ task }) => {
    const component = (
      <div style={{ width: 150, height: 60 }}>
        <Dropdown disablePortal visible>
          <Dropdown.Trigger>
            <button type='button'>default dropdown</button>
          </Dropdown.Trigger>
          <Dropdown.Popper aria-label={'Dropdown popper description'} style={{ opacity: 1 }}>
            <div>text</div>
          </Dropdown.Popper>
        </Dropdown>
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('popper focused styles', async ({ task }) => {
    const component = (
      <div style={{ width: 150, height: 60 }}>
        <Dropdown disablePortal visible>
          <Dropdown.Trigger>
            <button type='button'>default dropdown</button>
          </Dropdown.Trigger>
          <Dropdown.Popper aria-label={'Dropdown popper description'} data-ui-name='popper'>
            <div>text</div>
          </Dropdown.Popper>
        </Dropdown>
      </div>
    );

    await expect(
      await snapshot(component, {
        actions: {
          focus: '[data-ui-name="popper"]',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.skip('should not loose focus by Tab after opened', async ({ expect }) => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <>
        <Dropdown onVisibleChange={spy}>
          <Dropdown.Trigger>
            <div tabIndex={0} data-testid='trigger'>
              Select trigger
            </div>
          </Dropdown.Trigger>
          <Dropdown.Popper aria-label={'Dropdown popper description'} p={4}>
            Content
          </Dropdown.Popper>
        </Dropdown>
      </>,
    );

    await userEvent.keyboard('[Tab]');
    expect(getByTestId('trigger')).toHaveFocus();

    await userEvent.keyboard('[Enter]');
    expect(spy).toBeCalledWith(true);

    await userEvent.keyboard('[Tab]');
    expect(getByTestId('trigger')).toHaveFocus();

    await userEvent.keyboard('[Escape]');
    expect(spy).toBeCalledWith(false, expect.anything());
  });

  test.concurrent(
    'should not open popper by keypress enter if interaction not click',
    async ({ expect }) => {
      const spy = vi.fn();
      render(
        <Dropdown onVisibleChange={spy} interaction={'none'}>
          <Dropdown.Trigger>
            <div tabIndex={0}>Select trigger</div>
          </Dropdown.Trigger>
          <Dropdown.Popper aria-label={'Dropdown popper description'} p={4}>
            Content
          </Dropdown.Popper>
        </Dropdown>,
      );

      await userEvent.keyboard('[Tab]');
      await userEvent.keyboard('[Enter]');
      expect(spy).not.toBeCalled();
    },
  );

  test('a11y', async () => {
    const { container } = render(
      <Dropdown visible disablePortal>
        <Dropdown.Trigger tag='button' aria-label='default dropdown'>
          default dropdown
        </Dropdown.Trigger>
        <Dropdown.Popper aria-label={'Dropdown popper description'}>
          <div>text</div>
        </Dropdown.Popper>
      </Dropdown>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
