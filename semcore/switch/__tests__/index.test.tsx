import React from 'react';
import { cleanup, fireEvent, render, axe } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import snapshot from 'jest-preset-ui/snapshot';
import Switch, { inputProps } from '../src';

describe('Switch', () => {
  afterEach(cleanup);

  shouldSupportClassName(Switch);
  shouldSupportRef(Switch);

  test('should support custom attributes on the input', () => {
    const { getByTestId } = render(<Switch data-testid="input" name="switch" />);

    expect(getByTestId('input').attributes['name'].value).toBe('switch');
  });

  test('should support a custom icon on the toggle', async () => {
    const component = (
      <Switch size="l">
        <Switch.Value>$</Switch.Value>
      </Switch>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support themes', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Switch size="l" theme="success">
          <Switch.Value defaultChecked />
        </Switch>
        <Switch size="l" theme="info">
          <Switch.Value defaultChecked />
        </Switch>
        <Switch size="l" theme="success">
          <Switch.Value defaultChecked>$</Switch.Value>
        </Switch>
        <Switch size="l" theme="info">
          <Switch.Value defaultChecked>$</Switch.Value>
        </Switch>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support sizes', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Switch size="xl">
          <Switch.Addon>test</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>test</Switch.Addon>
        </Switch>
        <Switch size="l">
          <Switch.Addon>test</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>test</Switch.Addon>
        </Switch>
        <Switch size="m">
          <Switch.Addon>test</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>test</Switch.Addon>
        </Switch>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support before/after label', async () => {
    const component = (
      <Switch size="l">
        <Switch.Addon>before</Switch.Addon>
        <Switch.Value />
        <Switch.Addon>after</Switch.Addon>
      </Switch>
    );
    const { getByText } = render(component);

    expect(getByText('before')).toBeTruthy();
    expect(getByText('after')).toBeTruthy();

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support change of state "checked" on click in label', async () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Switch data-testid="label">
        <Switch.Value onChange={spy} />
      </Switch>,
    );

    fireEvent.click(getByTestId('label'));
    expect(spy).toBeCalled();
  });

  test('Should support controlled mod', () => {
    let checked = false;
    const spy = jest.fn((value) => {
      checked = value;
    });

    const { getByTestId, rerender } = render(
      <Switch data-testid="label">
        <Switch.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="input"
          checked={checked}
          onChange={spy}
        />
      </Switch>,
    );

    const label = getByTestId('label');
    const input = getByTestId('input');

    expect(input).toHaveProperty('checked', false);

    fireEvent.click(label);
    expect(spy).toBeCalled();

    rerender(
      <Switch data-testid="label">
        <Switch.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid="input"
          checked={checked}
          onChange={spy}
        />
      </Switch>,
    );

    expect(input).toHaveProperty('checked', true);
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

describe('Switch.Value', () => {
  afterEach(cleanup);

  shouldSupportClassName(Switch.Value, Switch);
  shouldSupportRef(Switch.Value, Switch);
});

describe('Switch.Addon', () => {
  afterEach(cleanup);

  shouldSupportClassName(Switch.Addon, Switch);
  shouldSupportRef(Switch.Addon, Switch);
});
