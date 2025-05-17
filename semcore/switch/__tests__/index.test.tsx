import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import Switch, { inputProps } from '../src';

import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('switch Dependency imports', () => {
  runDependencyCheckTests('switch');
});

describe('Switch', () => {
  beforeEach(cleanup);

  test.concurrent('Render correctly', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly with addon', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly with long addon', async ({ task }) => {
    const longText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

    const component = (
      <>
        <Switch size={'m'}>
          <Switch.Addon>{longText}</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>{longText}</Switch.Addon>
        </Switch>
        <Switch size={'l'}>
          <Switch.Addon>{longText}</Switch.Addon>
          <Switch.Value checked />
          <Switch.Addon>{longText}</Switch.Addon>
        </Switch>
        <Switch size={'xl'}>
          <Switch.Addon>{longText}</Switch.Addon>
          <Switch.Value checked />
          <Switch.Addon>{longText}</Switch.Addon>
        </Switch>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support disabled', async ({ task }) => {
    const component = (
      <>
        <Switch>
          <Switch.Addon>disabled</Switch.Addon>
          <Switch.Value disabled />
          <Switch.Addon>disabled</Switch.Addon>
        </Switch>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support a custom icon on the toggle', async ({ task }) => {
    const component = (
      <>
        <Switch size='l'>
          <Switch.Value>$</Switch.Value>
        </Switch>
        <Switch size='l'>
          <Switch.Value checked>$</Switch.Value>
        </Switch>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support size', async ({ task }) => {
    const component = (
      <>
        <Switch size='xl'>
          <Switch.Addon>Addon</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>Addon</Switch.Addon>
        </Switch>
        <Switch size='l'>
          <Switch.Addon>Addon</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>Addon</Switch.Addon>
        </Switch>
        <Switch size='m'>
          <Switch.Addon>Addon</Switch.Addon>
          <Switch.Value />
          <Switch.Addon>Addon</Switch.Addon>
        </Switch>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support theme', async ({ task }) => {
    const component = (
      <>
        <Switch size='l' theme='success'>
          <Switch.Value checked>$</Switch.Value>
        </Switch>
        <Switch size='l' theme='info'>
          <Switch.Value checked>$</Switch.Value>
        </Switch>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom theme', async ({ task }) => {
    const component = (
      <>
        <Switch size='l' theme='blanchedalmond'>
          <Switch.Value checked>$</Switch.Value>
        </Switch>
        <Switch size='l' theme='#3eeb4c'>
          <Switch.Value checked>$</Switch.Value>
        </Switch>
        <Switch size='l' theme='dark-violet'>
          <Switch.Value checked>$</Switch.Value>
        </Switch>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should support onChange callback', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Switch data-testid='label'>
        <Switch.Value onChange={spy} data-testid='value' />
      </Switch>,
    );

    fireEvent.click(getByTestId('label').childNodes[0]);
    expect(spy).lastCalledWith(true, expect.any(Object));
  });

  test.concurrent('Should support onChange callback with keyboard', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Switch>
        <Switch.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid='value'
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
