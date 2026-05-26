import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render, act, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import ColorPicker, { PaletteManager } from '../src';

const VisibleColorPicker = ({ children }: { children: React.ReactNode }) => (
  <ColorPicker visible disablePortal>{children}</ColorPicker>
);

const ColorPickerPopperWrapper = ({ children }: { children: React.ReactNode }) => (
  <VisibleColorPicker>
    <ColorPicker.Popper>{children}</ColorPicker.Popper>
  </VisibleColorPicker>
);

const PaletteManagerWrapper = ({ children }: { children: React.ReactNode }) => (
  <PaletteManager>{children}</PaletteManager>
);

describe('color-picker Dependency imports', () => {
  runDependencyCheckTests('color-picker');
});

describe('ColorPicker data-ui-name', () => {
  shouldHaveDataUiName({
    Component: ColorPicker.Trigger,
    Wrapper: VisibleColorPicker,
    expectedDataUiName: 'ColorPicker.Trigger',
  });

  shouldHaveDataUiName({
    Component: ColorPicker.Popper,
    Wrapper: VisibleColorPicker,
    expectedDataUiName: 'ColorPicker.Popper',
  });

  shouldHaveDataUiName({
    Component: ColorPicker.Colors,
    Wrapper: ColorPickerPopperWrapper,
    expectedDataUiName: 'ColorPicker.Colors',
  });

  test.skip('should have data-ui-name="ColorPicker.Item"', () => {
    // ColorPicker.Item exists at runtime, but is not exposed in the public TypeScript API.
  });

  shouldHaveDataUiName({
    Component: PaletteManager.Colors,
    Wrapper: PaletteManagerWrapper,
    expectedDataUiName: 'PaletteManager.Colors',
  });

  shouldHaveDataUiName({
    Component: PaletteManager.InputColor,
    Wrapper: PaletteManagerWrapper,
    expectedDataUiName: 'PaletteManager.InputColor',
  });
});

describe('ColorPicker', () => {
  beforeEach(cleanup);

  test.concurrent('Verify call onChange once function when click on item color', async () => {
    const value = '#2BB3FF';
    const spy = vi.fn();

    const { getAllByRole } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker value={value} onChange={spy} disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors colors={['#8649E1', '#2BB3FF']} />
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    await userEvent.click(getAllByRole('option')[0]);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('#8649E1', expect.anything());
  });

  test.sequential('Verify input cleared when click on cancel icon inside input', async () => {
    const { getByTestId, getByLabelText } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager>
              <PaletteManager.Colors />
              <PaletteManager.InputColor data-testid='inputColor' />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    const input = getByTestId('inputColor') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '635472' } });
    expect(input.value).toBe('635472');

    fireEvent.focus(input);
    const cancel = getByLabelText('Clear custom color field');
    await userEvent.click(cancel);
    expect(input.value).toBe('');
  });

  test.sequential('Verify color added when click on confirm icon inside input', async () => {
    const spy = vi.fn();

    const { getByTestId, getByLabelText } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager onColorsChange={spy}>
              <PaletteManager.Colors />
              <PaletteManager.InputColor data-testid='inputColor' />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    const input = getByTestId('inputColor') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '635472' } });
    expect(input.value).toBe('635472');

    fireEvent.focus(input);
    const confirm = getByLabelText('Add color to the list of custom colors');
    await userEvent.click(confirm);

    expect(input.value).toBe('');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(['#635472'], expect.anything());
  });

  test.sequential('Verify color added when click on "Enter" click', async () => {
    const spy = vi.fn();

    const { getByTestId } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager onColorsChange={spy}>
              <PaletteManager.Colors />
              <PaletteManager.InputColor data-testid='inputColor' />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    const input = getByTestId('inputColor') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '635472' } });
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });

    expect(input.value).toBe('');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(['#635472'], expect.anything());
  });

  test.concurrent('Verify color added with "#" sign in the code color', async () => {
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
              <PaletteManager.InputColor data-testid='inputColor' />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    const input = getByTestId('inputColor') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '#635472' } });
    act(() => {
      vi.runAllTimers();
    });

    expect(input.value).toBe('#635472');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(['#635472'], expect.anything());
    vi.useRealTimers();
  });
});
