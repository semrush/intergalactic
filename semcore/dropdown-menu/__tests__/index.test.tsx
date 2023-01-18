import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import { expect, test, describe, afterEach } from 'vitest';
const { cleanup, axe, render, fireEvent, act } = testing;

import DropdownMenu from '../src';

describe('DropdownMenu', () => {
  beforeEach(cleanup);

  test('Should correct enter space in input', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <DropdownMenu onVisibleChange={spy} interaction="focus">
        <DropdownMenu.Trigger tag="input" data-testid="input" />
      </DropdownMenu>,
    );

    const input = getByTestId('input');

    fireEvent.keyDown(input, { key: ' ', which: 32, keyCode: 32 });
    //TODO, because input.value all time print empty string
    expect(spy).not.toHaveBeenCalled();
  });

  test('Should correct press Enter in textarea', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <DropdownMenu onVisibleChange={spy} interaction="focus">
        <DropdownMenu.Trigger tag="textarea" data-testid="textarea" />
      </DropdownMenu>,
    );

    const textarea = getByTestId('textarea');

    fireEvent.keyDown(textarea, { key: 'Enter', which: 13, keyCode: 13 });
    expect(spy).not.toHaveBeenCalled();
  });

  test('Renders correctly', async () => {
    const Component = (
      <DropdownMenu>
        <DropdownMenu.List>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        </DropdownMenu.List>
      </DropdownMenu>
    );

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('Supports sizes', async () => {
    const Component = (
      <React.Fragment>
        <DropdownMenu size="m">
          <DropdownMenu.List>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.ItemHint>Hint 1</DropdownMenu.ItemHint>
            <DropdownMenu.ItemTitle>Title 1</DropdownMenu.ItemTitle>
          </DropdownMenu.List>
        </DropdownMenu>
        <hr />
        <DropdownMenu size="l">
          <DropdownMenu.List>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.ItemHint>Hint 1</DropdownMenu.ItemHint>
            <DropdownMenu.ItemTitle>Title 1</DropdownMenu.ItemTitle>
          </DropdownMenu.List>
        </DropdownMenu>
      </React.Fragment>
    );

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('supports disabled, selected, notInteractive & highlighted props ', async () => {
    const Component = (
      <DropdownMenu>
        <DropdownMenu.List>
          <DropdownMenu.Item disabled>disabled</DropdownMenu.Item>
          <DropdownMenu.Item>notInteractive</DropdownMenu.Item>
          <DropdownMenu.Item selected>selected</DropdownMenu.Item>
          <DropdownMenu.Item highlighted>highlighted</DropdownMenu.Item>
        </DropdownMenu.List>
      </DropdownMenu>
    );

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('supports addons', async () => {
    const Component = (
      <DropdownMenu>
        <DropdownMenu.List>
          <DropdownMenu.Item>
            <DropdownMenu.Item.Addon>Addon</DropdownMenu.Item.Addon>
            <DropdownMenu.Item.Addon mr={2}>One more addon</DropdownMenu.Item.Addon>
            Text
          </DropdownMenu.Item>
        </DropdownMenu.List>
      </DropdownMenu>
    );

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('Should support hover', async () => {
    const Component = (
      <DropdownMenu>
        <DropdownMenu.List>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item id="dd">Item 2</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        </DropdownMenu.List>
      </DropdownMenu>
    );

    expect(
      await snapshot(Component, {
        actions: {
          hover: '#dd',
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('Should support selected hover ', async () => {
    const Component = (
      <DropdownMenu>
        <DropdownMenu.List>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item id="dd" selected>
            Item 2
          </DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        </DropdownMenu.List>
      </DropdownMenu>
    );

    expect(
      await snapshot(Component, {
        actions: {
          hover: '#dd',
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('should have shadow style', async () => {
    const Component = (
      <DropdownMenu visible disablePortal>
        <DropdownMenu.Menu hMax={'180px'}>
          <DropdownMenu.ItemTitle>List heading</DropdownMenu.ItemTitle>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          <DropdownMenu.Item>Item 4</DropdownMenu.Item>
          <DropdownMenu.Item>Item 5</DropdownMenu.Item>
          <DropdownMenu.Item>Item 6</DropdownMenu.Item>
          <DropdownMenu.Item>Item 7</DropdownMenu.Item>
          <DropdownMenu.Item>Item 8</DropdownMenu.Item>
          <DropdownMenu.Item>Item 9</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>
    );

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    jest.useFakeTimers();
    const { container } = render(
      <DropdownMenu visible disablePortal>
        <DropdownMenu.Trigger aria-label="dropdown menu trigger">trigger</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>item 1</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>,
    );
    act(() => jest.runAllTimers());
    jest.useRealTimers();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
