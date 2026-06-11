import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import { ButtonTrigger } from '../src';

describe('BaseTrigger Dependency imports', () => {
  runDependencyCheckTests('base-trigger');
});

describe('ButtonTrigger', () => {
  beforeEach(cleanup);

  test.concurrent('Should work as button with labels', async () => {
    const component = (
      <>
        <label htmlFor='trigger' id='label' data-testid='label'>
          Test for button
        </label>
        <ButtonTrigger id='trigger' data-testid='buttonTrigger'>
          Button
        </ButtonTrigger>
      </>
    );
    const { getByTestId } = render(component);
    await userEvent.click(getByTestId('label'));

    expect(getByTestId('buttonTrigger')).toHaveFocus();
  });
});
