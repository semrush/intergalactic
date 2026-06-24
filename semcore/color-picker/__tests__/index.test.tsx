import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import ColorPicker, { PaletteManager } from '../src';

describe('color-picker Dependency imports', () => {
  runDependencyCheckTests('color-picker');
});

describe('ColorPicker', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const colorPicker = (
      <ColorPicker value='#2BB3FF' disablePortal visible>
        <ColorPicker.Trigger />
        <ColorPicker.Popper>
          <ColorPicker.Colors colors={[null, '#2BB3FF']} />
          <PaletteManager colors={['#8649E1']}>
            <PaletteManager.Colors />
            <PaletteManager.InputColor />
          </PaletteManager>
        </ColorPicker.Popper>
      </ColorPicker>
    );

    const { container } = render(colorPicker);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

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
    await userEvent.type(input, '635472');
    expect(input.value).toBe('635472');

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
    await userEvent.type(input, '635472');
    expect(input.value).toBe('635472');

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
    await userEvent.type(input, '635472');
    await userEvent.keyboard('[Enter]');

    expect(input.value).toBe('');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(['#635472'], expect.anything());
  });

  test.sequential('Verify color added with "#" sign in the code color', async () => {
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
    await userEvent.type(input, '#635472');

    expect(input.value).toBe('#635472');

    await userEvent.keyboard('[Enter]');

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(['#635472'], expect.anything());
  });
});
