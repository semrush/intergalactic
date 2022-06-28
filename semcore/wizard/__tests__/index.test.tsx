import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import Wizard from '../src';

const { cleanup, fireEvent, render, axe } = testing;

describe('Wizard', () => {
  afterEach(cleanup);

  test('Should correctly render', async () => {
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
    expect(
      await snapshot(Component, {
        selector: 'body',
        width: 1300,
        height: 600,
      }),
    ).toMatchImageSnapshot();
  });

  test('Should support checked completed', async () => {
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
    expect(
      await snapshot(Component, {
        selector: 'body',
        width: 300,
        height: 300,
      }),
    ).toMatchImageSnapshot();
  });

  test('Should support custom number', async () => {
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
    expect(
      await snapshot(Component, {
        selector: 'body',
        width: 300,
        height: 300,
      }),
    ).toMatchImageSnapshot();
  });

  test('Should correctly render with disabled step', async () => {
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
    expect(
      await snapshot(Component, {
        selector: 'body',
        width: 300,
        height: 300,
      }),
    ).toMatchImageSnapshot();
  });

  test('Stepper should support hover', async () => {
    expect(
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
    ).toMatchImageSnapshot();
  });

  test('Should support keyboard navigation', async () => {
    const spy = jest.fn();
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

    fireEvent.keyPress(getByTestId('second-step'), { keyCode: 13 });
    expect(spy).lastCalledWith(2, expect.any(Object));
  });

  test('Should support step change on click', async () => {
    const spy = jest.fn();
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

  test('a11y', async () => {
    const { container } = render(
      <Wizard disablePortal visible step={1}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper step={1} />
          <Wizard.Stepper step={2} />
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
