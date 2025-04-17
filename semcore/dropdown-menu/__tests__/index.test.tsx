import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import Button from '@semcore/button';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import {
  cleanup,
  render,
  fireEvent,
  act,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import DropdownMenu from '../src';
import { Box } from '@semcore/flex-box';
import { ButtonTrigger } from '@semcore/base-trigger';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('dropdown-menu Dependency imports', () => {
  runDependencyCheckTests('dropdown-menu');
});

describe('DropdownMenu', () => {
  beforeEach(cleanup);

  test.concurrent('Should correct enter space in input', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <DropdownMenu onVisibleChange={spy} interaction='focus'>
        <DropdownMenu.Trigger tag='input' data-testid='input' />
      </DropdownMenu>,
    );

    const input = getByTestId('input');

    fireEvent.keyDown(input, { key: ' ', which: 32, keyCode: 32 });
    //TODO, because input.value all time print empty string
    expect(spy).not.toHaveBeenCalled();
  });

  test.concurrent('Should correct press Enter in textarea', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <DropdownMenu onVisibleChange={spy} interaction='focus'>
        <DropdownMenu.Trigger tag='textarea' data-testid='textarea' />
      </DropdownMenu>,
    );

    const textarea = getByTestId('textarea');

    fireEvent.keyDown(textarea, { key: 'Enter', which: 13, keyCode: 13 });
    expect(spy).not.toHaveBeenCalled();
  });

  test.concurrent('Supports sizes', async ({ task }) => {
    const component = (
      <React.Fragment>
        <DropdownMenu size='m' visible disablePortal>
          <DropdownMenu.Menu>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.ItemHint>Hint 1</DropdownMenu.ItemHint>
            <DropdownMenu.ItemTitle>Title 1</DropdownMenu.ItemTitle>
          </DropdownMenu.Menu>
        </DropdownMenu>
        <hr />
        <DropdownMenu size='l' visible disablePortal>
          <DropdownMenu.Menu>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.ItemHint>Hint 1</DropdownMenu.ItemHint>
            <DropdownMenu.ItemTitle>Title 1</DropdownMenu.ItemTitle>
          </DropdownMenu.Menu>
        </DropdownMenu>
      </React.Fragment>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('supports disabled, selected props ', async ({ task }) => {
    const component = (
      <DropdownMenu visible disablePortal>
        <DropdownMenu.Menu>
          <DropdownMenu.Item disabled>disabled</DropdownMenu.Item>
          <DropdownMenu.Item selected>selected</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.sequential('Should support hover', async ({ task }) => {
    const component = (
      <DropdownMenu visible disablePortal>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item id='dd'>Item 2</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>
    );

    await expect(
      await snapshot(component, {
        actions: {
          hover: '#dd',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.sequential('Should work with menu actions', async ({ expect }) => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <DropdownMenu>
        <DropdownMenu.Trigger tag={ButtonTrigger} data-testid='dropdownMenu'>
          Click me
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>
            <DropdownMenu visible={true} inlineActions placement={'right'}>
              {({ getListProps, getTriggerProps }) => {
                const listProps = getListProps();
                const triggerProps = getTriggerProps();

                return (
                  <>
                    <DropdownMenu.Item.Content {...triggerProps} data-testid='dropdownMenuItem'>
                      Item 4
                    </DropdownMenu.Item.Content>
                    <Box {...listProps}>
                      <DropdownMenu.Item tag={Button} aria-label={'Add new'} onClick={spy} />
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

  test.sequential("doesn't autofocus trigger when closed on just rerender", async ({ expect }) => {
    const Component = () => {
      return (
        <DropdownMenu>
          <DropdownMenu.Trigger tag='button' data-testid='dd-button-trigger'>
            Trigger
          </DropdownMenu.Trigger>
          <DropdownMenu.Menu>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item selected>Item 3</DropdownMenu.Item>
          </DropdownMenu.Menu>
        </DropdownMenu>
      );
    };
    const component = render(<Component />);

    await new Promise((resolve) => setTimeout(resolve, 1));
    component.rerender(<Component />);
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(component.getByTestId('dd-button-trigger')).not.toHaveFocus();
  });

  test.sequential('Should call onVisibleChange event once', async ({ expect }) => {
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

  test.sequential('Should call events on items in controlled component', async ({ expect }) => {
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

  test.sequential('Should call onClick event once', async ({ expect }) => {
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

  describe.sequential('opens nested menu', () => {
    test.sequential('by enter', async ({ expect }) => {
      const { getByTestId } = render(
        <DropdownMenu>
          <DropdownMenu.Trigger tag='button'>Trigger</DropdownMenu.Trigger>
          <DropdownMenu.Menu>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>
              <DropdownMenu interaction='hover' placement='right'>
                <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                  Item 2
                </DropdownMenu.Item.Content>
                <DropdownMenu.Menu>
                  <DropdownMenu.Item>Item 2.1</DropdownMenu.Item>
                  <DropdownMenu.Item data-testid='item-2-2'>Item 2.2</DropdownMenu.Item>
                </DropdownMenu.Menu>
              </DropdownMenu>
            </DropdownMenu.Item>
          </DropdownMenu.Menu>
        </DropdownMenu>,
      );

      await userEvent.keyboard('[Tab]');
      await userEvent.keyboard('[Enter]');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await userEvent.keyboard('[ArrowDown]');
      await userEvent.keyboard('[Enter]');
      expect(getByTestId('item-2-2')).toBeTruthy();
    });
    test.sequential('by arrow right', async ({ expect }) => {
      const { getByTestId } = render(
        <DropdownMenu>
          <DropdownMenu.Trigger tag='button'>Trigger</DropdownMenu.Trigger>
          <DropdownMenu.Menu>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>
              <DropdownMenu interaction='hover' placement='right'>
                <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                  Item 2
                </DropdownMenu.Item.Content>
                <DropdownMenu.Menu>
                  <DropdownMenu.Item>Item 2.1</DropdownMenu.Item>
                  <DropdownMenu.Item data-testid='item-2-2'>Item 2.2</DropdownMenu.Item>
                </DropdownMenu.Menu>
              </DropdownMenu>
            </DropdownMenu.Item>
          </DropdownMenu.Menu>
        </DropdownMenu>,
      );

      await userEvent.keyboard('[Tab]');
      await userEvent.keyboard('[Enter]');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await userEvent.keyboard('[ArrowDown]');
      await userEvent.keyboard('[ArrowRight]');
      expect(getByTestId('item-2-2')).toBeTruthy();
    });
  });

  test.concurrent('disabled nested', async ({ expect }) => {
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

  test.sequential('Should support selected hover ', async ({ task }) => {
    const component = (
      <DropdownMenu visible disablePortal>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item id='dd' selected>
            Item 2
          </DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>
    );

    await expect(
      await snapshot(component, {
        actions: {
          hover: '#dd',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.sequential('should have shadow style', async ({ task }) => {
    const component = (
      <DropdownMenu visible disablePortal>
        <DropdownMenu.Menu hMax={'180px'}>
          <DropdownMenu.Group title={'List heading'}>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
            <DropdownMenu.Item>Item 4</DropdownMenu.Item>
            <DropdownMenu.Item>Item 5</DropdownMenu.Item>
            <DropdownMenu.Item>Item 6</DropdownMenu.Item>
            <DropdownMenu.Item>Item 7</DropdownMenu.Item>
            <DropdownMenu.Item>Item 8</DropdownMenu.Item>
            <DropdownMenu.Item>Item 9</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Menu>
      </DropdownMenu>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async () => {
    vi.useFakeTimers();
    const { container } = render(
      <DropdownMenu visible disablePortal>
        <DropdownMenu.Trigger aria-label='dropdown menu trigger'>trigger</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>item 1</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>,
    );
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
