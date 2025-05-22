import React, { useRef, useEffect } from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import {
  cleanup,
  render,
  fireEvent,
  userEvent,
  screen,
} from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import Dropdown from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('dropdown Dependency imports', () => {
  runDependencyCheckTests('dropdown');
});

describe('Dropdown', () => {
  beforeEach(() => {
    cleanup();
  });

  test('Should correct enter space in input', () => {
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

  test('should not open popper by keypress enter if interaction not click', async ({ expect }) => {
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
  });

  test.concurrent('Should correct enter space in input', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Dropdown onVisibleChange={spy} interaction='focus'>
        <Dropdown.Trigger tag='input' data-testid='input' />
      </Dropdown>,
    );

    const input = getByTestId('input');

    fireEvent.keyDown(input, { key: ' ', which: 32, keyCode: 32 });
    // TODO: input.value всегда пустой, поэтому проверяем, что spy не вызван
    expect(spy).not.toHaveBeenCalled();
  });

  test.concurrent('should not open popper by keypress enter if interaction not click', async () => {
    const spy = vi.fn();
    render(
      <Dropdown onVisibleChange={spy} interaction={'none'}>
        <Dropdown.Trigger>
          <div tabIndex={0}>Select trigger</div>
        </Dropdown.Trigger>
        <Dropdown.Popper aria-label='test' p={4}>
          Content
        </Dropdown.Popper>
      </Dropdown>,
    );

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');
    expect(spy).not.toBeCalled();
  });

  test('should not prevent default if tab and popper has focusable elements', () => {
    render(
      <Dropdown visible interaction='click'>
        <Dropdown.Trigger>Trigger</Dropdown.Trigger>
        <Dropdown.Popper aria-label='test'>Focusable</Dropdown.Popper>
      </Dropdown>,
    );

    const buttons = screen.getAllByRole('button', { name: /Trigger/i });
    const triggerButton = buttons[0];
    const prevent = vi.fn();

    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    Object.defineProperty(event, 'preventDefault', { value: prevent });

    triggerButton.dispatchEvent(event);

    expect(prevent).not.toHaveBeenCalled();
  });

  test('should prevent default on Tab keydown if no focusable elements in popper', () => {
    render(
      <Dropdown visible interaction='click'>
        <Dropdown.Trigger>Trigger</Dropdown.Trigger>
        <Dropdown.Popper aria-label='test'>
          <div>No focusable elements</div>
        </Dropdown.Popper>
      </Dropdown>,
    );

    const buttons = screen.getAllByRole('button', { name: /Trigger/i });
    const triggerButton = buttons[0];
    const prevent = vi.fn();

    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    Object.defineProperty(event, 'preventDefault', { value: prevent });

    triggerButton.dispatchEvent(event);

    expect(prevent).toHaveBeenCalled();
  });

  test('handlerTriggerKeyDown does not open dropdown if interaction is none', () => {
    const spyVisibleChange = vi.fn();

    render(
      <Dropdown onVisibleChange={spyVisibleChange} interaction='none' defaultVisible={false}>
        <Dropdown.Trigger>Trigger</Dropdown.Trigger>
        <Dropdown.Popper aria-label='test'>Content</Dropdown.Popper>
      </Dropdown>,
    );

    const buttons = screen.getAllByRole('button', { name: /Trigger/i });
    const triggerButton = buttons[0];
    fireEvent.keyDown(triggerButton, { key: 'Enter' });
    fireEvent.keyDown(triggerButton, { key: ' ' });

    expect(spyVisibleChange).not.toHaveBeenCalled();
  });
});
