import React from 'react';
import { FilterTrigger } from '@semcore/base-trigger';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';

import { cleanup, fireEvent, render, act, userEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import Select from '../src';
// @ts-ignore
import InputSearch from '../src/InputSearch';
import { skipButtonComboboxDiscernibleErrors } from '@semcore/testing-utils/playwright';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('select Dependency imports', () => {
  runDependencyCheckTests('select');
});

HTMLElement.prototype.scrollIntoView = () => {};

describe('Select Trigger', () => {
  beforeEach(cleanup);

  test.concurrent('Trigger renders correctly', async ({ task }) => {
    const component = (
      <Select>
        <Select.Trigger />
      </Select>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Trigger disabled', async ({ task }) => {
    const component = (
      <Select>
        <Select.Trigger disabled />
      </Select>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Trigger with placeholder renders correctly', async ({ task }) => {
    const component = (
      <Select placeholder='Placeholder'>
        <Select.Trigger />
      </Select>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Trigger with selected option renders correctly', async ({ task }) => {
    const component = (
      <Select value={1}>
        <Select.Trigger />
      </Select>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent(
    'Trigger with selected option ellipsis text renders correctly',
    async ({ task }) => {
      const component = (
        <Select value={'English burashka gpq 1'}>
          <Select.Trigger w={100} />
        </Select>
      );

      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    },
  );

  test.concurrent(
    'MultiSelect trigger with selected options renders correctly',
    async ({ task }) => {
      const component = (
        <Select multiselect value={[1, 2, 3]}>
          <Select.Trigger />
        </Select>
      );

      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    },
  );

  test.concurrent(
    'MultiSelect trigger with selected options renders correctly in unconrol mode',
    async () => {
      const spy = vi.fn();

      const { getByTestId } = render(
        <Select multiselect onChange={spy} visible value={['1']}>
          <Select.Trigger />
          <Select.Popper aria-label={'Select popper'}>
            <Select.Option value='1' />
            <Select.Option data-testid='option' value='2' />
          </Select.Popper>
        </Select>,
      );

      fireEvent.click(getByTestId('option'));
      expect(spy).toHaveBeenCalledWith(['1', '2'], expect.anything());
    },
  );

  test.concurrent(
    'should not open popper by keypress enter if interaction not click',
    async ({ expect }) => {
      const spy = vi.fn();
      render(
        <Select onVisibleChange={spy} interaction={'none'}>
          <Select.Trigger />
          <Select.Popper aria-label={'Select popper'}>
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

  test.concurrent('Call onVisibleChange for click in Option when value selected', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Select visible onVisibleChange={spy}>
        <Select.Trigger />
        <Select.Popper aria-label={'Select popper'}>
          <Select.Option data-testid='option' value='test' />
        </Select.Popper>
      </Select>,
    );

    fireEvent.click(getByTestId('option'));
    expect(spy).toHaveBeenCalledTimes(1);
    fireEvent.click(getByTestId('option'));
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test.concurrent('Trigger renders correctly with FilterTrigger', async ({ task }) => {
    const component = (
      <Select defaultValue='Test'>
        <Select.Trigger tag={FilterTrigger} />
      </Select>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('highlights selected item', async ({ expect }) => {
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

  test('Should select by keypress space with button as trigger (FilterTrigger as example)', async ({
    expect,
  }) => {
    const spyChange = vi.fn();

    const component = (
      <Select onChange={spyChange}>
        <Select.Trigger tag={'button'} data-testid='buttonTrigger' />
        <Select.Popper aria-label={'Select popper'}>
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

  test.concurrent('Should support tag as string', async ({ task }) => {
    const component = (
      <Select defaultValue='Test'>
        <Select.Trigger tag='button' />
      </Select>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support call render function for custom tag', () => {
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

  test.concurrent('Should support Option.Checkbox', async ({ task }) => {
    const Component = ({ theme, size, ...props }: any) => (
      <div style={{ position: 'relative', width: '150px', height: '100px' }}>
        <Select {...props} size={size} visible disablePortal value='1'>
          <Select.Trigger />
          <Select.Popper aria-label={'Select popper'}>
            <Select.Option value='1'>
              <Select.Option.Checkbox theme={theme} />
              size {size ?? 'default'} selected
            </Select.Option>
            <Select.Option value='2'>
              <Select.Option.Checkbox theme={theme} />
              size {size ?? 'default'}
            </Select.Option>
            <Select.Option value='3'>
              <Select.Option.Checkbox indeterminate />
              size {size ?? 'default'}
            </Select.Option>
          </Select.Popper>
        </Select>
      </div>
    );
    await expect(
      await snapshot(
        <>
          <Component size='l' />
          <Component size='m' />
          <Component theme='violet-800' />
        </>,
      ),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Option.Checkbox should support hover', async ({ task }) => {
    const Component = ({ theme, ...props }: any) => (
      <div style={{ position: 'relative', width: '150px', height: '100px' }}>
        <Select {...props} visible disablePortal>
          <Select.Trigger />
          <Select.Popper aria-label={'Select popper'}>
            <Select.Option value='1' id='option'>
              <Select.Option.Checkbox theme={theme} />
              size m selected
            </Select.Option>
          </Select.Popper>
        </Select>
      </div>
    );
    await expect(
      await snapshot(<Component />, {
        actions: {
          hover: '#option',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(<Component value='1' />, {
        actions: {
          hover: '#option',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(<Component theme='violet-800' />, {
        actions: {
          hover: '#option',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(<Component theme='violet-800' value='1' />, {
        actions: {
          hover: '#option',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test('a11y', async () => {
    vi.useFakeTimers();
    const { container } = render(
      <Select visible value={['2']} disablePortal>
        <Select.Trigger aria-label='Select trigger' />
        <Select.Menu>
          <Select.Option value='1'>Option 1</Select.Option>
          <Select.Option value='2'>Option 2</Select.Option>
        </Select.Menu>
      </Select>,
    );
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test('multiselect a11y', async () => {
    vi.useFakeTimers();
    const options = [
      {
        value: '1',
        children: 'Option 1',
        label: 'Option 1',
      },
      {
        value: '2',
        children: 'Option 2',
        label: 'Option 2',
      },
    ];
    const { container } = render(
      <Select visible value={['2']} disablePortal multiselect options={options} />,
    );
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    const results = await axe(container);
    expect(results.violations.filter(skipButtonComboboxDiscernibleErrors)).toHaveLength(0);
  });

  test.concurrent('focus position preserve with mouse navigation', async () => {
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
    fireEvent.click(getByTestId('trigger'));
    act(() => {
      vi.runAllTimers();
    });
    act(() => getByTestId('option-2').focus());
    fireEvent.click(getByTestId('option-2'));
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
    'focus position preserve with mouse navigation and interaction=focus',
    async () => {
      vi.useFakeTimers();
      const { getByTestId } = render(
        <Select value={['2']} disablePortal interaction='focus'>
          <Select.Trigger aria-label='Select trigger' data-testid='trigger' tag='input' />
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
      fireEvent.click(getByTestId('option-2'));
      act(() => {
        vi.runAllTimers();
      });
      expect(getByTestId('trigger')).toHaveFocus();

      vi.useRealTimers();
    },
  );

  test.sequential(
    'focus position preserve with keyboard navigation and interaction=focus',
    async ({ expect }) => {
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

  shouldSupportClassName(Select.Option.Checkbox, Select);
  shouldSupportRef(Select.Option.Checkbox, Select);

  test.skip('should not focused by Tab between Select.Option.Checkbox', async ({ expect }) => {
    const { getByTestId } = render(
      <Select>
        <Select.Trigger placeholder="I'll show u some options" data-testid={'selectTrigger'} />
        <Select.Menu>
          <Select.Option value={1} data-testid={'firstOption'}>
            I'm option
          </Select.Option>
          <Select.Option value={2}>
            <Select.Option.Checkbox data-testid={'secondOptionCheckbox'} />
            I'm option-checkbox
          </Select.Option>
          <Select.Option value={3} disabled>
            <Select.Option.Checkbox data-testid={'thirdOptionCheckbox'} />
            I'm disabled option-checkbox
          </Select.Option>
          <Select.OptionTitle>I'm title</Select.OptionTitle>
          <Select.OptionHint>I'm hint</Select.OptionHint>
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

  shouldSupportClassName(InputSearch, Select);
  shouldSupportRef(InputSearch, Select);

  test.concurrent('should renders correctly', async ({ task }) => {
    const component = (
      <div style={{ width: 200 }}>
        <Select visible disablePortal>
          <InputSearch />
        </Select>
        <Select visible disablePortal>
          <InputSearch defaultValue='test' />
        </Select>
        <Select size='l' visible disablePortal>
          <InputSearch />
        </Select>
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should clear when click Close icon', async () => {
    const spy = vi.fn();
    const { getByRole } = render(
      <Select>
        <InputSearch value='test' onChange={spy} />
      </Select>,
    );

    fireEvent.click(getByRole('button'));
    expect(spy).toHaveBeenCalledWith('', expect.anything());
  });

  test('should call onChange ones per symbol', async ({ expect }) => {
    const spy = vi.fn();
    const { unmount } = render(
      <Select visible disablePortal>
        <InputSearch value='' onChange={spy} />
      </Select>,
    );

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('test');
    expect(spy).toHaveBeenCalledTimes(4);
    unmount();
  });
});
