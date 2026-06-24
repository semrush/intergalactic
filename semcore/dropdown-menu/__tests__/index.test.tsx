import { Box } from '@semcore/base-components';
import { ButtonTrigger } from '@semcore/base-trigger';
import Button from '@semcore/button';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import DropdownMenu from '../src';

describe('dropdown-menu Dependency imports', () => {
  runDependencyCheckTests('dropdown-menu');
});

describe('DropdownMenu', () => {
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

  test.sequential('Verify does not trigger visibility change on Space key in input', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <DropdownMenu onVisibleChange={spy} interaction='focus'>
        <DropdownMenu.Trigger tag='input' data-testid='input' />
      </DropdownMenu>,
    );

    const input = getByTestId('input');
    await userEvent.click(input);
    spy.mockClear();
    await userEvent.keyboard('[Space]');
    expect(spy).not.toHaveBeenCalled();
  });

  test.sequential('Verify does not trigger visibility change on Enter key in textarea', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <DropdownMenu onVisibleChange={spy} interaction='focus'>
        <DropdownMenu.Trigger tag='textarea' data-testid='textarea' />
      </DropdownMenu>,
    );

    const textarea = getByTestId('textarea');
    await userEvent.click(textarea);
    spy.mockClear();
    await userEvent.keyboard('[Enter]');
    expect(spy).not.toHaveBeenCalled();
  });

  test.sequential('Verify menu actions interactions', async () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <DropdownMenu>
        <DropdownMenu.Trigger tag={ButtonTrigger} data-testid='dropdownMenu'>
          Click me
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>
            <DropdownMenu visible={true} inlineActions placement='right'>
              {({ getListProps, getTriggerProps }) => {
                const listProps = getListProps();
                const triggerProps = getTriggerProps();

                return (
                  <>
                    <DropdownMenu.Item.Content {...triggerProps} data-testid='dropdownMenuItem'>
                      Item 4
                    </DropdownMenu.Item.Content>
                    <Box {...listProps}>
                      <DropdownMenu.Item tag={Button} aria-label='Add new' onClick={spy} />
                    </Box>
                  </>
                );
              }}
            </DropdownMenu>
          </DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>,
    );

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.keyboard('[ArrowRight]');
    await userEvent.keyboard('[Enter]');

    expect(spy).toHaveBeenCalledOnce();
  });

  test.sequential('Verify onVisibleChange event calls once', async () => {
    const spy = vi.fn();
    const Component = () => {
      return (
        <DropdownMenu onVisibleChange={spy}>
          <DropdownMenu.Trigger tag='button' data-testid='dd-button-trigger'>
            Trigger
          </DropdownMenu.Trigger>
          <DropdownMenu.Menu>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          </DropdownMenu.Menu>
        </DropdownMenu>
      );
    };
    render(<Component />);

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');

    expect(spy).toHaveBeenCalledOnce();
  });

  test.sequential('Verify calls events on items in controlled component', async () => {
    const spy = vi.fn();
    const Component = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <DropdownMenu
          visible={visible}
          onVisibleChange={(value) => {
            setVisible(value);
          }}
        >
          <DropdownMenu.Trigger tag='button' data-testid='dd-button-trigger'>
            Trigger
          </DropdownMenu.Trigger>
          <DropdownMenu.Menu>
            <DropdownMenu.Item
              onClick={() => {
                spy();
                setVisible(false);
              }}
            >
              Item 1
            </DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          </DropdownMenu.Menu>
        </DropdownMenu>
      );
    };
    render(<Component />);

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]'); // open
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.keyboard('[Escape]'); // close
    await userEvent.keyboard('[Enter]'); // open
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.keyboard('[Enter]'); // click on the first item and close // 1
    await userEvent.keyboard('[Enter]'); // open
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.keyboard('[Enter]'); // click on the first item and close // 2
    await userEvent.keyboard('[Enter]'); // open
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.keyboard('[Enter]'); // click on the first item and close // 3

    expect(spy).toHaveBeenCalledTimes(3);
  });

  test.sequential('Verify onClick event calls once', async () => {
    const spy = vi.fn();
    const Component = () => {
      return (
        <DropdownMenu>
          <DropdownMenu.Trigger tag='button' data-testid='dd-button-trigger'>
            Trigger
          </DropdownMenu.Trigger>
          <DropdownMenu.Menu>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item onClick={spy}>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          </DropdownMenu.Menu>
        </DropdownMenu>
      );
    };
    render(<Component />);

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[Enter]');

    expect(spy).toHaveBeenCalledOnce();
  });

  test.concurrent('Verify interaction with disabled nested', async () => {
    const { getByTestId } = render(
      <DropdownMenu placement='right'>
        <DropdownMenu.Trigger tag='button'>Trigger</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item data-testid='dd-menu-item-1'>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item disabled>
            <DropdownMenu interaction='hover' placement='right'>
              <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                Item 2
              </DropdownMenu.Item.Content>
              <DropdownMenu.Menu>
                <DropdownMenu.Item>Item 2.1</DropdownMenu.Item>
                <DropdownMenu.Item>Item 2.2</DropdownMenu.Item>
              </DropdownMenu.Menu>
            </DropdownMenu>
          </DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>,
    );

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(getByTestId('dd-menu-item-1')).toHaveFocus();

    await userEvent.keyboard('[ArrowDown]');
    expect(getByTestId('dd-menu-item-1')).toHaveFocus();
  });
});
