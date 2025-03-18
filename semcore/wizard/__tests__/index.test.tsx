import React from 'react';
import { describe, test, expect, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { render, cleanup, fireEvent } from '@semcore/testing-utils/testing-library';
import Wizard from '../src';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('wizard Dependency imports', () => {
  runDependencyCheckTests('wizard');
});

describe('Wizard', () => {
  beforeEach(cleanup);

  test('Should support sidebar and content', async () => {
    const { getByText } = render(
      <Wizard disablePortal visible step={2}>
        <Wizard.Sidebar title='Header'>
          <Wizard.Stepper step={1}>Step 1</Wizard.Stepper>
          <Wizard.Stepper step={2}>Step 2</Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={1}>First page</Wizard.Step>
          <Wizard.Step step={2}>Second page</Wizard.Step>
          <Wizard.StepNext>StepNext</Wizard.StepNext>
          <Wizard.StepBack>StepBack</Wizard.StepBack>
        </Wizard.Content>
      </Wizard>,
    );

    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Step 1')).toBeTruthy();
    expect(getByText('Step 2')).toBeTruthy();
    expect(getByText('StepNext')).toBeTruthy();
    expect(getByText('StepBack')).toBeTruthy();
  });

  test('Should support keyboard navigation', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Wizard disablePortal visible step={1}>
        <Wizard.Sidebar title='Header'>
          <Wizard.Stepper step={1}>Step 1</Wizard.Stepper>
          <Wizard.Stepper step={2} data-testid='second-step' onActive={spy}>
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
    expect(spy).toHaveBeenCalledWith(2, expect.any(Object));
  });

  test('Should support step change on click', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Wizard disablePortal visible step={1}>
        <Wizard.Sidebar title='Header'>
          <Wizard.Stepper step={1}>Step 1</Wizard.Stepper>
          <Wizard.Stepper step={2} data-testid='second-step' onActive={spy}>
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
    expect(spy).toHaveBeenCalledWith(2, expect.any(Object));
  });
});
