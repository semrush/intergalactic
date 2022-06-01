import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import Wizard from '../src';

const { cleanup, render, axe } = testing;

const steps = [
  { value: 1, title: 'Step 1', disabled: false },
  { value: 2, title: 'Step 2', disabled: false },
];

describe('Wizard', () => {
  afterEach(cleanup);

  test('Should correctly render', async () => {
    const Component = (
      <Wizard currentStep={1} steps={steps}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper value={1} />
          <Wizard.Stepper value={2} />
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step value={1}>First page</Wizard.Step>
          <Wizard.Step value={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>
    );
    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('Should correctly render with disabled step', async () => {
    const Component = (
      <Wizard
        currentStep={2}
        steps={[
          { value: 1, title: 'Step 1', disabled: true },
          { value: 2, title: 'Step 2', disabled: false },
        ]}
      >
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper value={1} />
          <Wizard.Stepper value={2} />
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step value={1}>First page</Wizard.Step>
          <Wizard.Step value={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>
    );
    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('Stepper should support hover', async () => {
    expect(
      await snapshot(
        <Wizard currentStep={2} steps={steps}>
          <Wizard.Sidebar title="Header">
            <Wizard.Stepper value={1} id="step" />
            <Wizard.Stepper value={2} />
          </Wizard.Sidebar>
          <Wizard.Content>
            <Wizard.Step value={1}>First page</Wizard.Step>
            <Wizard.Step value={2}>Second page</Wizard.Step>
          </Wizard.Content>
        </Wizard>,
        { actions: { hover: '#step' } },
      ),
    ).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <Wizard currentStep={1} steps={steps}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper value={1} />
          <Wizard.Stepper value={2} />
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step value={1}>First page</Wizard.Step>
          <Wizard.Step value={2}>Second page</Wizard.Step>
        </Wizard.Content>
      </Wizard>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
