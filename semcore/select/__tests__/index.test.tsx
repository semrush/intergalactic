import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, act, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Select, { InputSearch } from '../src';

describe('select Dependency imports', () => {
  runDependencyCheckTests('select');
});

HTMLElement.prototype.scrollIntoView = () => { };

const SelectWrapper = ({ children }: { children: React.ReactNode }) => <Select>{children}</Select>;

const VisibleSelectWrapper = ({ children }: { children: React.ReactNode }) => (
  <Select visible disablePortal>
    {children}
  </Select>
);

const SelectMenuWrapper = ({ children }: { children: React.ReactNode }) => (
  <Select visible disablePortal>
    <Select.Trigger>Trigger</Select.Trigger>
    <Select.Menu>{children}</Select.Menu>
  </Select>
);

const SelectOptionWrapper = ({ children }: { children: React.ReactNode }) => (
  <Select visible disablePortal>
    <Select.Trigger>Trigger</Select.Trigger>
    <Select.Menu>
      <Select.Option value='option'>{children}</Select.Option>
    </Select.Menu>
  </Select>
);

describe('Select data-ui-name', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Select.Trigger,
    Wrapper: SelectWrapper,
    props: { children: 'Trigger' },
    expectedDataUiName: 'Select.Trigger',
  });

  shouldHaveDataUiName({
    Component: Select.Popper,
    Wrapper: VisibleSelectWrapper,
    props: { 'aria-label': 'Select popper', 'children': 'Popper' },
    expectedDataUiName: 'Select.Popper',
  });

  shouldHaveDataUiName({
    Component: Select.Menu,
    Wrapper: VisibleSelectWrapper,
    expectedDataUiName: 'Select.Menu',
  });

  shouldHaveDataUiName({
    Component: Select.List,
    Wrapper: VisibleSelectWrapper,
    expectedDataUiName: 'Select.List',
  });

  shouldHaveDataUiName({
    Component: Select.Option,
    Wrapper: SelectMenuWrapper,
    props: { value: 'option', children: 'Option' },
    expectedDataUiName: 'Select.Option',
  });

  shouldHaveDataUiName({
    Component: Select.Option.Checkbox,
    Wrapper: SelectOptionWrapper,
    expectedDataUiName: 'Select.Option.Checkbox',
  });

  shouldHaveDataUiName({
    Component: Select.Option.Content,
    Wrapper: SelectOptionWrapper,
    props: { children: 'Content' },
    expectedDataUiName: 'Select.Option.Content',
  });

  shouldHaveDataUiName({
    Component: Select.Option.Hint,
    Wrapper: SelectOptionWrapper,
    props: { children: 'Hint' },
    expectedDataUiName: 'Select.Option.Hint',
  });

  shouldHaveDataUiName({
    Component: Select.Group,
    Wrapper: SelectMenuWrapper,
    props: { title: 'Group', children: <Select.Option value='group-option'>Option</Select.Option> },
    expectedDataUiName: 'Select.Group',
  });

  shouldHaveDataUiName({
    Component: Select.InputSearch,
    Wrapper: VisibleSelectWrapper,
    expectedDataUiName: 'Select.InputSearch',
  });
});

