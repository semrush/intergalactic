import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import ColorPicker from '../src';

const { cleanup, fireEvent, render } = testing;

describe('ColorPicker', () => {
  afterEach(cleanup);

  test('Should render trigger correctly', async () => {
    const component = <ColorPicker value="#232456" onValueChange={() => {}} />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should render popper correctly', async () => {
    const component = (
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker value="#232456" onValueChange={() => {}} disablePortal visible></ColorPicker>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should call onChange function when click on item color', async () => {
    const value = '#2BB3FF';
    const spy = jest.fn();

    const { getAllByTestId } = render(
      <div style={{ width: 250, height: 100 }}>
        <ColorPicker value={value} onValueChange={spy} disablePortal visible>
          <ColorPicker.Trigger />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <ColorPicker.Item value="#8649E1" data-testid="item1" />
            <ColorPicker.Item value="#2BB3FF" />
          </ColorPicker.Popper>
        </ColorPicker>
      </div>,
    );

    fireEvent.click(getAllByTestId('item1')[0]);
    expect(spy).toBeCalledTimes(1);
  });
});
