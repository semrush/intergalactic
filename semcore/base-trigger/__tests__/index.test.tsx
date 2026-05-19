import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import BaseTrigger, { ButtonTrigger, FilterTrigger, LinkTrigger } from '../src';

describe('BaseTrigger Dependency imports', () => {
  runDependencyCheckTests('base-trigger');
});

describe('BaseTrigger', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: BaseTrigger,
    expectedDataUiName: 'BaseTrigger',
    preset: 'root',
  });
});

describe('ButtonTrigger', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: ButtonTrigger,
    expectedDataUiName: 'ButtonTrigger',
    preset: 'root',
  });

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

describe('FilterTrigger', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: FilterTrigger,
    expectedDataUiName: 'FilterTrigger',
    preset: 'root',
  });
});

describe('LinkTrigger', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: LinkTrigger,
    props: { children: 'Link trigger' },
    expectedDataUiName: 'LinkTrigger',
    preset: 'root',
  });
});
