import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import Wizard from '../src';

import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

describe('Wizard', () => {
  beforeEach(cleanup);

  test.concurrent('Should correctly render', async ({ task }) => {
    const Component = (
      <Wizard disablePortal visible step={2}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper step={1}>Step 1</Wizard.Stepper>
          <Wizard.Stepper step={2}>Step 2</Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={1}>First page</Wizard.Step>
          <Wizard.Step step={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>
    );
    await expect(
      await snapshot(Component, {
        selector: 'body',
        width: 1300,
        height: 600,
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support checked completed', async ({ task }) => {
    const Component = (
      <Wizard disablePortal visible step={2}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper step={1} completed>
            Step 1
          </Wizard.Stepper>
          <Wizard.Stepper step={2}>Step 2</Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={1}>First page</Wizard.Step>
          <Wizard.Step step={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>
    );
    await expect(
      await snapshot(Component, {
        selector: 'body',
        width: 300,
        height: 300,
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom number', async ({ task }) => {
    const Component = (
      <Wizard disablePortal visible step={2}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper step={1} number={1.1}>
            Step 1
          </Wizard.Stepper>
          <Wizard.Stepper step={2} number={1.2}>
            Step 2
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={1}>First page</Wizard.Step>
          <Wizard.Step step={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>
    );
    await expect(
      await snapshot(Component, {
        selector: 'body',
        width: 300,
        height: 300,
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should correctly render with disabled step', async ({ task }) => {
    const Component = (
      <Wizard disablePortal visible step={1}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper step={1}>Step 1</Wizard.Stepper>
          <Wizard.Stepper step={2} disabled>
            Step 2
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={1}>First page</Wizard.Step>
          <Wizard.Step step={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>
    );
    await expect(
      await snapshot(Component, {
        selector: 'body',
        width: 300,
        height: 300,
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Stepper should support hover', async ({ task }) => {
    await expect(
      await snapshot(
        <Wizard disablePortal visible step={2}>
          <Wizard.Sidebar title="Header">
            <Wizard.Stepper step={1} id="step">
              Step 1
            </Wizard.Stepper>
            <Wizard.Stepper step={2}>Step 2</Wizard.Stepper>
          </Wizard.Sidebar>
          <Wizard.Content>
            <Wizard.Step step={1}>First page</Wizard.Step>
            <Wizard.Step step={2}>Second page</Wizard.Step>
          </Wizard.Content>
        </Wizard>,
        { selector: 'body', width: 300, height: 300, actions: { hover: '#step' } },
      ),
    ).toMatchImageSnapshot(task);
  });

  test.only('Should support keyboard navigation', async ({ task }) => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Wizard disablePortal visible step={1}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper step={1}>Step 1</Wizard.Stepper>
          <Wizard.Stepper step={2} data-testid={'second-step'} onActive={spy}>
            Step 2
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={1}>First page</Wizard.Step>
          <Wizard.Step step={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>,
    );

    fireEvent.keyDown(getByTestId('second-step'), { key: 'Enter', keyCode: 13 });
    expect(spy).lastCalledWith(2, expect.any(Object));
  });

  test.concurrent('Should support step change on click', async ({ task }) => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Wizard disablePortal visible step={1}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper step={1}>Step 1</Wizard.Stepper>
          <Wizard.Stepper step={2} data-testid={'second-step'} onActive={spy}>
            Step 2
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={1}>First page</Wizard.Step>
          <Wizard.Step step={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>,
    );

    fireEvent.click(getByTestId('second-step'));
    expect(spy).lastCalledWith(2, expect.any(Object));
  });

  test.concurrent('Should correctly rerender', async ({ task }) => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Wizard disablePortal visible step={1}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper step={1} data-testid={'first-step'} onActive={spy}>
            Step 1
          </Wizard.Stepper>
          <Wizard.Stepper step={2} data-testid={'second-step'} onActive={spy}>
            Step 2
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={1}>First page</Wizard.Step>
          <Wizard.Step step={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>,
    );

    fireEvent.click(getByTestId('second-step'));
    fireEvent.click(getByTestId('first-step'));
    fireEvent.click(getByTestId('second-step'));
    expect(spy).lastCalledWith(2, expect.any(Object));
  });

  test('a11y', async ({ task }) => {
    const { container } = render(
      <Wizard disablePortal visible step={1}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper step={1}>Step 1</Wizard.Stepper>
          <Wizard.Stepper step={2}>Step 2</Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={1}>First page</Wizard.Step>
          <Wizard.Step step={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
