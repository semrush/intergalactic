import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { describe, test, expect, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Wizard from '../src';

describe('wizard Dependency imports', () => {
  runDependencyCheckTests('wizard');
});

describe('Wizard', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const wizard = (
      <Wizard disablePortal visible step={1} closable={false}>
        <Wizard.Sidebar title='Wizard title'>
          <Wizard.Stepper step={1}>Step 1</Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={1}>
            <Wizard.StepTitle>Step title</Wizard.StepTitle>
            Step content
          </Wizard.Step>
          <Wizard.StepBack>Back</Wizard.StepBack>
          <Wizard.StepNext>Next</Wizard.StepNext>
        </Wizard.Content>
      </Wizard>
    );

    const { container } = render(wizard);
    expect(extractUIName(container)).toMatchSnapshot();
  });

  test('Should support sidebar and content', async () => {
    const { getByText, getByRole } = render(
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
    expect(getByRole('tab', { name: 'Step 1' })).toBeTruthy();
    expect(getByRole('tab', { name: 'Step 2' })).toBeTruthy();
    expect(getByText('StepNext')).toBeTruthy();
    expect(getByText('StepBack')).toBeTruthy();
  });

  test('Should support step change on click', async () => {
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

    await userEvent.click(getByTestId('second-step'));
    expect(spy).toHaveBeenCalledWith(2, expect.any(Object));
  });

  test('Should accept numeric steps starting from 0', () => {
    const { getByText, queryByText } = render(
      <Wizard disablePortal visible step={0}>
        <Wizard.Sidebar title='Header'>
          <Wizard.Stepper step={0}>Step 0</Wizard.Stepper>
          <Wizard.Stepper step={1}>Step 1</Wizard.Stepper>
          <Wizard.Stepper step={2}>Step 2</Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={0}>First page (step 0)</Wizard.Step>
          <Wizard.Step step={1}>Second page</Wizard.Step>
          <Wizard.Step step={2}>Third page</Wizard.Step>
        </Wizard.Content>
      </Wizard>,
    );

    expect(getByText('First page (step 0)')).toBeTruthy();
    expect(queryByText('Second page')).toBeNull();
    expect(queryByText('Third page')).toBeNull();
  });

  test('Should call onActive with correct numeric step on StepNext click', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Wizard disablePortal visible step={1}>
        <Wizard.Content>
          <Wizard.Step step={1}>Page 1</Wizard.Step>
          <Wizard.Step step={2}>Page 2</Wizard.Step>
          <Wizard.StepNext data-testid='next-btn' onActive={spy} />
        </Wizard.Content>
      </Wizard>,
    );

    await userEvent.click(getByTestId('next-btn'));
    expect(spy).toHaveBeenCalledWith(2);
  });

  test('Should call onActive with correct numeric step on StepBack click', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Wizard disablePortal visible step={2}>
        <Wizard.Content>
          <Wizard.Step step={1}>Page 1</Wizard.Step>
          <Wizard.Step step={2}>Page 2</Wizard.Step>
          <Wizard.StepBack data-testid='back-btn' onActive={spy} />
        </Wizard.Content>
      </Wizard>,
    );

    await userEvent.click(getByTestId('back-btn'));
    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Should set correct aria attributes for numeric steps', () => {
    const { getByTestId } = render(
      <Wizard disablePortal visible step={2}>
        <Wizard.Sidebar>
          <Wizard.Stepper step={1} data-testid='step-1'>
            Step 1
          </Wizard.Stepper>
          <Wizard.Stepper step={2} data-testid='step-2'>
            Step 2
          </Wizard.Stepper>
          <Wizard.Stepper step={3} data-testid='step-3' disabled>
            Step 3
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step step={2}>Current</Wizard.Step>
        </Wizard.Content>
      </Wizard>,
    );

    expect(getByTestId('step-2').getAttribute('aria-selected')).toBe('true');
    expect(getByTestId('step-1').getAttribute('aria-selected')).toBe('false');
    expect(getByTestId('step-3').getAttribute('aria-disabled')).toBe('true');
  });
});