describe('Select Trigger', () => {
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

  test.concurrent(
    'Verify popper not opened by keyboard if interaction is none',
    async () => {
      const spy = vi.fn();
      render(
        <Select onVisibleChange={spy} interaction='none'>
          <Select.Trigger />
          <Select.Popper aria-label='Select popper'>
            <Select.Option value='1' />
            <Select.Option value='2' />
          </Select.Popper>
        </Select>,
      );

      await userEvent.keyboard('[Tab]');
      await userEvent.keyboard('[Enter]');
      expect(spy).not.toBeCalled();
    },
  );

  test.concurrent('Verify onVisibleChange calls for click in Option when value selected', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Select visible onVisibleChange={spy}>
        <Select.Trigger />
        <Select.Popper aria-label='Select popper'>
          <Select.Option data-testid='option' value='test' />
        </Select.Popper>
      </Select>,
    );

    await userEvent.click(getByTestId('option'));
    expect(spy).toHaveBeenCalled();
    const callsAfterFirstClick = spy.mock.calls.length;
    await userEvent.click(getByTestId('option'));
    expect(spy.mock.calls.length).toBeGreaterThan(callsAfterFirstClick);
  });

  test('Verify highlights selected item', async () => {
    let highlightedIndex: number | null = null;

    const component = render(
      <Select
        onHighlightedIndexChange={(i) => {
          highlightedIndex = i;
        }}
      >
        <Select.Trigger data-testid='dd-trigger'>Trigger</Select.Trigger>
        <Select.Menu>
          <Select.Option value={1}>Item 1</Select.Option>
          <Select.Option value={2}>Item 2</Select.Option>
          <Select.Option value={3} selected>
            Item 3
          </Select.Option>
        </Select.Menu>
      </Select>,
    );

    const trigger = component.getByTestId('dd-trigger');
    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(highlightedIndex).toBe(2);
  });

  test('Verify select by keypress space with button as trigger (FilterTrigger as example)', async () => {
    const spyChange = vi.fn();

    const component = (
      <Select onChange={spyChange}>
        <Select.Trigger tag='button' data-testid='buttonTrigger' />
        <Select.Popper aria-label='Select popper'>
          <Select.Option value={1}>Option1</Select.Option>
          <Select.Option value={2}>Option2</Select.Option>
          <Select.Option value={3}>Option3</Select.Option>
        </Select.Popper>
      </Select>
    );

    const { getByTestId } = render(component);

    await userEvent.keyboard('[Tab]');
    expect(getByTestId('buttonTrigger')).toHaveFocus();

    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[Space]');

    expect(spyChange).toHaveBeenCalledWith(2, expect.anything());
  });

  test.concurrent('Verify calls render function for custom tag', () => {
    const spy = vi.fn();
    const Tag = React.forwardRef(({ children }: any, ref: React.Ref<HTMLButtonElement>) => (
      <button type='button' ref={ref}>
        {children}
      </button>
    ));

    render(
      <Select>
        <Select.Trigger tag={Tag}>
          {() => {
            spy();
            return null;
          }}
        </Select.Trigger>
      </Select>,
    );
    expect(spy).toBeCalledTimes(1);
  });

  test.concurrent('Verify focus position preserve with mouse navigation', async () => {
    vi.useFakeTimers();
    const { getByTestId } = render(
      <Select value={['2']} disablePortal>
        <Select.Trigger aria-label='Select trigger' data-testid='trigger' />
        <Select.Menu data-testid='menu'>
          <Select.Option value='1'>Option 1</Select.Option>
          <Select.Option value='2' data-testid='option-2'>
            Option 2
          </Select.Option>
        </Select.Menu>
      </Select>,
    );
    act(() => getByTestId('trigger').click());
    act(() => {
      vi.runAllTimers();
    });
    act(() => getByTestId('option-2').focus());
    act(() => getByTestId('option-2').click());
    act(() => {
      vi.runAllTimers();
    });
    act(() => {
      vi.runAllTimers();
    });
    expect(getByTestId('trigger')).toHaveFocus();

    vi.useRealTimers();
  });

  test.sequential(
    'Verify focus position preserve with mouse navigation and interaction=focus',
    async () => {
      vi.useFakeTimers();
      const { getByTestId } = render(
        <Select value={['2']} disablePortal interaction='focus'>
          <Select.Trigger aria-label='Select trigger' data-testid='trigger' tag='input' readOnly />
          <Select.Menu data-testid='menu'>
            <Select.Option value='1'>Option 1</Select.Option>
            <Select.Option value='2' data-testid='option-2'>
              Option 2
            </Select.Option>
          </Select.Menu>
        </Select>,
      );
      act(() => getByTestId('trigger').focus());
      act(() => {
        vi.runAllTimers();
      });
      act(() => getByTestId('option-2').focus());
      act(() => getByTestId('option-2').click());
      act(() => {
        vi.runAllTimers();
      });
      expect(getByTestId('trigger')).toHaveFocus();

      vi.useRealTimers();
    },
  );

  test.sequential(
    'Verify focus position preserve with keyboard navigation and interaction=focus',
    async () => {
      // vi.useFakeTimers();
      const { getByTestId } = render(
        <Select value={['2']} disablePortal interaction='focus'>
          <Select.Trigger aria-label='Select trigger' data-testid='trigger'>
            <input data-testid='input-in-trigger' />
          </Select.Trigger>
          <Select.Menu data-testid='menu'>
            <Select.Option value='1'>Option 1</Select.Option>
            <Select.Option value='2' data-testid='option-2'>
              Option 2
            </Select.Option>
          </Select.Menu>
        </Select>,
      );

      getByTestId('input-in-trigger').focus();

      expect(getByTestId('input-in-trigger')).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await userEvent.keyboard('[Enter]');

      expect(getByTestId('input-in-trigger')).toHaveFocus();
    },
  );
});

describe('Option.Checkbox', () => {
  beforeEach(cleanup);

  test('Verify not focused by Tab between Select.Option.Checkbox(deprecated methids regression)', async () => {
    const { getByTestId } = render(
      <Select>
        <Select.Trigger placeholder="I'll show u some options" data-testid='selectTrigger' />
        <Select.Menu>
          <Select.Option value={1} data-testid='firstOption'>
            I'm option
          </Select.Option>
          <Select.Option value={2}>
            <Select.Option.Checkbox data-testid='secondOptionCheckbox' />
            I'm option-checkbox
          </Select.Option>
          <Select.Option value={3} disabled>
            <Select.Option.Checkbox data-testid='thirdOptionCheckbox' />
            I'm disabled option-checkbox
          </Select.Option>
          <Select.Group title="I'm title">
            <Select.Option value={4}>
              <Select.Option.Content>Content</Select.Option.Content>
              <Select.Option.Hint>I'm hint</Select.Option.Hint>
            </Select.Option>
          </Select.Group>
        </Select.Menu>
      </Select>,
    );

    await userEvent.keyboard('[Tab]');
    expect(getByTestId('selectTrigger')).toHaveFocus();

    // open select
    await userEvent.keyboard('[Enter]');

    // focus into popover
    await userEvent.keyboard('[Tab]');
    // focus on the first checkbox
    await userEvent.keyboard('[Tab]');
    expect(getByTestId('secondOptionCheckbox')).not.toHaveFocus();

    // focus on the second checkbox
    await userEvent.keyboard('[Tab]');
    expect(getByTestId('thirdOptionCheckbox')).not.toHaveFocus();
  });
});

describe('InputSearch', () => {
  beforeEach(cleanup);

  test('Verify calls onChange ones per symbol', async () => {
    const spy = vi.fn();
    const { unmount } = render(
      <Select visible disablePortal>
        <InputSearch value='' onChange={spy} />
      </Select>,
    );

    await userEvent.keyboard('[Tab]');
    // await userEvent.keyboard('[Tab]');
    // Wait for autoFocus in Input.Value to complete
    await new Promise((resolve) => setTimeout(resolve, 200));
    await userEvent.keyboard('test');
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(spy).toHaveBeenCalledTimes(4);
    unmount();
  });
});
