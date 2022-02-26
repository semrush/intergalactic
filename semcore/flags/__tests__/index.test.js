import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { render, cleanup } = testing;

import { snapshot } from '@semcore/jest-preset-ui';
import Flags from '../src';

describe('Flags', () => {
  afterEach(cleanup);

  test('should support className with name country without space', () => {
    const { getByTestId } = render(<Flags data-testid="flags" iso2="EH" />);

    expect(getByTestId('flags').classList[1]).toMatch('WesternSahara');
  });

  test('should support className with name country and ,', () => {
    const { getByTestId } = render(<Flags data-testid="flags" iso2="BQ" />);

    expect(getByTestId('flags').classList[1]).toMatch('BonaireSintEustatiusAndSaba');
  });

  test('should support no name contry', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Flags />
        <Flags iso2="AA" />
        <Flags iso3="AAA" />
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
