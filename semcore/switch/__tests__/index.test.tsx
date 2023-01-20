import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import Switch, { inputProps } from '../src';

import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';


describe('Switch', () => {
  beforeEach(cleanup);

  test('Render correctly', async () => {
    const component = (
      <>
        <Switch>
          <Switch.Value />
        </Switch>
        <Switch>
          <Switch.Value checked />
        </Switch>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Render correctly with addon', async () => {
    const component = (
      <>
        <Switch>
          <Switch.Addon>off</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>on</Switch.Addon>
        </Switch>
        <Switch>
          <Switch.Addon>off</Switch.Addon>
          <Switch.Value checked />
          <Switch.Addon>on</Switch.Addon>
        </Switch>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support keyboardFocused/disabled', async () => {
    const component = (
      <>
        <Switch>
          <Switch.Addon>disabled</Switch.Addon>
          <Switch.Value disabled />
          <Switch.Addon>disabled</Switch.Addon>
        </Switch>
        <Switch>
          <Switch.Addon>keyboardFocused</Switch.Addon>
          <Switch.Value keyboardFocused />
          <Switch.Addon>keyboardFocused</Switch.Addon>
        </Switch>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support a custom icon on the toggle', async () => {
    const component = (
      <>
        <Switch size="l">
          <Switch.Value>$</Switch.Value>
        </Switch>
        <Switch size="l">
          <Switch.Value checked>$</Switch.Value>
        </Switch>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size', async () => {
    const component = (
      <>
        <Switch size="xl">
          <Switch.Addon>Addon</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>Addon</Switch.Addon>
        </Switch>
        <Switch size="l">
          <Switch.Addon>Addon</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>Addon</Switch.Addon>
        </Switch>
        <Switch size="m">
          <Switch.Addon>Addon</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>Addon</Switch.Addon>
        </Switch>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support theme', async () => {
    const component = (
      <>
        <Switch size="l" theme="success">
          <Switch.Value checked>$</Switch.Value>
        </Switch>
        <Switch size="l" theme="info">
          <Switch.Value checked>$</Switch.Value>
        </Switch>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support custom theme', async () => {
    const component = (
      <>
        <Switch size="l" theme="blanchedalmond">
          <Switch.Value checked>$</Switch.Value>
        </Switch>
        <Switch size="l" theme="#3eeb4c">
          <Switch.Value checked>$</Switch.Value>
        </Switch>
        <Switch size="l" theme="dark-violet">
          <Switch.Value checked>$</Switch.Value>
        </Switch>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  // enable after https://github.com/capricorn86/happy-dom/pull/677 merged, https://github.com/capricorn86/happy-dom/issues/531 resolved and happy-dom updated
  test.skip('Should support onChange callback', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Switch data-testid="label">
        <Switch.Value onChange={spy} data-testid="value" />
      </Switch>,
    );

    fireEvent.change(getByTestId('value').childNodes[0]);
    expect(spy).lastCalledWith(true, expect.any(Object));
  });

  test('Should support onChange callback with keyboard', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Switch>
        <Switch.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="value"
          onChange={spy}
        />
      </Switch>,
    );

    fireEvent.keyDown(getByTestId('value'), { key: 'Enter', keyCode: 13 });
    expect(spy).lastCalledWith(true, expect.any(Object));
  });

  test('a11y', async () => {
    const { container } = render(
      <Switch>
        <Switch.Addon>test</Switch.Addon>
        <Switch.Value checked />
        <Switch.Addon>test</Switch.Addon>
      </Switch>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
