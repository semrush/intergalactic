import React from 'react';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import {
  cleanup,
  render,
  fireEvent,
  userEvent,
  screen,
} from '@semcore/testing-utils/testing-library';

import Dropdown from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('dropdown Dependency imports', () => {
  runDependencyCheckTests('dropdown');
});

describe('Dropdown', () => {
  beforeEach(() => {
    cleanup();
  });

  test('Verify not open popper by keyboard enter if interaction none', async ({ expect }) => {
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

  test('Verify prevent default on Tab if no focusable elements in popper', () => {
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

  test('Verify handlerTriggerKeyDown does not open dropdown if interaction is none', () => {
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
