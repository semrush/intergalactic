import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render, act } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import ColorPicker, { PaletteManager } from '../src';

describe('ColorPicker', () => {
  beforeEach(cleanup);

  test.concurrent('Should render trigger correctly', async ({ task }) => {
    const component = <ColorPicker value="#232456" />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should render non-extended popper correctly', async ({ task }) => {
    const component = (
      <div style={{ width: 250, height: 250 }}>
        <ColorPicker value="#FF8786" disablePortal visible />
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should render extended popper correctly', async ({ task }) => {
    const component = (
      <div style={{ width: 250, height: 250 }}>
        <ColorPicker value="#FF8786" disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager>
              <PaletteManager.Colors>
                <PaletteManager.Item value="#8649E6" />
                <PaletteManager.Item value="#2BB1FF" />
              </PaletteManager.Colors>
              <PaletteManager.InputColor />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should call onChange function when click on item color', async ({ task }) => {
    const value = '#2BB3FF';
    const spy = vi.fn();

    const { getAllByTestId } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker value={value} onChange={spy} disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors>
              <ColorPicker.Item value="#8649E1" data-testid="item1" />
              <ColorPicker.Item value="#2BB3FF" />
            </ColorPicker.Colors>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    fireEvent.click(getAllByTestId('item1')[0]);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('#8649E1', expect.anything());
  });

  test.concurrent('Should clear input when click on cancel icon inside input', async ({ task }) => {
    const { getByTestId, getByLabelText } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager>
              <PaletteManager.Colors />
              <PaletteManager.InputColor data-testid="inputColor" />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    const input = getByTestId('inputColor');
    fireEvent.change(input, { target: { value: '635472' } });
    expect(input.value).toBe('635472');

    fireEvent.focus(input);
    const cancel = getByLabelText('Clear custom color field');
    fireEvent.click(cancel);
    expect(input.value).toBe('');
  });

  test.concurrent('Should add colort when click on confirm icon inside input', async ({ task }) => {
    const spy = vi.fn();

    const { getByTestId, getByLabelText } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager onColorsChange={spy}>
              <PaletteManager.Colors />
              <PaletteManager.InputColor data-testid="inputColor" />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    const input = getByTestId('inputColor');
    fireEvent.change(input, { target: { value: '635472' } });
    expect(input.value).toBe('635472');

    fireEvent.focus(input);
    const confirm = getByLabelText('Add color to the list of custom colors');
    fireEvent.click(confirm);

    expect(input.value).toBe('');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(['#635472'], expect.anything());
  });

  test.concurrent('Should add color when click on "Enter" click', async ({ task }) => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager onColorsChange={spy}>
              <PaletteManager.Colors />
              <PaletteManager.InputColor data-testid="inputColor" />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    const input = getByTestId('inputColor');
    fireEvent.change(input, { target: { value: '635472' } });
    fireEvent.focus(input);
    fireEvent.keyDown(input, { code: 'Enter', keyCode: 13 });

    expect(input.value).toBe('');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(['#635472'], expect.anything());
  });

  test.concurrent('Should add color with "#" sign in the code color', async ({ task }) => {
    vi.useFakeTimers();
    const spy = vi.fn();

    const { getByTestId } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager onColorsChange={spy}>
              <PaletteManager.Colors />
              <PaletteManager.InputColor data-testid="inputColor" />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    const input = getByTestId('inputColor');
    fireEvent.change(input, { target: { value: '#635472' } });
    act(() => {
      vi.runAllTimers();
    });

    expect(input.value).toBe('#635472');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { code: 'Enter', keyCode: 13 });

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(['#635472'], expect.anything());
    vi.useRealTimers();
  });

  test('a11y', async ({ task }) => {
    const { container } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager>
              <PaletteManager.Colors colors={['#123123', '#112233']} />
              <PaletteManager.InputColor />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
