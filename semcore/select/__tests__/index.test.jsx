import React from 'react';
import { FilterTrigger } from '@semcore/base-trigger';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';

import { cleanup, fireEvent, render, act } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import Select from '../src';
import InputSearch from '../src/InputSearch';

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
          <Select.Popper>
            <Select.Option value='1' />
            <Select.Option data-testid='option' value='2' />
          </Select.Popper>
        </Select>,
      );

      fireEvent.click(getByTestId('option'));
      expect(spy).toHaveBeenCalledWith(['1', '2'], expect.anything());
    },
  );

  test.concurrent('Call onVisibleChange for click in Option when value selected', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Select visible onVisibleChange={spy}>
        <Select.Trigger />
        <Select.Popper>
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
    const Tag = React.forwardRef(({ children }, ref) => (
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
    const Component = ({ theme, size, ...props }) => (
      <div style={{ position: 'relative', width: '150px', height: '100px' }}>
        <Select {...props} size={size} visible disablePortal value='1'>
          <Select.Trigger />
          <Select.Popper>
            <Select.Option value='1'>
              <Select.Option.Checkbox theme={theme} />
              size {size ?? 'default'} selected
            </Select.Option>
            <Select.Option value='2'>
              <Select.Option.Checkbox theme={theme} />
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
    const Component = ({ theme, ...props }) => (
      <div style={{ position: 'relative', width: '150px', height: '100px' }}>
        <Select {...props} visible disablePortal>
          <Select.Trigger />
          <Select.Popper>
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
        <Select.Menu visible>
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
    act(() => fireEvent.animationEnd(getByTestId('menu')));
    act(() => {
      vi.runAllTimers();
    });
    expect(getByTestId('trigger')).toHaveFocus();

    vi.useRealTimers();
  });

  test.concurrent(
    'focus position preserve with mouse navigation and interaction=focus',
    async () => {
      vi.useFakeTimers();
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
      act(() => getByTestId('input-in-trigger').focus());
      act(() => {
        vi.runAllTimers();
      });
      act(() => getByTestId('option-2').focus());
      fireEvent.click(getByTestId('option-2'));
      act(() => {
        vi.runAllTimers();
      });
      act(() => fireEvent.animationEnd(getByTestId('menu')));
      act(() => {
        vi.runAllTimers();
      });
      expect(document.activeElement.tagName).toBe('DIV');

      vi.useRealTimers();
    },
  );

  test('focus position preserve with keyboard navigation and interaction=focus', async () => {
    vi.useFakeTimers();
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
    act(() => {
      vi.runAllTimers();
    });
    fireEvent.keyDown(document.body, { code: 'Tab' });
    act(() => getByTestId('input-in-trigger').focus());
    act(() => {
      vi.runAllTimers();
    });
    fireEvent.keyDown(getByTestId('input-in-trigger'), { key: 'ArrowDown' });
    fireEvent.keyDown(getByTestId('input-in-trigger'), { key: 'Enter' });
    act(() => {
      vi.runAllTimers();
    });
    act(() => fireEvent.animationEnd(getByTestId('menu')));
    act(() => {
      vi.runAllTimers();
    });
    expect(document.activeElement.tagName).toBe('DIV');

    vi.useRealTimers();
  });
});

describe('Option.Checkbox', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Select.Option.Checkbox, Select);
  shouldSupportRef(Select.Option.Checkbox, Select);
});

describe('InputSearch', () => {
  beforeEach(cleanup);

  shouldSupportClassName(InputSearch, Select);
  shouldSupportRef(InputSearch, Select);

  test.concurrent('should renders correctly', async ({ task }) => {
    const component = (
      <div style={{ width: 200 }}>
        <Select>
          <InputSearch />
        </Select>
        <Select>
          <InputSearch defaultValue='test' />
        </Select>
        <Select size='l'>
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
});
