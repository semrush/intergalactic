import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import BaseTrigger, { ButtonTrigger, FilterTrigger, LinkTrigger } from '../src';

describe('BaseTrigger Dependency imports', () => {
  runDependencyCheckTests('base-trigger');
});

describe('BaseTrigger', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: BaseTrigger,
    expectedDataUiName: 'BaseTrigger',
  });
});

describe('ButtonTrigger', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: ButtonTrigger,
    expectedDataUiName: 'ButtonTrigger',
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

  shouldHaveDataUiName({
    Component: FilterTrigger,
    expectedDataUiName: 'FilterTrigger',
  });
});

describe('LinkTrigger', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: LinkTrigger,
    props: { children: 'Link trigger' },
    expectedDataUiName: 'LinkTrigger',
  });
});
