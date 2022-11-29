import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
const { render, cleanup, axe } = testing;
import Flags from '../src';

describe('Flags', () => {
  afterEach(cleanup);

  test('Should support className with name country without space', () => {
    const { getByTestId } = render(<Flags data-testid="flags" iso2="EH" />);

    expect(getByTestId('flags').classList[1]).toMatch('flag-western-sahara-3_2_0');
  });

  test('Should support className with name country and ,', () => {
    const { getByTestId } = render(<Flags data-testid="flags" iso2="BQ" />);

    expect(getByTestId('flags').classList[1]).toMatch(
      'flag-bonaire--sint-eustatius-and-saba-3_2_0',
    );
  });

  test('Should correctly render', () => {
    const { getByTestId } = render(
      <>
        <Flags data-testid="flags" iso2="af" />
        <Flags data-testid="flags2" iso3="afg" />
        <Flags data-testid="flags3" name="afg" />
      </>,
    );

    expect(getByTestId('flags').classList[1]).toMatch('flag-afghanistan-3_2_0');
    expect(getByTestId('flags2').classList[1]).toMatch('flag-afghanistan-3_2_0');
    expect(getByTestId('flags3').classList[1]).toMatch('flag-afghanistan-3_2_0');
  });

  test('Should set styles', () => {
    render(<Flags data-testid="flags" iso2="af" />);

    const link = document.querySelectorAll('[class*=_css-style-flags]')[0];

    expect(link).toBeTruthy();
    expect(link.tagName).toBe('LINK');
  });

  test('Should support no name country', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Flags />
        <Flags iso2="AA" />
        <Flags iso3="AAA" />
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(<Flags />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
