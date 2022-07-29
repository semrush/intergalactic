import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import ColorPicker from '../src/ColorPicker';

const { cleanup } = testing;

describe('ColorPicker', () => {
  afterEach(cleanup);

  test('Should render correctly', async () => {
    const component = <ColorPicker value="#232456" onChange={() => {}}></ColorPicker>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
