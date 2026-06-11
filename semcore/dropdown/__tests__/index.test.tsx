import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import {
  cleanup,
  render,
  userEvent,
  screen,
} from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Dropdown from '../src';

describe('dropdown Dependency imports', () => {
  runDependencyCheckTests('dropdown');
});

describe('Dropdown.StatusItem', () => {
  beforeEach(() => {
    cleanup();
  });

  test('Verify renders visible default state when nothing found', () => {
    render(<Dropdown.StatusItem id='search-result' itemsCount={0} />);

    const status = screen.getByText('Nothing found');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('id', 'search-result');
  });

  test('Verify renders screen reader result count', () => {
    render(<Dropdown.StatusItem id='search-result' itemsCount={2} />);

    const status = screen.getByText('2 results found');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('id', 'search-result');
    expect(status).toHaveAttribute('aria-hidden', 'true');
  });

  test('Verify renders singular result count', () => {
    render(<Dropdown.StatusItem id='search-result' itemsCount={1} />);

    expect(screen.getByText('1 result found')).toBeInTheDocument();
  });

  test('Verify renders loading and error states', () => {
    const { rerender } = render(<Dropdown.StatusItem id='search-result' itemsCount={0} state='loading' />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    rerender(<Dropdown.StatusItem id='search-result' itemsCount={0} state='error' />);

    expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
  });

  test('Verify custom children override status text', () => {
    render(
      <Dropdown.StatusItem id='search-result' itemsCount={0}>
        Custom empty state
      </Dropdown.StatusItem>,
    );

    expect(screen.getByText('Custom empty state')).toBeInTheDocument();
    expect(screen.queryByText('Nothing found')).not.toBeInTheDocument();
  });
});

describe('Dropdown', () => {
  beforeEach(() => {
    cleanup();

    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test('Verify not open popper by keyboard enter if interaction none', async () => {
    const spy = vi.fn();
    render(
      <Dropdown onVisibleChange={spy} interaction='none'>
        <Dropdown.Trigger>
          <div tabIndex={0}>Select trigger</div>
        </Dropdown.Trigger>
        <Dropdown.Popper aria-label='Dropdown popper description' p={4}>
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

  test('Verify handlerTriggerKeyDown does not open dropdown if interaction is none', async () => {
    const spyVisibleChange = vi.fn();

    render(
      <Dropdown onVisibleChange={spyVisibleChange} interaction='none' defaultVisible={false}>
        <Dropdown.Trigger>Trigger</Dropdown.Trigger>
        <Dropdown.Popper aria-label='test'>Content</Dropdown.Popper>
      </Dropdown>,
    );

    const buttons = screen.getAllByRole('button', { name: /Trigger/i });
    const triggerButton = buttons[0];
    await userEvent.click(triggerButton);
    await userEvent.keyboard('[Enter]');
    await userEvent.keyboard('[Space]');

    expect(spyVisibleChange).not.toHaveBeenCalled();
  });
});
