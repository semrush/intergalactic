import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render, act } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import ColorPicker, { PaletteManager } from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('color-picker Dependency imports', () => {
  runDependencyCheckTests('color-picker');
});

describe('ColorPicker', () => {
  beforeEach(cleanup);

  test.concurrent('Verify call onChange once function when click on item color', async () => {
    const value = '#2BB3FF';
    const spy = vi.fn();

    const { getAllByTestId } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker value={value} onChange={spy} disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors>
              <ColorPicker.Item value='#8649E1' data-testid='item1' />
              <ColorPicker.Item value='#2BB3FF' />
            </ColorPicker.Colors>
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    fireEvent.click(getAllByTestId('item1')[0]);
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
    fireEvent.click(cancel);
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
    fireEvent.click(confirm);

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
