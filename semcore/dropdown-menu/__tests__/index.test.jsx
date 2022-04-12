import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
const { cleanup, axe, render, fireEvent } = testing;

import DropdownMenu from '../src';

describe('DropdownMenu', () => {
  afterEach(cleanup);

  test('Should correct enter space in input', () => {
    const spy = jest.fn();
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
        <hr />
        <DropdownMenu size="xl">
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

  test('a11y', async () => {
    const { container } = render(
      <DropdownMenu visible disablePortal>
        <DropdownMenu.Trigger>trigger</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>item 1</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
